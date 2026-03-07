#!/usr/bin/env python3
"""
TLC Command Station — Claude AI Chat + Terminal Agent
Men of Purpose OKC · v1.0

Features:
  - Interactive chat mode with conversation history
  - Single query mode: tlc ai "question here"
  - Terminal agent mode: approve & execute Claude-suggested commands
  - Streaming responses
  - Rich formatted output
"""

import os
import sys
import json
import re
import subprocess
import readline  # noqa: F401 — enables arrow-key history in input()
from pathlib import Path
from datetime import datetime
from typing import Optional

try:
    import requests
except ImportError:
    print("Missing dependency: requests\nRun: pip install requests rich")
    sys.exit(1)

try:
    from rich.console import Console
    from rich.markdown import Markdown
    from rich.panel import Panel
    from rich.prompt import Prompt, Confirm
    from rich.text import Text
    from rich.table import Table
    from rich import box
except ImportError:
    print("Missing dependency: rich\nRun: pip install requests rich")
    sys.exit(1)

# ── Constants ────────────────────────────────────────────────────────────────
CONFIG_DIR = Path.home() / ".tlc"
CONFIG_FILE = CONFIG_DIR / "config.env"
HISTORY_FILE = CONFIG_DIR / "chat_history.json"
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
DEFAULT_MODEL = "claude-sonnet-4-20250514"
MAX_HISTORY_TURNS = 20  # Keep last N conversation turns in memory

console = Console()

SYSTEM_PROMPT = """You are TLC Command Station AI — a practical terminal assistant running on Termux (Android, Galaxy Z Fold 5).

Environment:
- OS: Android (aarch64) running Termux
- Device: Samsung Galaxy Z Fold 5
- Shell: zsh/bash in Termux
- Available tools: standard Linux utilities, termux-api commands

You have access to termux-api commands for device integration:
- termux-battery-status       — battery level, health, temperature
- termux-wifi-connectioninfo  — WiFi SSID, signal, IP
- termux-clipboard-get/set    — clipboard access
- termux-notification         — send notifications
- termux-camera-photo         — take photos
- termux-sensor               — sensor data
- termux-location             — GPS location
- termux-sms-list             — list SMS messages
- termux-contact-list         — contacts

User context:
- Working on calisthenics/fitness app (Gravitas Fit / CONTROL)
- Building OKC community apps under "Men of Purpose OKC"
- Uses GitHub Copilot and Claude for development
- Interested in calisthenics, street workout, planche, handstand, front lever

When suggesting shell commands:
1. Wrap the command in a code block: ```bash\\ncommand here\\n```
2. Explain what the command does
3. Note any risks or prerequisites

Be concise, practical, and direct. Skip unnecessary preamble."""


# ── Config Loading ────────────────────────────────────────────────────────────
def load_config() -> dict:
    """Load configuration from ~/.tlc/config.env."""
    config = {
        "CLAUDE_API_KEY": os.environ.get("CLAUDE_API_KEY", ""),
        "CLAUDE_MODEL": os.environ.get("CLAUDE_MODEL", DEFAULT_MODEL),
    }

    if CONFIG_FILE.exists():
        with open(CONFIG_FILE) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    if value:
                        config[key] = value

    return config


# ── History Management ────────────────────────────────────────────────────────
def load_history() -> list:
    """Load conversation history from disk."""
    if HISTORY_FILE.exists():
        try:
            with open(HISTORY_FILE) as f:
                return json.load(f)
        except (json.JSONDecodeError, OSError):
            return []
    return []


def save_history(history: list) -> None:
    """Persist conversation history to disk."""
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


def trim_history(history: list) -> list:
    """Keep only the last MAX_HISTORY_TURNS turns."""
    if len(history) > MAX_HISTORY_TURNS * 2:
        return history[-(MAX_HISTORY_TURNS * 2):]
    return history


# ── Claude API ────────────────────────────────────────────────────────────────
def call_claude(
    messages: list,
    api_key: str,
    model: str,
    stream: bool = True,
) -> str:
    """Call the Anthropic Messages API and return the full response text."""
    headers = {
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    payload = {
        "model": model,
        "max_tokens": 4096,
        "system": SYSTEM_PROMPT,
        "messages": messages,
        "stream": stream,
    }

    full_response = ""

    if stream:
        with requests.post(
            ANTHROPIC_API_URL,
            headers=headers,
            json=payload,
            stream=True,
            timeout=60,
        ) as resp:
            if resp.status_code != 200:
                error_body = resp.text
                raise RuntimeError(
                    f"API error {resp.status_code}: {error_body}"
                )

            console.print()
            with console.status("", spinner="dots"):
                pass  # Clear spinner before streaming

            collected = []
            for raw_line in resp.iter_lines():
                if not raw_line:
                    continue
                line = raw_line.decode("utf-8") if isinstance(raw_line, bytes) else raw_line
                if line.startswith("data: "):
                    data_str = line[6:]
                    if data_str == "[DONE]":
                        break
                    try:
                        data = json.loads(data_str)
                        if data.get("type") == "content_block_delta":
                            delta = data.get("delta", {})
                            if delta.get("type") == "text_delta":
                                chunk = delta.get("text", "")
                                collected.append(chunk)
                                print(chunk, end="", flush=True)
                    except json.JSONDecodeError:
                        continue

            print()  # newline after stream
            full_response = "".join(collected)
    else:
        resp = requests.post(
            ANTHROPIC_API_URL,
            headers=headers,
            json=payload,
            timeout=60,
        )
        if resp.status_code != 200:
            raise RuntimeError(f"API error {resp.status_code}: {resp.text}")
        data = resp.json()
        full_response = data["content"][0]["text"]

    return full_response


# ── Command Extraction & Execution ────────────────────────────────────────────
def extract_commands(text: str) -> list[str]:
    """Extract bash/shell code blocks from Claude's response."""
    pattern = r"```(?:bash|sh|shell|zsh)?\n(.*?)```"
    matches = re.findall(pattern, text, re.DOTALL)
    return [m.strip() for m in matches if m.strip()]


def run_command(command: str) -> str:
    """Execute a shell command and return combined stdout/stderr."""
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=60,
        )
        output = result.stdout
        if result.stderr:
            output += "\n[stderr]\n" + result.stderr
        return output.strip()
    except subprocess.TimeoutExpired:
        return "[Error: command timed out after 60 seconds]"
    except Exception as e:
        return f"[Error running command: {e}]"


def handle_agent_commands(response: str, messages: list, api_key: str, model: str) -> list:
    """
    Detect commands in Claude's response, prompt user to run them,
    capture output, and feed results back to Claude.
    """
    commands = extract_commands(response)
    if not commands:
        return messages

    for cmd in commands:
        console.print(
            Panel(
                Text(cmd, style="bold green"),
                title="[yellow]⚡ Suggested Command[/yellow]",
                border_style="yellow",
            )
        )
        run_it = Confirm.ask("  Run this command?", default=False)
        if run_it:
            console.print(f"\n[dim]Running: {cmd}[/dim]")
            output = run_command(cmd)
            if output:
                console.print(
                    Panel(
                        Text(output, style="dim"),
                        title="[cyan]📤 Output[/cyan]",
                        border_style="cyan",
                    )
                )
                # Feed output back to Claude
                follow_up = f"Command output:\n```\n{output}\n```\nAnalyze this output."
                messages.append({"role": "user", "content": follow_up})
                console.print("\n[dim cyan]TLC AI is analyzing the output...[/dim cyan]")
                analysis = call_claude(messages, api_key, model, stream=True)
                messages.append({"role": "assistant", "content": analysis})
                console.print()
            else:
                console.print("[dim]Command ran with no output.[/dim]")

    return messages


# ── Chat Interface ────────────────────────────────────────────────────────────
def print_ai_response(text: str) -> None:
    """Render Claude's response with rich markdown formatting."""
    try:
        md = Markdown(text)
        console.print(
            Panel(md, title="[bright_cyan]🤖 TLC AI[/bright_cyan]", border_style="cyan")
        )
    except Exception:
        console.print(text)


def interactive_chat(api_key: str, model: str) -> None:
    """Run the interactive chat loop."""
    messages = load_history()

    console.print(
        Panel(
            "[bold cyan]TLC AI Chat[/bold cyan]\n"
            "[dim]Type your message, or use these commands:[/dim]\n"
            "  [yellow]/clear[/yellow]   — clear conversation history\n"
            "  [yellow]/model[/yellow]   — switch model\n"
            "  [yellow]/history[/yellow] — show recent history\n"
            "  [yellow]/exit[/yellow]    — exit chat",
            title="[bright_cyan]Men of Purpose OKC[/bright_cyan]",
            border_style="cyan",
        )
    )
    console.print(f"[dim]Model: {model}[/dim]\n")

    while True:
        try:
            user_input = Prompt.ask("[bold green]You[/bold green]").strip()
        except (KeyboardInterrupt, EOFError):
            console.print("\n[dim cyan]✌️  Stay purposeful.[/dim cyan]")
            break

        if not user_input:
            continue

        # Handle slash commands
        if user_input.startswith("/"):
            cmd = user_input.lower()
            if cmd in ("/exit", "/quit", "/q"):
                console.print("[dim cyan]✌️  Stay purposeful.[/dim cyan]")
                break
            elif cmd == "/clear":
                messages = []
                save_history(messages)
                console.print("[green]✓ History cleared.[/green]")
                continue
            elif cmd == "/history":
                if not messages:
                    console.print("[dim]No history yet.[/dim]")
                else:
                    table = Table(title="Recent History", box=box.SIMPLE)
                    table.add_column("Role", style="cyan", width=10)
                    table.add_column("Preview", style="white")
                    for msg in messages[-10:]:
                        preview = msg["content"][:80].replace("\n", " ")
                        table.add_row(msg["role"], preview)
                    console.print(table)
                continue
            elif cmd == "/model":
                new_model = Prompt.ask(
                    "Model",
                    choices=[
                        "claude-sonnet-4-20250514",
                        "claude-opus-4-20250514",
                        "claude-haiku-4-20250514",
                    ],
                    default=model,
                )
                model = new_model
                console.print(f"[green]✓ Switched to {model}[/green]")
                continue
            else:
                console.print(f"[red]Unknown command: {user_input}[/red]")
                continue

        # Add user message and call Claude
        messages.append({"role": "user", "content": user_input})
        messages = trim_history(messages)

        try:
            with console.status("[cyan]Thinking...[/cyan]"):
                pass
            console.print("\n[bold bright_cyan]🤖 TLC AI[/bold bright_cyan]")
            response = call_claude(messages, api_key, model, stream=True)
        except RuntimeError as e:
            console.print(f"[red]Error: {e}[/red]")
            messages.pop()  # Remove failed user message
            continue

        messages.append({"role": "assistant", "content": response})
        save_history(messages)

        # Check for agent commands
        messages = handle_agent_commands(response, messages, api_key, model)
        console.print()


def single_query(query: str, api_key: str, model: str) -> None:
    """Handle a single inline query: tlc ai "question"."""
    messages = [{"role": "user", "content": query}]

    console.print(f"\n[dim cyan]Query: {query}[/dim cyan]\n")
    console.print("[bold bright_cyan]🤖 TLC AI[/bold bright_cyan]")

    try:
        response = call_claude(messages, api_key, model, stream=True)
    except RuntimeError as e:
        console.print(f"[red]Error: {e}[/red]")
        sys.exit(1)

    console.print()
    # Check for agent commands
    handle_agent_commands(response, messages, api_key, model)


# ── Entry Point ───────────────────────────────────────────────────────────────
def main() -> None:
    config = load_config()
    api_key = config.get("CLAUDE_API_KEY", "")
    model = config.get("CLAUDE_MODEL", DEFAULT_MODEL)

    if not api_key or api_key == "sk-ant-your-key-here":
        console.print(
            Panel(
                "[red]Claude API key not configured.[/red]\n\n"
                f"Edit [yellow]{CONFIG_FILE}[/yellow] and set your CLAUDE_API_KEY.\n"
                "Get a key at: [link=https://console.anthropic.com]https://console.anthropic.com[/link]",
                title="[red]⚠️  Missing API Key[/red]",
                border_style="red",
            )
        )
        sys.exit(1)

    # Single query mode
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        single_query(query, api_key, model)
    else:
        interactive_chat(api_key, model)


if __name__ == "__main__":
    main()
