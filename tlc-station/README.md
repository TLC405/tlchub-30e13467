# TLC Command Station

> **Men of Purpose OKC · Command Station v1.0**
> A unified AI-powered CLI tool for Termux on Android.

```
  ╔════════════════════════════════════════╗
  ║   _____ _      ____                   ║
  ║  |_   _| |    / ___|                  ║
  ║    | | | |   | |                      ║
  ║    | | | |___| |___                   ║
  ║    |_| |_____|\____|                  ║
  ║                                       ║
  ║  Men of Purpose OKC                   ║
  ║  Command Station v1.0                 ║
  ╚════════════════════════════════════════╝
```

---

## Features

| Command | Description |
|---------|-------------|
| `tlc` | Launch the interactive hub menu |
| `tlc ai` | Open Claude AI chat (interactive) |
| `tlc ai "question"` | Quick inline AI query |
| `tlc clean` | Phone cleanup & optimization |
| `tlc net` | Internet diagnostics |
| `tlc mon` | Real-time system monitor |
| `tlc gh` | GitHub tools (push, PR, Copilot) |
| `tlc apps` | Termux package manager |
| `tlc config` | Edit settings & API keys |

---

## Quick Start

### 1. Clone the repo (if you haven't already)

```bash
git clone https://github.com/TLC405/tlchub-30e13467.git
cd tlchub-30e13467/tlc-station
```

### 2. Run the installer

```bash
bash install.sh
```

The installer will:
- Install all required Termux packages
- Install Python dependencies (`requests`, `rich`)
- Set up Oh My Zsh + Powerlevel10k + plugins
- Configure Termux colors and extra keys
- Prompt for your Claude API key
- Create the global `tlc` command
- Generate a fully-configured `~/.zshrc`

### 3. Reload your shell

```bash
source ~/.zshrc
```

Or close and reopen Termux.

### 4. Add your Claude API key (if you skipped the prompt)

```bash
tlc config
# Choose [1] Edit config file
# Set CLAUDE_API_KEY=sk-ant-...
```

Or edit directly:
```bash
nano ~/.tlc/config.env
```

### 5. Launch TLC

```bash
tlc
```

---

## Manual Setup (without installer)

If you prefer manual installation:

```bash
# Install required packages
pkg install python git curl jq gh

# Install Python packages
pip install requests rich

# Make scripts executable
chmod +x tlc optimizer.sh netcheck.sh ghcop.sh monitor.sh ai.py

# Create config
mkdir -p ~/.tlc
cp config.example.env ~/.tlc/config.env
nano ~/.tlc/config.env  # Add your CLAUDE_API_KEY

# Create symlink
ln -sf $(pwd)/tlc $PREFIX/bin/tlc
```

---

## File Structure

```
tlc-station/
├── install.sh          # One-command Termux installer
├── tlc                 # Main CLI entry point (bash)
├── ai.py               # Claude AI chat + terminal agent
├── optimizer.sh        # Phone cleanup & optimization
├── netcheck.sh         # Internet diagnostics
├── ghcop.sh            # GitHub Copilot CLI integration
├── monitor.sh          # System monitoring dashboard
├── config.example.env  # Config template
└── README.md           # This file
```

---

## Module Details

### 🤖 AI Chat (`tlc ai`)

- Interactive chat with conversation history
- Single query mode: `tlc ai "what is planche"`
- **Terminal Agent mode** — Claude suggests shell commands, you approve them, output is fed back to Claude
- Streaming responses with rich markdown rendering
- Conversation history saved to `~/.tlc/chat_history.json`
- Model selection: Sonnet (default), Opus, Haiku

**Chat commands:**
```
/clear    — clear conversation history
/model    — switch Claude model
/history  — show recent history
/exit     — exit chat
```

### 🧹 Optimizer (`tlc clean`)

- **Quick Clean** — package cache, /tmp, pip/npm cache
- **Deep Clean** — + large files (>50MB), old logs, build artifacts
- **Storage Report** — disk usage breakdown with visual bars
- **Memory Boost** — RAM usage, top processes, option to kill
- **Battery Report** — level, health, temperature via termux-api
- **All-in-One** — run everything in sequence

### 🌐 Net Check (`tlc net`)

- **Connection Test** — ping multiple hosts, HTTP response times
- **WiFi Info** — SSID, signal, IP (via termux-api)
- **Speed Estimate** — download throughput from Cloudflare
- **DNS Check** — resolve speed across Google/Cloudflare/Quad9/OpenDNS
- **Port Scan** — nmap local network discovery
- **Full Diagnostic** — all of the above + saves report to `~/.tlc/`

### 📊 Monitor (`tlc mon`)

Live-refreshing dashboard (every 5 seconds):
- CPU usage with visual progress bar
- RAM used/total with visual bar
- Storage per mount with visual bars
- Battery level, status, temperature (termux-api)
- Network interface, IP, WiFi signal
- System uptime
- Top 5 processes by CPU and by memory

### 🐙 GitHub (`tlc gh`)

- **Status** — branch, changes, ahead/behind, recent commits
- **Quick Push** — `git add . && git commit -m "..." && git push`
- **Pull Latest** — pull with conflict detection
- **Repo List** — `gh repo list`
- **Clone Repo** — interactive clone with shorthand support
- **Copilot Chat** — `gh copilot suggest` (installs extension if needed)
- **PR Create** — `gh pr create` with prompts
- **Issues** — list and create issues

---

## Configuration

Config file: `~/.tlc/config.env`

```env
# Claude API Key (required for AI features)
CLAUDE_API_KEY=sk-ant-your-key-here

# Default Claude model
CLAUDE_MODEL=claude-sonnet-4-20250514

# GitHub token (optional — gh CLI handles auth separately)
GITHUB_TOKEN=

# Preferred editor
EDITOR=nvim

# Theme (dark/light)
THEME=dark
```

---

## Requirements

| Requirement | Purpose |
|-------------|---------|
| Termux (Android) | Runtime environment |
| Termux:API app | Battery, WiFi, clipboard features |
| Python 3 | AI chat module |
| `requests` + `rich` | API calls + beautiful output |
| Claude API key | AI features |
| `gh` CLI | GitHub features |
| `nmap` | Network scanning |
| `dig`/`dnsutils` | DNS diagnostics |

---

## Tips & Keybindings

- **Ctrl+C** — cancel current operation, return to menu
- **Ctrl+D** — exit chat
- In the monitor, press **q** to quit, any other key to refresh
- The AI terminal agent always asks before running commands — stay safe!
- Conversation history is automatically trimmed to the last 20 turns

---

## Troubleshooting

**`tlc: command not found`**
```bash
export PATH="$PATH:$(pwd)"  # or re-run install.sh
```

**`Missing dependency: requests`**
```bash
pip install requests rich
```

**Battery/WiFi info shows N/A**
- Install the **Termux:API** app from F-Droid (not Play Store)
- Grant permissions in Android Settings → Apps → Termux:API

**Claude API errors**
- Check your key in `~/.tlc/config.env`
- Verify your key at https://console.anthropic.com

---

## License

Part of the TLC Hub repository. Men of Purpose OKC.
