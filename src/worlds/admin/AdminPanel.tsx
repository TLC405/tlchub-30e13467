import React, { useState, useEffect } from "react";
import { X, ChevronUp, ChevronDown, Eye, EyeOff, Archive } from "lucide-react";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import { skillProgressions } from "@/data/skillProgressions";

// ── PIN hash (SHA-256 of "1309") stored as constant — PIN itself is NOT stored
const CORRECT_PIN_HASH = "0c1a70e4512ee6f78c92820756a4026ce1f93872369624f31cf206614b2e231f";

async function hashPin(pin: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pin));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── Storage helpers
const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const save = <T,>(key: string, val: T) => {
  localStorage.setItem(key, JSON.stringify(val));
};

// ── Types
interface WorldEntry {
  id: string;
  emoji: string;
  title: string;
  description: string;
  sourceRepo: string;
  enabled: boolean;
  archived: boolean;
}

interface DesignSettings {
  primaryColor: string;
  fontSize: "small" | "medium" | "large";
  borderRadius: number;
  compactMode: boolean;
}

interface AppSettings {
  appName: string;
  tagline: string;
  footerText: string;
  poweredBy: string;
  showFooter: boolean;
  showWhatsNew: boolean;
}

const DEFAULT_WORLDS: WorldEntry[] = [
  { id: "home", emoji: "🏠", title: "Home", description: "Personal dashboard", sourceRepo: "tlchub-30e13467", enabled: true, archived: false },
  { id: "train", emoji: "🏋️", title: "Train", description: "Olympic calisthenics mastery", sourceRepo: "calesthenicsbytlc", enabled: true, archived: false },
  { id: "watch", emoji: "🛡️", title: "Watch", description: "OKC Safety & Community Intelligence", sourceRepo: "hoodholla", enabled: true, archived: false },
  { id: "play", emoji: "🎮", title: "Play", description: "Games & Entertainment — Battle Arena", sourceRepo: "gender-clash-blueprint", enabled: true, archived: false },
  { id: "rewind", emoji: "📸", title: "Rewind", description: "AI Photo Time Travel", sourceRepo: "rewindbytlcstudios", enabled: true, archived: false },
  { id: "studio", emoji: "✨", title: "Studio", description: "AI Creative Tools", sourceRepo: "tlc5000", enabled: true, archived: false },
  { id: "okc", emoji: "🗺️", title: "OKC", description: "Your City — community resources", sourceRepo: "multiple", enabled: true, archived: false },
  { id: "wiki", emoji: "📖", title: "Wiki", description: "Owner knowledge base", sourceRepo: "tlchub-30e13467", enabled: true, archived: false },
];

const DEFAULT_DESIGN: DesignSettings = {
  primaryColor: "#000000",
  fontSize: "medium",
  borderRadius: 24,
  compactMode: false,
};

const DEFAULT_APP_SETTINGS: AppSettings = {
  appName: "TLC WORLD",
  tagline: "Your Personal Operating System",
  footerText: "Powered by TLC · Men of Purpose OKC Foundation",
  poweredBy: "TLC · Men of Purpose OKC Foundation",
  showFooter: true,
  showWhatsNew: true,
};

const REPOS = [
  { name: "tlchub-30e13467", target: "This repo", status: "ACTIVE" },
  { name: "calesthenicsbytlc", target: "Train", status: "TO MERGE" },
  { name: "hoodholla", target: "Watch", status: "TO MERGE" },
  { name: "gender-clash-blueprint", target: "Play", status: "TO MERGE" },
  { name: "rewindbytlcstudios", target: "Rewind", status: "TO MERGE" },
  { name: "tlc5000", target: "Studio", status: "TO MERGE" },
  { name: "okc-street-stories", target: "—", status: "ARCHIVE" },
  { name: "backtofuture", target: "—", status: "ARCHIVE" },
  { name: "OKC-Command-Station", target: "—", status: "ARCHIVE" },
  { name: "okc-3d-street-map", target: "—", status: "ARCHIVE (Unreal Engine)" },
];

type AdminTab = "worlds" | "content" | "theme" | "repos" | "settings";

const ADMIN_TABS = [
  { id: "worlds", label: "Worlds" },
  { id: "content", label: "Content" },
  { id: "theme", label: "Theme" },
  { id: "repos", label: "Repos" },
  { id: "settings", label: "Settings" },
];

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("worlds");

  // State per tab
  const [worlds, setWorlds] = useState<WorldEntry[]>(() =>
    load("tlcworld_admin_worlds", DEFAULT_WORLDS)
  );
  const [design, setDesign] = useState<DesignSettings>(() =>
    load("tlcworld_admin_design", DEFAULT_DESIGN)
  );
  const [appSettings, setAppSettings] = useState<AppSettings>(() =>
    load("tlcworld_admin_settings", DEFAULT_APP_SETTINGS)
  );

  // Persist on change
  useEffect(() => { save("tlcworld_admin_worlds", worlds); }, [worlds]);
  useEffect(() => { save("tlcworld_admin_design", design); }, [design]);
  useEffect(() => { save("tlcworld_admin_settings", appSettings); }, [appSettings]);

  const handleUnlock = async () => {
    const hash = await hashPin(pin);
    if (hash === CORRECT_PIN_HASH) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  const moveWorld = (idx: number, dir: -1 | 1) => {
    const next = [...worlds];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setWorlds(next);
  };

  const toggleWorld = (id: string) => {
    setWorlds((w) => w.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e)));
  };

  const restoreWorld = (id: string) => {
    setWorlds((prev) =>
      prev.map((e) => (e.id === id ? { ...e, archived: false, enabled: true } : e))
    );
  };

  const archiveWorld = (id: string) => {
    setWorlds((w) => w.map((e) => (e.id === id ? { ...e, archived: true, enabled: false } : e)));
  };

  const statusColor = (status: string) => {
    if (status === "ACTIVE") return "bg-foreground text-background";
    if (status === "TO MERGE") return "border-[2px] border-foreground text-foreground";
    return "text-muted-foreground border-[2px] border-muted";
  };

  // ── PIN Screen
  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div className="w-full max-w-sm border-[3px] border-foreground rounded-2xl bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-black text-foreground">Admin Panel</h2>
            <button onClick={onClose} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-md">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Enter PIN to unlock</p>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="····"
            className="w-full text-center text-2xl font-black tracking-widest border-[3px] border-foreground rounded-xl bg-background text-foreground py-3 mb-3 focus:outline-none"
            autoFocus
          />
          {pinError && (
            <p className="text-xs text-destructive font-bold mb-3 text-center">Wrong PIN. Try again.</p>
          )}
          <button
            onClick={handleUnlock}
            className="w-full py-3 border-[3px] border-foreground rounded-xl bg-foreground text-background font-black text-sm tracking-widest uppercase"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  // ── Admin Tabs
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      <div className="flex-1 overflow-y-auto bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b-[3px] border-foreground bg-card px-4 py-3 flex items-center justify-between">
          <h2 className="font-serif text-lg font-black text-foreground">⚙️ Admin Panel</h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-md border-[2px] border-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="border-b-[2px] border-foreground bg-card overflow-x-auto">
          <div className="flex min-w-max px-2 gap-1 py-1">
            {ADMIN_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3 py-1.5 text-xs font-bold tracking-wide uppercase rounded-sm border-[2px] border-foreground min-h-[36px] whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pb-8 max-w-3xl mx-auto space-y-4">
          {/* ── Worlds Manager */}
          {activeTab === "worlds" && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-black uppercase tracking-wider">Worlds Manager</h3>
              {worlds.filter((w) => !w.archived).map((world, idx) => (
                <div key={world.id} className="border-[3px] border-foreground rounded-2xl p-4 bg-card space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xl shrink-0">{world.emoji}</span>
                      <span className="font-black text-foreground text-sm truncate">{world.title}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveWorld(idx, -1)}
                        disabled={idx === 0}
                        className="h-7 w-7 flex items-center justify-center border-[2px] border-foreground rounded hover:bg-muted disabled:opacity-30"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => moveWorld(idx, 1)}
                        disabled={idx === worlds.filter((w) => !w.archived).length - 1}
                        className="h-7 w-7 flex items-center justify-center border-[2px] border-foreground rounded hover:bg-muted disabled:opacity-30"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => toggleWorld(world.id)}
                        className="h-7 w-7 flex items-center justify-center border-[2px] border-foreground rounded hover:bg-muted"
                        title={world.enabled ? "Disable" : "Enable"}
                      >
                        {world.enabled ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </button>
                      <button
                        onClick={() => archiveWorld(world.id)}
                        className="h-7 w-7 flex items-center justify-center border-[2px] border-foreground rounded hover:bg-muted"
                        title="Archive"
                      >
                        <Archive className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{world.description}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">repo: {world.sourceRepo}</p>
                  <div className={`inline-flex items-center text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded-full ${world.enabled ? "bg-foreground text-background" : "border-[2px] border-muted text-muted-foreground"}`}>
                    {world.enabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
              ))}
              {worlds.some((w) => w.archived) && (
                <div className="border-[2px] border-muted rounded-2xl p-3 bg-card">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Archived</p>
                  {worlds.filter((w) => w.archived).map((w) => (
                    <div key={w.id} className="flex items-center gap-2 py-1">
                      <span>{w.emoji}</span>
                      <span className="text-sm text-muted-foreground line-through">{w.title}</span>
                      <button
                        onClick={() => restoreWorld(w.id)}
                        className="text-xs underline font-bold ml-auto"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Content Manager */}
          {activeTab === "content" && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-black uppercase tracking-wider">Content Manager</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-[3px] border-foreground rounded-2xl p-4 bg-card">
                  <p className="text-2xl font-black text-foreground">{exerciseDatabase.length}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Exercises</p>
                </div>
                <div className="border-[3px] border-foreground rounded-2xl p-4 bg-card">
                  <p className="text-2xl font-black text-foreground">{skillProgressions.length}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Skill Trees</p>
                </div>
              </div>
              <div className="border-[3px] border-foreground rounded-2xl p-4 bg-card space-y-2">
                <p className="font-bold text-sm">Data Sources</p>
                {[
                  { label: "exerciseDatabase.ts", path: "src/data/exerciseDatabase.ts" },
                  { label: "skillProgressions.ts", path: "src/data/skillProgressions.ts" },
                  { label: "controlContent.ts", path: "src/data/controlContent.ts" },
                  { label: "learningPrinciples.ts", path: "src/data/learningPrinciples.ts" },
                ].map((ds) => (
                  <div key={ds.label} className="flex items-center justify-between py-1 border-b-[1px] border-foreground/10 last:border-0">
                    <span className="text-xs font-mono text-foreground">{ds.label}</span>
                    <span className="text-[10px] text-muted-foreground">{ds.path}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const data = {
                    exercises: exerciseDatabase,
                    skillProgressions,
                    adminWorlds: worlds,
                    adminDesign: design,
                    adminSettings: appSettings,
                  };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "tlcworld-export.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-3 border-[3px] border-foreground rounded-xl bg-foreground text-background font-black text-xs tracking-widest uppercase"
              >
                Export All Data as JSON
              </button>
            </div>
          )}

          {/* ── Theme & Design */}
          {activeTab === "theme" && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-black uppercase tracking-wider">Theme & Design</h3>
              <div className="border-[3px] border-foreground rounded-2xl p-4 bg-card space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground block mb-1">Font Size</label>
                  <div className="flex gap-2">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setDesign((d) => ({ ...d, fontSize: size }))}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg border-[2px] border-foreground transition-colors ${design.fontSize === size ? "bg-foreground text-background" : "bg-card text-foreground"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground block mb-1">
                    Border Radius: {design.borderRadius}px
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={24}
                    step={4}
                    value={design.borderRadius}
                    onChange={(e) => setDesign((d) => ({ ...d, borderRadius: Number(e.target.value) }))}
                    className="w-full accent-foreground"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span>0px flat</span><span>24px rounded</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Compact Mode</p>
                    <p className="text-[10px] text-muted-foreground">Tighter spacing for small phones</p>
                  </div>
                  <button
                    onClick={() => setDesign((d) => ({ ...d, compactMode: !d.compactMode }))}
                    className={`h-8 px-3 rounded-lg border-[2px] border-foreground text-xs font-bold uppercase tracking-wide transition-colors ${design.compactMode ? "bg-foreground text-background" : "bg-card text-foreground"}`}
                  >
                    {design.compactMode ? "On" : "Off"}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Settings saved to localStorage automatically.</p>
            </div>
          )}

          {/* ── Repos & Archive */}
          {activeTab === "repos" && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-black uppercase tracking-wider">Repos & Archive</h3>
              {REPOS.map((repo) => (
                <div key={repo.name} className="border-[3px] border-foreground rounded-2xl p-4 bg-card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono font-bold text-sm text-foreground truncate">{repo.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Target: {repo.target}</p>
                    </div>
                    <span className={`text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded-full shrink-0 ${statusColor(repo.status)}`}>
                      {repo.status}
                    </span>
                  </div>
                  <a
                    href={`https://github.com/TLC405/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] underline text-muted-foreground mt-1 inline-block font-mono"
                  >
                    github.com/TLC405/{repo.name}
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* ── App Settings */}
          {activeTab === "settings" && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-black uppercase tracking-wider">App Settings</h3>
              <div className="border-[3px] border-foreground rounded-2xl p-4 bg-card space-y-4">
                {(
                  [
                    { key: "appName", label: "App Name" },
                    { key: "tagline", label: "Tagline" },
                    { key: "footerText", label: "Footer Text" },
                    { key: "poweredBy", label: "Powered By" },
                  ] as { key: keyof AppSettings; label: string }[]
                ).map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground block mb-1">{label}</label>
                    <input
                      type="text"
                      value={appSettings[key] as string}
                      onChange={(e) => setAppSettings((s) => ({ ...s, [key]: e.target.value }))}
                      className="w-full px-3 py-2 border-[2px] border-foreground rounded-lg bg-background text-foreground text-sm focus:outline-none"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider">Show Footer</p>
                  <button
                    onClick={() => setAppSettings((s) => ({ ...s, showFooter: !s.showFooter }))}
                    className={`h-8 px-3 rounded-lg border-[2px] border-foreground text-xs font-bold uppercase tracking-wide transition-colors ${appSettings.showFooter ? "bg-foreground text-background" : "bg-card text-foreground"}`}
                  >
                    {appSettings.showFooter ? "On" : "Off"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider">Show What's New</p>
                  <button
                    onClick={() => setAppSettings((s) => ({ ...s, showWhatsNew: !s.showWhatsNew }))}
                    className={`h-8 px-3 rounded-lg border-[2px] border-foreground text-xs font-bold uppercase tracking-wide transition-colors ${appSettings.showWhatsNew ? "bg-foreground text-background" : "bg-card text-foreground"}`}
                  >
                    {appSettings.showWhatsNew ? "On" : "Off"}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">All settings saved to localStorage automatically.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
