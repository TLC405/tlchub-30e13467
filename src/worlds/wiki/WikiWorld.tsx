import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface Guide {
  id: string;
  emoji: string;
  title: string;
  content: string[];
}

const GUIDES: Guide[] = [
  {
    id: "how-it-works",
    emoji: "⚙️",
    title: "How This App Works",
    content: [
      "TLC WORLD is built with React + Vite + TypeScript.",
      "It uses shadcn-ui components (buttons, cards, tabs, etc.) for all UI elements.",
      "Tailwind CSS handles all styling with utility classes like `p-4`, `text-sm`, `bg-card`.",
      "Data lives in `src/data/` as TypeScript files — no database needed for static content.",
      "State is saved in localStorage (no server needed for basics like admin settings).",
      "Lovable can edit this code directly — just describe what you want in plain English.",
    ],
  },
  {
    id: "add-world",
    emoji: "🌍",
    title: "How to Add a New World",
    content: [
      "Step 1: Create a folder `src/worlds/yourworld/`",
      "Step 2: Create `YourWorld.tsx` component inside that folder.",
      "Step 3: Add it to the worlds array in `src/components/layout/WorldTabBar.tsx` (DEFAULT_WORLDS).",
      "Step 4: Import it in `WorldShell.tsx` and add a case in the `renderWorld()` switch.",
      "Step 5: Add it to the admin panel worlds list in `AdminPanel.tsx`.",
      "Step 6: Deploy via Lovable — it commits directly to this repo.",
    ],
  },
  {
    id: "lovable",
    emoji: "💜",
    title: "How to Use Lovable",
    content: [
      "Go to your Lovable project URL (lovable.dev).",
      "Type what you want changed in plain English — be specific about what you want.",
      "Lovable commits directly to this repo and changes appear in seconds.",
      "Tip: Mention file names when you know them (e.g., 'in WorldShell.tsx, change...').",
      "Tip: Describe the visual result you want ('make the header taller, add a gradient').",
      "Tip: Reference existing patterns ('make it look like the other world cards').",
    ],
  },
  {
    id: "copilot",
    emoji: "🤖",
    title: "How to Use GitHub Copilot",
    content: [
      "Open any file on github.com — just navigate to the file in the browser.",
      "Click the Copilot chat icon (top right of the file view).",
      "Ask it to explain code, fix bugs, or write new features.",
      "You can ask Copilot to 'create a PR' and it will do the full implementation work.",
      "Tip: Ask 'What does this function do?' to understand existing code.",
      "Works great from your phone browser — no desktop needed.",
    ],
  },
  {
    id: "merge-repo",
    emoji: "🔀",
    title: "How to Merge Another Repo Into a World",
    content: [
      "Step 1: Open the source repo (e.g., hoodholla) on GitHub.",
      "Step 2: Copy the key components you need (use Copilot to help identify what to take).",
      "Step 3: Paste them into the target world folder (e.g., `src/worlds/watch/`).",
      "Step 4: Update all import paths to match the new location.",
      "Step 5: Fix any TypeScript errors (Copilot can do this for you).",
      "Step 6: Test in Lovable preview — it shows live changes.",
      "Step 7: Archive the old repo on GitHub (Settings → Archive repository).",
    ],
  },
  {
    id: "admin-panel",
    emoji: "🔧",
    title: "How to Use the Admin Panel",
    content: [
      "Tap the gear icon (⚙️) in the top-right header of TLC WORLD.",
      "Enter PIN: 1309 to unlock the admin panel.",
      "Worlds Manager: Show/hide worlds, reorder them, and edit their metadata.",
      "Content Manager: View exercise counts, skill trees, and data sources.",
      "Theme & Design: Change colors, font sizes, border radius, and compact mode.",
      "Repos & Archive: Track which TLC405 repos are merged, pending, or archived.",
      "App Settings: Change app name, tagline, footer text, and visibility toggles.",
    ],
  },
  {
    id: "mobile-tips",
    emoji: "📱",
    title: "Mobile Coding Tips",
    content: [
      "Use Lovable for big changes — it's phone-optimized and has a great mobile UI.",
      "Use the GitHub mobile app for quick single-file edits.",
      "Use Copilot chat on github.com for AI help — works in mobile browser.",
      "Keep commits small and focused — one feature or fix per commit.",
      "Always test in Lovable preview before merging to main.",
      "Use the admin panel on your phone to manage worlds without touching code.",
    ],
  },
  {
    id: "supabase",
    emoji: "🗄️",
    title: "Supabase Setup (When Ready)",
    content: [
      "CalX Bulls (calesthenicsbytlc) already has a Supabase backend set up.",
      "Tables: exercises, workouts, profiles, progressions, workout_templates.",
      "To connect this app: add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.",
      "Install the client: `npm install @supabase/supabase-js`",
      "Copy the client setup from calesthenicsbytlc/src/integrations/supabase/client.ts.",
      "Once connected, data from localStorage can migrate to real-time cloud storage.",
    ],
  },
];

const WikiWorld: React.FC = () => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = GUIDES.filter(
    (g) =>
      search === "" ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.content.some((line) => line.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 pb-8 space-y-4">
      {/* Header */}
      <div className="border-[3px] border-foreground rounded-2xl p-4 bg-card">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl">📖</span>
          <h2 className="font-serif text-2xl font-black text-foreground">Wiki</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Owner's knowledge base — guides for building and maintaining TLC WORLD from your phone.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search guides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border-[3px] border-foreground rounded-xl bg-background text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none"
        />
      </div>

      {/* Guides */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="border-[3px] border-foreground rounded-2xl p-6 bg-card text-center">
            <p className="text-sm text-muted-foreground">No guides match "{search}"</p>
          </div>
        )}
        {filtered.map((guide) => {
          const isOpen = expanded === guide.id;
          return (
            <div
              key={guide.id}
              className="border-[3px] border-foreground rounded-2xl bg-card overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(guide.id)}
                className="w-full flex items-center justify-between p-4 text-left gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{guide.emoji}</span>
                  <span className="font-serif font-black text-foreground text-base leading-tight">
                    {guide.title}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="border-t-[2px] border-foreground px-4 pb-4 pt-3">
                  <ol className="space-y-2">
                    {guide.content.map((line, i) => (
                      <li key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                        <span className="text-muted-foreground font-bold shrink-0 w-5 text-right">
                          {i + 1}.
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WikiWorld;
