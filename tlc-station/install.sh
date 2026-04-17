#!/usr/bin/env bash
# TLC Command Station — Installer for Termux (Android)
# Men of Purpose OKC · v1.0
#
# Usage: bash install.sh
#
# This installer will:
#   1. Update Termux packages
#   2. Install required packages
#   3. Install Python packages (requests, rich)
#   4. Install Oh My Zsh + plugins + Powerlevel10k
#   5. Set up Termux properties and colors
#   6. Copy config template and prompt for API key
#   7. Create the global `tlc` symlink
#   8. Generate ~/.zshrc with helpful aliases
#   9. Print the welcome screen

set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RESET='\033[0m'; BOLD='\033[1m'; DIM='\033[2m'
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'
CYAN='\033[0;36m'; WHITE='\033[1;37m'

ok()   { echo -e "  ${GREEN}✓${RESET} ${1}"; }
fail() { echo -e "  ${RED}✗${RESET} ${1}"; }
info() { echo -e "  ${WHITE}→${RESET} ${1}"; }
warn() { echo -e "  ${YELLOW}⚠${RESET}  ${1}"; }
step() { echo -e "\n${CYAN}${BOLD}━━ ${1} ━━${RESET}"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Detect Termux ─────────────────────────────────────────────────────────────
if [[ -n "${PREFIX:-}" ]] && [[ "${PREFIX}" == *"termux"* ]]; then
  TERMUX=true
  BIN_DIR="${PREFIX}/bin"
else
  TERMUX=false
  BIN_DIR="/usr/local/bin"
  warn "Not running in Termux. Some features may not work."
fi

# ── Banner ────────────────────────────────────────────────────────────────────
echo -e "${CYAN}${BOLD}"
echo "  ╔═══════════════════════════════════════════╗"
echo "  ║   TLC Command Station — Installer v1.0   ║"
echo "  ║        Men of Purpose OKC                ║"
echo "  ╚═══════════════════════════════════════════╝"
echo -e "${RESET}"

# ── 1. Update Termux ──────────────────────────────────────────────────────────
step "1/8  Updating Termux packages"
if "${TERMUX}"; then
  # Non-interactive update
  yes | pkg update -y 2>/dev/null || true
  ok "Packages updated"
else
  warn "Skipping pkg update (not in Termux)"
fi

# ── 2. Install Packages ───────────────────────────────────────────────────────
step "2/8  Installing Termux packages"

PACKAGES=(
  python nodejs-lts git curl wget openssh termux-api
  jq htop fzf ripgrep bat eza fd neovim tmux
  fastfetch nmap dnsutils net-tools gh zsh bc
)

if "${TERMUX}"; then
  for pkg in "${PACKAGES[@]}"; do
    if pkg install -y "${pkg}" &>/dev/null; then
      ok "${pkg}"
    else
      warn "${pkg} (skipped or failed)"
    fi
  done
else
  warn "Skipping Termux package install (not in Termux)"
  info "Would install: ${PACKAGES[*]}"
fi

# ── 3. Python Packages ────────────────────────────────────────────────────────
step "3/8  Installing Python packages"
if command -v pip3 &>/dev/null || command -v pip &>/dev/null; then
  PIP="pip3"
  command -v pip3 &>/dev/null || PIP="pip"

  for pypkg in requests rich; do
    if "${PIP}" install --quiet "${pypkg}" 2>/dev/null; then
      ok "${pypkg}"
    else
      warn "${pypkg} (install failed — run manually: pip install ${pypkg})"
    fi
  done
else
  warn "pip not found. Install python first, then run: pip install requests rich"
fi

# ── 4. Oh My Zsh + Plugins ────────────────────────────────────────────────────
step "4/8  Installing Oh My Zsh + Powerlevel10k"

ZSH_DIR="${HOME}/.oh-my-zsh"
P10K_DIR="${ZSH_DIR}/custom/themes/powerlevel10k"
AUTOSUGGEST_DIR="${ZSH_DIR}/custom/plugins/zsh-autosuggestions"
SYNTAX_DIR="${ZSH_DIR}/custom/plugins/zsh-syntax-highlighting"

if [[ ! -d "${ZSH_DIR}" ]]; then
  info "Installing Oh My Zsh..."
  RUNZSH=no CHSH=no \
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    2>/dev/null && ok "Oh My Zsh installed" || warn "Oh My Zsh install failed"
else
  ok "Oh My Zsh already installed"
fi

if [[ ! -d "${P10K_DIR}" ]]; then
  info "Installing Powerlevel10k theme..."
  git clone --depth=1 \
    "https://github.com/romkatv/powerlevel10k.git" \
    "${P10K_DIR}" &>/dev/null && ok "Powerlevel10k installed" || warn "p10k install failed"
else
  ok "Powerlevel10k already installed"
fi

if [[ ! -d "${AUTOSUGGEST_DIR}" ]]; then
  info "Installing zsh-autosuggestions..."
  git clone --depth=1 \
    "https://github.com/zsh-users/zsh-autosuggestions" \
    "${AUTOSUGGEST_DIR}" &>/dev/null && ok "zsh-autosuggestions installed" || warn "failed"
else
  ok "zsh-autosuggestions already installed"
fi

if [[ ! -d "${SYNTAX_DIR}" ]]; then
  info "Installing zsh-syntax-highlighting..."
  git clone --depth=1 \
    "https://github.com/zsh-users/zsh-syntax-highlighting" \
    "${SYNTAX_DIR}" &>/dev/null && ok "zsh-syntax-highlighting installed" || warn "failed"
else
  ok "zsh-syntax-highlighting already installed"
fi

# ── 5. Termux Properties & Colors ────────────────────────────────────────────
step "5/8  Configuring Termux properties"

TERMUX_HOME="${HOME}/.termux"
mkdir -p "${TERMUX_HOME}"

# colors.properties — dark premium theme
cat > "${TERMUX_HOME}/colors.properties" <<'EOF'
background=#0d1117
foreground=#c9d1d9
cursor=#58a6ff
color0=#0d1117
color1=#ff7b72
color2=#3fb950
color3=#d29922
color4=#58a6ff
color5=#bc8cff
color6=#39c5cf
color7=#8b949e
color8=#21262d
color9=#ffa198
color10=#56d364
color11=#e3b341
color12=#79c0ff
color13=#d2a8ff
color14=#56d4dd
color15=#c9d1d9
EOF
ok "Termux colors set (dark GitHub theme)"

# termux.properties — extra keys row
cat > "${TERMUX_HOME}/termux.properties" <<'EOF'
extra-keys = [['ESC','TAB','CTRL','ALT','-','|','/'],['UP','DOWN','LEFT','RIGHT','HOME','END','DEL']]
bell-character=ignore
fullscreen=false
use-black-ui=true
EOF
ok "Termux extra keys configured"

# ── 6. Config File ────────────────────────────────────────────────────────────
step "6/8  Setting up TLC config"

TLC_DIR="${HOME}/.tlc"
mkdir -p "${TLC_DIR}"
CONFIG_FILE="${TLC_DIR}/config.env"

if [[ ! -f "${CONFIG_FILE}" ]]; then
  cp "${SCRIPT_DIR}/config.example.env" "${CONFIG_FILE}"
  ok "Config created at ${CONFIG_FILE}"
else
  ok "Config already exists at ${CONFIG_FILE}"
fi

# Prompt for API key
echo ""
warn "You need a Claude API key for AI features."
info "Get one free at: https://console.anthropic.com"
echo ""
read -rp "  Enter your Claude API key (press Enter to skip): " api_key

if [[ -n "${api_key}" ]]; then
  if [[ "${api_key}" == sk-ant-* ]]; then
    # Use sed to update the key in the config
    sed -i "s|CLAUDE_API_KEY=sk-ant-your-key-here|CLAUDE_API_KEY=${api_key}|" "${CONFIG_FILE}"
    ok "API key saved to ${CONFIG_FILE}"
  else
    warn "Key doesn't start with 'sk-ant-' — please verify and edit ${CONFIG_FILE} manually"
  fi
else
  warn "Skipped. Edit ${CONFIG_FILE} and add your CLAUDE_API_KEY later."
fi

# ── 7. Global symlink ─────────────────────────────────────────────────────────
step "7/8  Creating global 'tlc' command"

chmod +x "${SCRIPT_DIR}/tlc"
chmod +x "${SCRIPT_DIR}/optimizer.sh"
chmod +x "${SCRIPT_DIR}/netcheck.sh"
chmod +x "${SCRIPT_DIR}/ghcop.sh"
chmod +x "${SCRIPT_DIR}/monitor.sh"
chmod +x "${SCRIPT_DIR}/ai.py"

TLC_LINK="${BIN_DIR}/tlc"
if [[ -w "${BIN_DIR}" ]] || "${TERMUX}"; then
  ln -sf "${SCRIPT_DIR}/tlc" "${TLC_LINK}" 2>/dev/null && \
    ok "Symlink created: ${TLC_LINK} → ${SCRIPT_DIR}/tlc" || \
    warn "Could not create symlink in ${BIN_DIR} — add ${SCRIPT_DIR} to PATH manually"
else
  warn "Cannot write to ${BIN_DIR}. Add this to your PATH:"
  echo -e "    export PATH=\"${SCRIPT_DIR}:\${PATH}\""
fi

# ── 8. .zshrc Generation ─────────────────────────────────────────────────────
step "8/8  Generating ~/.zshrc"

ZSHRC="${HOME}/.zshrc"
ZSHRC_BACKUP="${HOME}/.zshrc.bak.$(date +%s)"

if [[ -f "${ZSHRC}" ]]; then
  cp "${ZSHRC}" "${ZSHRC_BACKUP}"
  info "Existing .zshrc backed up to ${ZSHRC_BACKUP}"
fi

cat > "${ZSHRC}" <<EOF
# ~/.zshrc — TLC Command Station
# Generated by tlc-station installer

# ── Oh My Zsh ─────────────────────────────────────────────────────────────────
export ZSH="\${HOME}/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  fzf
)

[[ -f "\${ZSH}/oh-my-zsh.sh" ]] && source "\${ZSH}/oh-my-zsh.sh"

# ── Powerlevel10k ─────────────────────────────────────────────────────────────
[[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh

# ── TLC Config ────────────────────────────────────────────────────────────────
[[ -f ~/.tlc/config.env ]] && source ~/.tlc/config.env

# ── Path ──────────────────────────────────────────────────────────────────────
export PATH="${SCRIPT_DIR}:\${PATH}"
export EDITOR="\${EDITOR:-nvim}"

# ── Modern CLI Aliases ────────────────────────────────────────────────────────
# eza (modern ls)
if command -v eza &>/dev/null; then
  alias ls='eza --icons --group-directories-first'
  alias ll='eza -la --icons --group-directories-first'
  alias lt='eza --tree --icons --level=2'
fi

# bat (modern cat)
command -v bat &>/dev/null && alias cat='bat --style=plain'

# fd (modern find)
command -v fd &>/dev/null && alias find='fd'

# ripgrep
command -v rg &>/dev/null && alias grep='rg'

# ── TLC Aliases ───────────────────────────────────────────────────────────────
alias tlc='${TLC_LINK}'
alias ai='tlc ai'
alias mon='tlc mon'
alias clean='tlc clean'
alias netcheck='tlc net'

# ── Git Shortcuts ─────────────────────────────────────────────────────────────
alias g='git'
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gpl='git pull'
alias gl='git log --oneline -10'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# ── Dev Shortcuts ─────────────────────────────────────────────────────────────
alias ni='npm install'
alias ns='npm start'
alias nb='npm run build'
alias nt='npm test'
alias py='python3'
alias serve='python3 -m http.server'

# ── Navigation ────────────────────────────────────────────────────────────────
alias ..='cd ..'
alias ...='cd ../..'
alias ~='cd ~'
alias home='cd ~'

# ── History ───────────────────────────────────────────────────────────────────
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt SHARE_HISTORY
EOF

ok ".zshrc written to ${ZSHRC}"

# ── Welcome Screen ────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}"
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║                                              ║"
echo "  ║   ████████╗██╗      ██████╗                  ║"
echo "  ║      ██╔══╝██║     ██╔════╝                  ║"
echo "  ║      ██║   ██║     ██║                       ║"
echo "  ║      ██║   ██║     ██║                       ║"
echo "  ║      ██║   ███████╗╚██████╗                  ║"
echo "  ║      ╚═╝   ╚══════╝ ╚═════╝                  ║"
echo "  ║                                              ║"
echo "  ║      Installation Complete! 🎉               ║"
echo "  ║      Men of Purpose OKC                     ║"
echo "  ╚══════════════════════════════════════════════╝"
echo -e "${RESET}"

echo -e "  ${GREEN}${BOLD}Next steps:${RESET}"
echo -e "  ${CYAN}1.${RESET} Reload shell:  ${YELLOW}source ~/.zshrc${RESET}  or restart Termux"
echo -e "  ${CYAN}2.${RESET} Start TLC:     ${YELLOW}tlc${RESET}"
echo -e "  ${CYAN}3.${RESET} Quick AI chat: ${YELLOW}tlc ai \"what is planche\"${RESET}"
echo -e "  ${CYAN}4.${RESET} Edit config:   ${YELLOW}tlc config${RESET}  (add API key if you skipped it)"
echo ""
echo -e "  ${DIM}Config file: ~/.tlc/config.env${RESET}"
echo ""
