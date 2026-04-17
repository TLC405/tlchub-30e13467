#!/usr/bin/env bash
# TLC Command Station — GitHub Integration
# Men of Purpose OKC · v1.0

set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RESET='\033[0m'; BOLD='\033[1m'; DIM='\033[2m'
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'
CYAN='\033[0;36m'; WHITE='\033[1;37m'; MAGENTA='\033[0;35m'

section() { echo -e "\n${CYAN}━━ ${1} ━━${RESET}"; }
ok()      { echo -e "  ${GREEN}✓${RESET} ${1}"; }
fail()    { echo -e "  ${RED}✗${RESET} ${1}"; }
info()    { echo -e "  ${WHITE}→${RESET} ${1}"; }
warn()    { echo -e "  ${YELLOW}⚠${RESET}  ${1}"; }

require_git() {
  if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    warn "Not inside a Git repository."
    read -rp "  Enter repo path (or press Enter to cancel): " repo_path
    if [[ -n "${repo_path}" && -d "${repo_path}" ]]; then
      cd "${repo_path}"
    else
      return 1
    fi
  fi
}

# ── Repo Status ───────────────────────────────────────────────────────────────
repo_status() {
  section "📊 Repo Status"
  require_git || return

  local branch remote url
  branch=$(git branch --show-current 2>/dev/null || echo "detached")
  remote=$(git remote 2>/dev/null | head -1)
  url=$(git remote get-url "${remote}" 2>/dev/null || echo "no remote")

  echo -e "\n  ${BOLD}Repo:${RESET}   ${url}"
  echo -e "  ${BOLD}Branch:${RESET} ${CYAN}${branch}${RESET}"

  # Ahead/behind
  if git fetch --dry-run &>/dev/null 2>&1; then
    local ahead behind
    ahead=$(git rev-list --count "@{u}..HEAD" 2>/dev/null || echo "0")
    behind=$(git rev-list --count "HEAD..@{u}" 2>/dev/null || echo "0")
    [[ "${ahead}" -gt 0 ]]  && info "${ahead} commit(s) ahead of origin"
    [[ "${behind}" -gt 0 ]] && warn "${behind} commit(s) behind origin"
    [[ "${ahead}" -eq 0 && "${behind}" -eq 0 ]] && ok "Up to date with origin"
  fi

  echo ""
  info "Staged/unstaged changes:"
  git status --short 2>/dev/null | awk '{printf "  %s\n", $0}' | head -20 || true

  echo ""
  info "Recent commits:"
  git log --oneline -5 2>/dev/null | awk '{printf "  %s\n", $0}' || true
}

# ── Quick Push ────────────────────────────────────────────────────────────────
quick_push() {
  section "🚀 Quick Push"
  require_git || return

  # Show current status first
  local changed
  changed=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
  if [[ "${changed}" -eq 0 ]]; then
    info "Nothing to commit. Working tree is clean."
    return
  fi

  echo -e "\n  Files to commit:"
  git status --short 2>/dev/null | awk '{printf "  %s\n", $0}'
  echo ""

  read -rp "  Commit message: " msg
  if [[ -z "${msg}" ]]; then
    warn "Commit message cannot be empty."
    return
  fi

  read -rp "  Push to $(git branch --show-current)? [y/N] " confirm
  if [[ ! "${confirm}" =~ ^[Yy]$ ]]; then
    info "Cancelled."
    return
  fi

  git add . && \
    git commit -m "${msg}" && \
    git push && \
    ok "Pushed successfully!"
}

# ── Pull Latest ───────────────────────────────────────────────────────────────
pull_latest() {
  section "⬇️  Pull Latest"
  require_git || return

  info "Fetching origin..."
  if git pull; then
    ok "Pull successful"
  else
    fail "Pull failed (possible conflicts)"
    warn "Check for merge conflicts and resolve manually."
  fi
}

# ── Repo List ─────────────────────────────────────────────────────────────────
repo_list() {
  section "📋 Your Repositories"

  if ! command -v gh &>/dev/null; then
    warn "gh CLI not installed. Install with: pkg install gh"
    return
  fi

  if ! gh auth status &>/dev/null; then
    warn "Not authenticated. Run: gh auth login"
    return
  fi

  gh repo list --limit 20 2>/dev/null | \
    awk '{printf "  %-40s %s\n", $1, $2}' || \
    warn "Could not list repos"
}

# ── Clone Repo ────────────────────────────────────────────────────────────────
clone_repo() {
  section "📥 Clone Repository"

  if command -v gh &>/dev/null && gh auth status &>/dev/null 2>&1; then
    info "Your repos:"
    gh repo list --limit 20 2>/dev/null | awk '{printf "  %s\n", $1}' | head -20 || true
  fi

  echo ""
  read -rp "  Repo URL or user/repo: " repo_input
  [[ -z "${repo_input}" ]] && return

  local clone_target="${repo_input}"
  # Handle shorthand user/repo format
  if [[ "${repo_input}" != *"/"*"/"* ]] && [[ "${repo_input}" == *"/"* ]]; then
    clone_target="https://github.com/${repo_input}"
  fi

  read -rp "  Clone to (default: current dir): " dest
  if [[ -n "${dest}" ]]; then
    git clone "${clone_target}" "${dest}" && ok "Cloned to ${dest}"
  else
    git clone "${clone_target}" && ok "Cloned"
  fi
}

# ── Copilot Chat ──────────────────────────────────────────────────────────────
copilot_chat() {
  section "🤖 GitHub Copilot Chat"

  if ! command -v gh &>/dev/null; then
    warn "gh CLI not installed. Install: pkg install gh"
    return
  fi

  # Check if copilot extension is installed
  if gh extension list 2>/dev/null | grep -q "copilot"; then
    gh copilot suggest "$@"
  else
    warn "GitHub Copilot CLI extension not installed."
    read -rp "  Install gh copilot extension? [y/N] " confirm
    if [[ "${confirm}" =~ ^[Yy]$ ]]; then
      gh extension install github/gh-copilot && \
        ok "Installed! Run 'tlc gh' and choose Copilot Chat again."
    fi
  fi
}

# ── PR Create ────────────────────────────────────────────────────────────────
pr_create() {
  section "🔀 Create Pull Request"
  require_git || return

  if ! command -v gh &>/dev/null; then
    warn "gh CLI not installed."
    return
  fi

  local branch; branch=$(git branch --show-current)
  info "Current branch: ${branch}"

  read -rp "  PR title: " title
  [[ -z "${title}" ]] && return

  read -rp "  Base branch (default: main): " base
  base="${base:-main}"

  read -rp "  Open in browser? [y/N] " web_flag
  local extra=""
  [[ "${web_flag}" =~ ^[Yy]$ ]] && extra="--web"

  gh pr create --title "${title}" --base "${base}" ${extra} && \
    ok "PR created!"
}

# ── Issues ────────────────────────────────────────────────────────────────────
issues_menu() {
  section "📌 Issues"

  if ! command -v gh &>/dev/null; then
    warn "gh CLI not installed."
    return
  fi

  echo -e "  ${CYAN}[1]${RESET} List open issues"
  echo -e "  ${CYAN}[2]${RESET} Create issue"
  echo -e "  ${CYAN}[0]${RESET} Back\n"
  read -rp "  Choose: " choice

  case "${choice}" in
    1)
      gh issue list --limit 20 2>/dev/null | awk '{printf "  %s\n", $0}' || warn "Could not list issues"
      ;;
    2)
      read -rp "  Issue title: " title
      [[ -z "${title}" ]] && return
      gh issue create --title "${title}" --body "" && ok "Issue created"
      ;;
  esac
}

# ── Menu ──────────────────────────────────────────────────────────────────────
show_menu() {
  echo -e "\n${CYAN}${BOLD}  🐙 TLC GitHub Tools${RESET}"
  echo -e "  ${WHITE}─────────────────────────────${RESET}"
  echo -e "  ${CYAN}[1]${RESET} Status         — branch, changes, commits"
  echo -e "  ${CYAN}[2]${RESET} Quick Push     — add, commit, push"
  echo -e "  ${CYAN}[3]${RESET} Pull Latest    — pull with conflict detection"
  echo -e "  ${CYAN}[4]${RESET} Repo List      — your GitHub repos"
  echo -e "  ${CYAN}[5]${RESET} Clone Repo     — interactive clone"
  echo -e "  ${CYAN}[6]${RESET} Copilot Chat   — gh copilot suggest"
  echo -e "  ${CYAN}[7]${RESET} PR Create      — open a pull request"
  echo -e "  ${CYAN}[8]${RESET} Issues         — list / create issues"
  echo -e "  ${CYAN}[0]${RESET} Back"
  echo -e "  ${WHITE}─────────────────────────────${RESET}\n"
}

main() {
  while true; do
    show_menu
    read -rp "  Choose [0-8]: " choice
    case "${choice}" in
      1) repo_status ;;
      2) quick_push ;;
      3) pull_latest ;;
      4) repo_list ;;
      5) clone_repo ;;
      6) copilot_chat ;;
      7) pr_create ;;
      8) issues_menu ;;
      0|q|Q) break ;;
      *) warn "Invalid choice" ;;
    esac
    echo -e "\n  ${DIM}Press Enter to continue...${RESET}"
    read -r
  done
}

main "$@"
