#!/usr/bin/env bash
# TLC Command Station — Phone Cleanup & Optimization
# Men of Purpose OKC · v1.0

set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RESET='\033[0m'; BOLD='\033[1m'; DIM='\033[2m'
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'
CYAN='\033[0;36m'; WHITE='\033[1;37m'; MAGENTA='\033[0;35m'

# ── Helpers ───────────────────────────────────────────────────────────────────
bar() {
  # bar <used> <total> <width>
  local used="${1}" total="${2}" width="${3:-30}"
  local pct=0
  [[ "${total}" -gt 0 ]] && pct=$(( used * 100 / total ))
  local filled=$(( pct * width / 100 ))
  local empty=$(( width - filled ))
  local color="${GREEN}"
  [[ "${pct}" -ge 70 ]] && color="${YELLOW}"
  [[ "${pct}" -ge 90 ]] && color="${RED}"
  printf "${color}%s${RESET}%s ${WHITE}%d%%${RESET}" \
    "$(printf '█%.0s' $(seq 1 "${filled}" 2>/dev/null || true))" \
    "$(printf '░%.0s' $(seq 1 "${empty}"  2>/dev/null || true))" \
    "${pct}"
}

section() { echo -e "\n${CYAN}━━ ${1} ━━${RESET}"; }
ok()      { echo -e "  ${GREEN}✓${RESET} ${1}"; }
info()    { echo -e "  ${WHITE}→${RESET} ${1}"; }
warn()    { echo -e "  ${YELLOW}⚠${RESET}  ${1}"; }

confirm() {
  read -rp "  ${YELLOW}${1} [y/N]:${RESET} " ans
  [[ "${ans}" =~ ^[Yy]$ ]]
}

# ── Quick Clean ───────────────────────────────────────────────────────────────
quick_clean() {
  section "🧹 Quick Clean"

  info "Cleaning Termux package cache..."
  pkg clean 2>/dev/null && ok "Package cache cleared" || warn "pkg clean not available"

  info "Removing /tmp files..."
  rm -rf /tmp/* 2>/dev/null || true
  ok "Temp files cleared"

  info "Clearing pip cache..."
  pip cache purge 2>/dev/null && ok "pip cache cleared" || info "No pip cache found"

  info "Clearing npm cache..."
  npm cache clean --force 2>/dev/null && ok "npm cache cleared" || info "No npm cache found"

  if [[ -d "${HOME}/.gradle/caches" ]]; then
    info "Clearing Gradle cache..."
    rm -rf "${HOME}/.gradle/caches" && ok "Gradle cache cleared"
  fi

  echo -e "\n${GREEN}${BOLD}Quick clean complete!${RESET}"
}

# ── Deep Clean ────────────────────────────────────────────────────────────────
deep_clean() {
  section "🔥 Deep Clean"
  quick_clean

  section "Large Files (>50 MB)"
  info "Scanning for large files in \$HOME..."
  find "${HOME}" -type f -size +50M 2>/dev/null | while IFS= read -r f; do
    size=$(du -sh "${f}" 2>/dev/null | cut -f1)
    echo -e "  ${YELLOW}${size}${RESET}  ${f}"
  done | head -20
  echo ""

  section "Old Logs"
  info "Searching for .log files older than 7 days..."
  find "${HOME}" -name "*.log" -mtime +7 2>/dev/null | head -20
  if confirm "Delete these log files?"; then
    find "${HOME}" -name "*.log" -mtime +7 -delete 2>/dev/null
    ok "Old logs removed"
  fi

  section "Build Artifacts"
  local artifacts=("node_modules/.cache" ".next/cache" "build/tmp" "dist/tmp" "__pycache__")
  for a in "${artifacts[@]}"; do
    local target_path="${HOME}/${a}"
    if [[ -d "${target_path}" ]]; then
      info "Found: ${target_path}"
      if confirm "Remove ${a}?"; then
        rm -rf "${target_path}" && ok "Removed"
      fi
    fi
  done

  echo -e "\n${GREEN}${BOLD}Deep clean complete!${RESET}"
}

# ── Storage Report ────────────────────────────────────────────────────────────
storage_report() {
  section "💾 Storage Report"

  # Overall disk usage
  echo -e "\n  ${BOLD}Disk Usage:${RESET}"
  df -h 2>/dev/null | grep -E '^/|^Filesystem' | while IFS= read -r line; do
    echo -e "  ${DIM}${line}${RESET}"
  done

  echo -e "\n  ${BOLD}Top 10 directories in \$HOME:${RESET}"
  du -sh "${HOME}"/.[^.]* "${HOME}"/* 2>/dev/null | sort -rh | head -15 | \
    awk '{printf "  %-8s %s\n", $1, $2}'

  echo -e "\n  ${BOLD}Termux \$PREFIX usage:${RESET}"
  if [[ -d "${PREFIX:-/data/data/com.termux/files/usr}" ]]; then
    du -sh "${PREFIX:-/data/data/com.termux/files/usr}" 2>/dev/null | \
      awk '{printf "  %-8s %s\n", $1, $2}'
  fi
}

# ── Memory Boost ──────────────────────────────────────────────────────────────
memory_boost() {
  section "🧠 Memory Report"

  # RAM info
  if [[ -f /proc/meminfo ]]; then
    local total_kb used_kb free_kb
    total_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
    free_kb=$(grep MemAvailable /proc/meminfo | awk '{print $2}')
    used_kb=$(( total_kb - free_kb ))
    local total_mb=$(( total_kb / 1024 ))
    local used_mb=$(( used_kb / 1024 ))
    local free_mb=$(( free_kb / 1024 ))

    echo -e "\n  RAM: $(bar "${used_mb}" "${total_mb}" 25)"
    echo -e "  Used: ${used_mb} MB  /  Total: ${total_mb} MB  /  Free: ${free_mb} MB\n"
  fi

  echo -e "  ${BOLD}Top 10 processes by memory:${RESET}"
  ps aux --sort=-%mem 2>/dev/null | head -11 | \
    awk 'NR==1{printf "  %-8s %-6s %-6s %s\n","USER","PID","%MEM","COMMAND"}
         NR>1{printf "  %-8s %-6s %-6s %s\n",$1,$2,$4,$11}' || \
  ps -eo pid,user,%mem,comm --sort=-%mem 2>/dev/null | head -11 | \
    awk 'NR==1{printf "  %-8s %-6s %-6s %s\n","PID","USER","%MEM","CMD"}
         NR>1{printf "  %-8s %-6s %-6s %s\n",$1,$2,$3,$4}'

  echo ""
  if confirm "Kill a process by PID?"; then
    read -rp "  Enter PID: " pid
    if [[ "${pid}" =~ ^[0-9]+$ ]]; then
      kill "${pid}" 2>/dev/null && ok "Process ${pid} killed" || warn "Could not kill ${pid}"
    else
      warn "Invalid PID"
    fi
  fi
}

# ── Battery Report ────────────────────────────────────────────────────────────
battery_report() {
  section "🔋 Battery Report"

  if command -v termux-battery-status &>/dev/null; then
    termux-battery-status | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    level    = d.get('percentage', 'N/A')
    status   = d.get('status', 'N/A')
    health   = d.get('health', 'N/A')
    temp     = d.get('temperature', 'N/A')
    plugged  = d.get('plugged', 'N/A')
    print(f'  Level    : {level}%')
    print(f'  Status   : {status}')
    print(f'  Health   : {health}')
    print(f'  Temp     : {temp}°C')
    print(f'  Plugged  : {plugged}')
except Exception as e:
    print(f'  [error parsing battery info: {e}]')
" 2>/dev/null || warn "termux-battery-status failed"
  else
    warn "termux-api not available. Install Termux:API from F-Droid."
    if [[ -f /sys/class/power_supply/battery/capacity ]]; then
      local cap; cap=$(cat /sys/class/power_supply/battery/capacity 2>/dev/null)
      local status; status=$(cat /sys/class/power_supply/battery/status 2>/dev/null)
      echo -e "  Level  : ${cap}%"
      echo -e "  Status : ${status}"
    fi
  fi
}

# ── All-in-One ────────────────────────────────────────────────────────────────
optimize_all() {
  quick_clean
  memory_boost
  storage_report
  battery_report
  echo -e "\n${GREEN}${BOLD}╔══════════════════════════════╗"
  echo -e "║   All-in-One Optimize Done!  ║"
  echo -e "╚══════════════════════════════╝${RESET}\n"
}

# ── Menu ──────────────────────────────────────────────────────────────────────
show_menu() {
  echo -e "\n${CYAN}${BOLD}  🧹 TLC Optimizer${RESET}"
  echo -e "  ${WHITE}─────────────────────────────${RESET}"
  echo -e "  ${CYAN}[1]${RESET} Quick Clean     — cache, tmp, pip/npm"
  echo -e "  ${CYAN}[2]${RESET} Deep Clean      — above + large files, logs"
  echo -e "  ${CYAN}[3]${RESET} Storage Report  — disk usage breakdown"
  echo -e "  ${CYAN}[4]${RESET} Memory Boost    — RAM usage + kill processes"
  echo -e "  ${CYAN}[5]${RESET} Battery Report  — health, temp, charge status"
  echo -e "  ${CYAN}[6]${RESET} All-in-One      — run everything"
  echo -e "  ${CYAN}[0]${RESET} Back"
  echo -e "  ${WHITE}─────────────────────────────${RESET}\n"
}

main() {
  while true; do
    show_menu
    read -rp "  Choose [0-6]: " choice
    case "${choice}" in
      1) quick_clean ;;
      2) deep_clean ;;
      3) storage_report ;;
      4) memory_boost ;;
      5) battery_report ;;
      6) optimize_all ;;
      0|q|Q) break ;;
      *) warn "Invalid choice" ;;
    esac
    echo -e "\n  ${DIM}Press Enter to continue...${RESET}"
    read -r
  done
}

main "$@"
