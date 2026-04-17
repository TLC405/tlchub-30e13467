#!/usr/bin/env bash
# TLC Command Station — Internet Diagnostics
# Men of Purpose OKC · v1.0

set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RESET='\033[0m'; BOLD='\033[1m'; DIM='\033[2m'
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[0;33m'
CYAN='\033[0;36m'; WHITE='\033[1;37m'

section() { echo -e "\n${CYAN}━━ ${1} ━━${RESET}"; }
ok()      { echo -e "  ${GREEN}✓${RESET} ${1}"; }
fail()    { echo -e "  ${RED}✗${RESET} ${1}"; }
info()    { echo -e "  ${WHITE}→${RESET} ${1}"; }
warn()    { echo -e "  ${YELLOW}⚠${RESET}  ${1}"; }

# ── Connection Test ───────────────────────────────────────────────────────────
connection_test() {
  section "🔌 Connection Test"

  local hosts=("google.com" "1.1.1.1" "8.8.8.8" "github.com")
  for host in "${hosts[@]}"; do
    local result
    if result=$(ping -c 2 -W 3 "${host}" 2>/dev/null | tail -1 | awk -F'/' '{print $5}'); then
      ok "${host}  — ${result} ms avg"
    else
      fail "${host}  — unreachable"
    fi
  done

  echo ""
  info "HTTP response check:"
  local urls=("https://google.com" "https://cloudflare.com" "https://api.github.com")
  for url in "${urls[@]}"; do
    local http_code time_total
    if read -r http_code time_total < <(curl -o /dev/null -s -w "%{http_code} %{time_total}" \
      --max-time 5 "${url}" 2>/dev/null); then
      local ms; ms=$(echo "${time_total} * 1000" | bc 2>/dev/null | cut -d. -f1)
      ok "${url}  → HTTP ${http_code}  (${ms:-?} ms)"
    else
      fail "${url}  → timeout/error"
    fi
  done
}

# ── WiFi Info ─────────────────────────────────────────────────────────────────
wifi_info() {
  section "📶 WiFi Info"

  if command -v termux-wifi-connectioninfo &>/dev/null; then
    termux-wifi-connectioninfo | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    fields = [
        ('SSID',        d.get('ssid', 'N/A')),
        ('BSSID',       d.get('bssid', 'N/A')),
        ('IP',          d.get('ip', 'N/A')),
        ('Link Speed',  str(d.get('link_speed_mbps', 'N/A')) + ' Mbps'),
        ('Frequency',   str(d.get('frequency_mhz', 'N/A')) + ' MHz'),
        ('Signal',      str(d.get('rssi', 'N/A')) + ' dBm'),
        ('Hidden',      str(d.get('network_id', 'N/A'))),
    ]
    for label, val in fields:
        print(f'  {label:<15}: {val}')
except Exception as e:
    print(f'  [error: {e}]')
" 2>/dev/null || warn "termux-wifi-connectioninfo failed"
  else
    warn "termux-api not available"
    info "Falling back to ip/ifconfig:"
    ip addr show 2>/dev/null | grep -E 'inet |wlan|eth' | \
      awk '{printf "  %s\n", $0}' || \
    ifconfig 2>/dev/null | grep -E 'inet |wlan|eth' | \
      awk '{printf "  %s\n", $0}' || \
    warn "ip/ifconfig not available"
  fi
}

# ── Speed Estimate ────────────────────────────────────────────────────────────
speed_estimate() {
  section "🚀 Speed Estimate"

  local test_url="https://speed.cloudflare.com/__down?bytes=5000000"  # 5 MB
  info "Downloading 5 MB from Cloudflare speed test..."

  local start_time end_time elapsed_ms speed_kbps speed_mbps
  start_time=$(date +%s%N 2>/dev/null || date +%s)

  if curl -o /dev/null -s --max-time 30 "${test_url}" 2>/dev/null; then
    end_time=$(date +%s%N 2>/dev/null || date +%s)

    # Handle systems without nanosecond support
    if [[ "${start_time}" =~ N$ ]] || [[ ${#start_time} -lt 13 ]]; then
      elapsed_ms=$(( (end_time - start_time) * 1000 ))
    else
      elapsed_ms=$(( (end_time - start_time) / 1000000 ))
    fi

    if [[ "${elapsed_ms}" -gt 0 ]]; then
      speed_kbps=$(( 5000000 * 8 / elapsed_ms ))   # bits/ms = kbits/s
      speed_mbps=$(echo "scale=2; ${speed_kbps} / 1000" | bc 2>/dev/null || echo "?")
      ok "Download speed ≈ ${speed_mbps} Mbps  (${elapsed_ms} ms for 5 MB)"
    else
      warn "Could not calculate speed"
    fi
  else
    fail "Speed test failed (no connection or timeout)"
  fi
}

# ── DNS Check ────────────────────────────────────────────────────────────────
dns_check() {
  section "🔍 DNS Check"

  local domain="google.com"
  declare -A dns_servers=(
    ["Google"]="8.8.8.8"
    ["Cloudflare"]="1.1.1.1"
    ["Quad9"]="9.9.9.9"
    ["OpenDNS"]="208.67.222.222"
  )

  info "Resolving '${domain}' via multiple DNS servers:"
  echo ""

  for name in "${!dns_servers[@]}"; do
    local server="${dns_servers[$name]}"
    local start_ms end_ms elapsed
    start_ms=$(date +%s%3N 2>/dev/null || echo "0")

    if result=$(dig +short +timeout=3 "${domain}" @"${server}" 2>/dev/null | head -1); then
      end_ms=$(date +%s%3N 2>/dev/null || echo "0")
      elapsed=$(( end_ms - start_ms ))
      if [[ -n "${result}" ]]; then
        ok "${name} (${server})  → ${result}  [${elapsed} ms]"
      else
        fail "${name} (${server})  → no result"
      fi
    else
      fail "${name} (${server})  → failed"
    fi
  done
}

# ── Port Scan ────────────────────────────────────────────────────────────────
port_scan() {
  section "🔎 Local Network Scan"

  if ! command -v nmap &>/dev/null; then
    warn "nmap not installed. Install with: pkg install nmap"
    return
  fi

  # Get local subnet
  local my_ip gateway subnet
  my_ip=$(ip route get 1.1.1.1 2>/dev/null | awk '/src/{print $7}' | head -1)
  gateway=$(ip route show default 2>/dev/null | awk '/default/{print $3}' | head -1)

  if [[ -z "${my_ip}" ]]; then
    warn "Could not determine local IP"
    return
  fi

  # Derive subnet (simple /24 assumption)
  subnet="${my_ip%.*}.0/24"
  info "Local IP: ${my_ip}   Gateway: ${gateway:-unknown}"
  info "Scanning ${subnet} (this may take 30-60 seconds)..."
  echo ""

  if ! nmap -sn "${subnet}" --host-timeout 5s 2>/dev/null | \
      grep -E 'Nmap scan|report for|MAC' | \
      awk '{printf "  %s\n", $0}'; then
    warn "Scan failed or returned no results"
  fi
}

# ── Full Diagnostic ───────────────────────────────────────────────────────────
full_diagnostic() {
  section "📋 Full Network Diagnostic"
  local report_file="${HOME}/.tlc/netreport-$(date +%Y%m%d-%H%M%S).txt"
  mkdir -p "${HOME}/.tlc"

  {
    echo "TLC Network Diagnostic Report"
    echo "Generated: $(date)"
    echo "=================================================="
  } > "${report_file}"

  connection_test 2>&1 | tee -a "${report_file}"
  wifi_info       2>&1 | tee -a "${report_file}"
  speed_estimate  2>&1 | tee -a "${report_file}"
  dns_check       2>&1 | tee -a "${report_file}"

  echo -e "\n${GREEN}${BOLD}Report saved to: ${report_file}${RESET}"
}

# ── Menu ──────────────────────────────────────────────────────────────────────
show_menu() {
  echo -e "\n${CYAN}${BOLD}  🌐 TLC Net Check${RESET}"
  echo -e "  ${WHITE}─────────────────────────────${RESET}"
  echo -e "  ${CYAN}[1]${RESET} Connection Test  — ping & HTTP checks"
  echo -e "  ${CYAN}[2]${RESET} WiFi Info        — SSID, signal, IP"
  echo -e "  ${CYAN}[3]${RESET} Speed Estimate   — download throughput"
  echo -e "  ${CYAN}[4]${RESET} DNS Check        — resolver speed test"
  echo -e "  ${CYAN}[5]${RESET} Port Scan        — nmap local network"
  echo -e "  ${CYAN}[6]${RESET} Full Diagnostic  — run all + save report"
  echo -e "  ${CYAN}[0]${RESET} Back"
  echo -e "  ${WHITE}─────────────────────────────${RESET}\n"
}

main() {
  while true; do
    show_menu
    read -rp "  Choose [0-6]: " choice
    case "${choice}" in
      1) connection_test ;;
      2) wifi_info ;;
      3) speed_estimate ;;
      4) dns_check ;;
      5) port_scan ;;
      6) full_diagnostic ;;
      0|q|Q) break ;;
      *) warn "Invalid choice" ;;
    esac
    echo -e "\n  ${DIM}Press Enter to continue...${RESET}"
    read -r
  done
}

main "$@"
