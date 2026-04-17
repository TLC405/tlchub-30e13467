#!/usr/bin/env bash
# TLC Command Station — System Monitoring Dashboard
# Men of Purpose OKC · v1.0

set -euo pipefail

# ── Colors & Styles ───────────────────────────────────────────────────────────
RESET='\033[0m'; BOLD='\033[1m'; DIM='\033[2m'
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; WHITE='\033[1;37m'; MAGENTA='\033[0;35m'

# ── Helpers ───────────────────────────────────────────────────────────────────
bar() {
  local pct="${1}" width="${2:-24}"
  local filled=$(( pct * width / 100 ))
  local empty=$(( width - filled ))
  local color="${GREEN}"
  [[ "${pct}" -ge 70 ]] && color="${YELLOW}"
  [[ "${pct}" -ge 90 ]] && color="${RED}"
  local bar_str=""
  [[ "${filled}" -gt 0 ]] && bar_str+="$(printf '█%.0s' $(seq 1 "${filled}" 2>/dev/null))"
  [[ "${empty}" -gt 0 ]]  && bar_str+="$(printf '░%.0s' $(seq 1 "${empty}"  2>/dev/null))"
  printf "${color}%s${RESET}" "${bar_str}"
}

# ── CPU Info ──────────────────────────────────────────────────────────────────
get_cpu() {
  local arch; arch=$(uname -m 2>/dev/null || echo "unknown")
  local cores; cores=$(nproc 2>/dev/null || grep -c processor /proc/cpuinfo 2>/dev/null || echo "?")
  local model; model=$(grep "model name" /proc/cpuinfo 2>/dev/null | head -1 | cut -d: -f2 | xargs || echo "Android SoC")

  # CPU usage via /proc/stat (two samples)
  local usage=0
  if [[ -f /proc/stat ]]; then
    local s1; s1=$(grep '^cpu ' /proc/stat)
    sleep 0.5
    local s2; s2=$(grep '^cpu ' /proc/stat)

    local idle1 total1 idle2 total2
    read -r _ u1 n1 s1_sys i1 _ <<< "${s1}"
    read -r _ u2 n2 s2_sys i2 _ <<< "${s2}"
    total1=$(( u1 + n1 + s1_sys + i1 ))
    total2=$(( u2 + n2 + s2_sys + i2 ))
    idle1="${i1}"; idle2="${i2}"
    local delta_total=$(( total2 - total1 ))
    local delta_idle=$(( idle2 - idle1 ))
    [[ "${delta_total}" -gt 0 ]] && \
      usage=$(( 100 - (delta_idle * 100 / delta_total) ))
  fi

  echo -e "  ${CYAN}${BOLD}CPU${RESET}    $(bar "${usage}") ${usage}%"
  echo -e "  ${DIM}Arch: ${arch}   Cores: ${cores}   Model: ${model}${RESET}"
}

# ── RAM Info ──────────────────────────────────────────────────────────────────
get_ram() {
  if [[ ! -f /proc/meminfo ]]; then
    echo -e "  ${CYAN}${BOLD}RAM${RESET}    unavailable"
    return
  fi

  local total_kb; total_kb=$(grep MemTotal    /proc/meminfo | awk '{print $2}')
  local avail_kb; avail_kb=$(grep MemAvailable /proc/meminfo | awk '{print $2}')
  local used_kb=$(( total_kb - avail_kb ))
  local pct=$(( used_kb * 100 / total_kb ))
  local used_mb=$(( used_kb / 1024 ))
  local total_mb=$(( total_kb / 1024 ))

  echo -e "  ${CYAN}${BOLD}RAM${RESET}    $(bar "${pct}") ${pct}%"
  echo -e "  ${DIM}${used_mb} MB used / ${total_mb} MB total  ($((avail_kb / 1024)) MB free)${RESET}"
}

# ── Storage ───────────────────────────────────────────────────────────────────
get_storage() {
  echo -e "  ${CYAN}${BOLD}STORAGE${RESET}"
  df -h 2>/dev/null | grep -vE '^tmpfs|^devtmpfs|^udev|^none' | tail -n +2 | \
    while IFS= read -r line; do
      local dev used avail pct_str mount
      read -r dev size used avail pct_str mount <<< "${line}"
      # Remove % sign
      local pct="${pct_str//%/}"
      if [[ "${pct}" =~ ^[0-9]+$ ]]; then
        echo -e "  $(bar "${pct}" 20) ${pct}%  ${mount}  (${used} used / ${size} total)"
      else
        echo -e "  ${DIM}${line}${RESET}"
      fi
    done
}

# ── Battery ───────────────────────────────────────────────────────────────────
get_battery() {
  echo -n -e "  ${CYAN}${BOLD}BATTERY${RESET} "

  if command -v termux-battery-status &>/dev/null; then
    local json; json=$(termux-battery-status 2>/dev/null)
    local level; level=$(echo "${json}" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('percentage','?'))" 2>/dev/null || echo "?")
    local status; status=$(echo "${json}" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('status','?'))" 2>/dev/null || echo "?")
    local temp; temp=$(echo "${json}" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('temperature','?'))" 2>/dev/null || echo "?")
    local icon="🔋"
    [[ "${status}" == "CHARGING" ]] && icon="⚡"
    echo -e "${icon} ${level}%  ${status}  ${temp}°C"
  elif [[ -f /sys/class/power_supply/battery/capacity ]]; then
    local cap; cap=$(cat /sys/class/power_supply/battery/capacity 2>/dev/null || echo "?")
    local sts; sts=$(cat /sys/class/power_supply/battery/status   2>/dev/null || echo "?")
    echo -e "🔋 ${cap}%  ${sts}"
  else
    echo -e "${DIM}N/A (termux-api required)${RESET}"
  fi
}

# ── Network ───────────────────────────────────────────────────────────────────
get_network() {
  echo -n -e "  ${CYAN}${BOLD}NETWORK${RESET} "

  local iface ip_addr
  iface=$(ip route show default 2>/dev/null | awk '/default/{print $5}' | head -1)
  ip_addr=$(ip addr show "${iface}" 2>/dev/null | awk '/inet /{print $2}' | head -1)

  if [[ -n "${iface}" ]]; then
    echo -e "${iface}  ${ip_addr:-?}"
  else
    echo -e "${DIM}No active interface${RESET}"
  fi

  # WiFi signal via termux-api
  if command -v termux-wifi-connectioninfo &>/dev/null; then
    local ssid rssi
    ssid=$(termux-wifi-connectioninfo 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('ssid','?'))" 2>/dev/null || echo "?")
    rssi=$(termux-wifi-connectioninfo 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print(str(d.get('rssi','?')) + ' dBm')" 2>/dev/null || echo "?")
    echo -e "  ${DIM}WiFi: ${ssid}  Signal: ${rssi}${RESET}"
  fi
}

# ── Uptime ────────────────────────────────────────────────────────────────────
get_uptime() {
  echo -n -e "  ${CYAN}${BOLD}UPTIME${RESET}  "
  uptime -p 2>/dev/null || uptime 2>/dev/null | awk -F'up' '{print $2}' | cut -d, -f1-2
}

# ── Top Processes ─────────────────────────────────────────────────────────────
get_top_procs() {
  echo -e "\n  ${CYAN}${BOLD}TOP PROCESSES${RESET}"
  echo -e "  ${DIM}By CPU:${RESET}"
  ps -eo pid,user,%cpu,%mem,comm --sort=-%cpu 2>/dev/null | head -6 | \
    awk 'NR==1{printf "  %-8s %-10s %-6s %-6s %s\n","PID","USER","%CPU","%MEM","CMD"}
         NR>1{printf "  %-8s %-10s %-6s %-6s %s\n",$1,$2,$3,$4,$5}' || \
  ps aux --sort=-%cpu 2>/dev/null | head -6 | \
    awk 'NR==1{printf "  %-8s %-10s %-6s %-6s %s\n","PID","USER","%CPU","%MEM","CMD"}
         NR>1{printf "  %-8s %-10s %-6s %-6s %s\n",$2,$1,$3,$4,$11}'

  echo ""
  echo -e "  ${DIM}By Memory:${RESET}"
  ps -eo pid,user,%cpu,%mem,comm --sort=-%mem 2>/dev/null | head -6 | \
    awk 'NR==1{printf "  %-8s %-10s %-6s %-6s %s\n","PID","USER","%CPU","%MEM","CMD"}
         NR>1{printf "  %-8s %-10s %-6s %-6s %s\n",$1,$2,$3,$4,$5}' || \
  ps aux --sort=-%mem 2>/dev/null | head -6 | \
    awk 'NR==1{printf "  %-8s %-10s %-6s %-6s %s\n","PID","USER","%CPU","%MEM","CMD"}
         NR>1{printf "  %-8s %-10s %-6s %-6s %s\n",$2,$1,$3,$4,$11}'
}

# ── Full Dashboard ────────────────────────────────────────────────────────────
dashboard() {
  clear
  local ts; ts=$(date "+%Y-%m-%d %H:%M:%S")
  echo -e "${CYAN}${BOLD}"
  echo -e "  ╔══════════════════════════════════════════════╗"
  echo -e "  ║       TLC SYSTEM MONITOR  ·  ${ts}  ║"  2>/dev/null || \
  echo -e "  ║       TLC SYSTEM MONITOR                     ║"
  echo -e "  ╚══════════════════════════════════════════════╝"
  echo -e "${RESET}"

  get_cpu
  echo ""
  get_ram
  echo ""
  get_storage
  echo ""
  get_battery
  get_network
  get_uptime
  get_top_procs

  echo -e "\n  ${DIM}[q] Quit   [r] Refresh   [any key] Refresh${RESET}"
}

# ── Live Refresh Loop ─────────────────────────────────────────────────────────
live_monitor() {
  local interval="${1:-5}"
  while true; do
    dashboard
    read -r -t "${interval}" -n 1 key 2>/dev/null || true
    case "${key:-}" in
      q|Q) echo -e "\n${CYAN}Monitor exited.${RESET}"; break ;;
    esac
  done
}

# ── Entry Point ───────────────────────────────────────────────────────────────
main() {
  case "${1:-live}" in
    once|snapshot) dashboard ;;
    live|*)        live_monitor "${2:-5}" ;;
  esac
}

main "$@"
