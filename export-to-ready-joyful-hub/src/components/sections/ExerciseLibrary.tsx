import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, LayoutGrid, LayoutList, ChevronLeft, ChevronRight,
  Dumbbell, ArrowDownToLine, ArrowUpFromLine, Footprints,
  Target, Move, Star, Flower2, Music, X, Play, Filter,
  SlidersHorizontal
} from 'lucide-react';
import { exercises } from '@/lib/exercises';
import type { Exercise, Category, Difficulty, TrackId } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ExerciseDetailModal } from '@/components/shared/ExerciseDetailModal';

// ─── Category config with icons + colors ───
const categoryConfig: Record<Category, { label: string; icon: typeof Dumbbell; color: string; bg: string }> = {
  push:     { label: 'Push',      icon: ArrowUpFromLine, color: 'text-red-500',    bg: 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20' },
  pull:     { label: 'Pull',      icon: ArrowDownToLine, color: 'text-blue-500',   bg: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20' },
  legs:     { label: 'Legs',      icon: Footprints,      color: 'text-amber-500',  bg: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20' },
  core:     { label: 'Core',      icon: Target,          color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20' },
  mobility: { label: 'Mobility',  icon: Move,            color: 'text-teal-500',   bg: 'bg-teal-500/10 border-teal-500/20 hover:bg-teal-500/20' },
  skills:   { label: 'Skills',    icon: Star,            color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20' },
  yoga:     { label: 'Yoga',      icon: Flower2,         color: 'text-emerald-500',bg: 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20' },
  ballet:   { label: 'Ballet',    icon: Music,           color: 'text-pink-500',   bg: 'bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20' },
};

const categoryOrder: Category[] = ['push', 'pull', 'legs', 'core', 'mobility', 'skills', 'yoga', 'ballet'];

const difficulties: { id: Difficulty | 'all'; label: string; color: string }[] = [
  { id: 'all',          label: 'All',          color: '' },
  { id: 'easy',         label: 'Easy',         color: 'text-gray-500' },
  { id: 'beginner',     label: 'Beginner',     color: 'text-emerald-500' },
  { id: 'intermediate', label: 'Intermediate', color: 'text-amber-500' },
  { id: 'advanced',     label: 'Advanced',     color: 'text-red-500' },
  { id: 'master',       label: 'Master',       color: 'text-purple-500' },
];

const trackFilters: { id: TrackId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Tracks' },
  { id: 'planche', label: 'Planche' },
  { id: 'handstand', label: 'Handstand' },
  { id: 'rings', label: 'Rings' },
  { id: 'compression', label: 'Compression' },
  { id: 'press', label: 'Press' },
  { id: 'pull-strength', label: 'Pull' },
  { id: 'legs', label: 'Legs' },
  { id: 'forearm-stand', label: 'Forearm Stand' },
  { id: 'elbow-stand', label: 'Elbow Stand' },
  { id: 'grip', label: 'Grip' },
  { id: 'yoga-flow', label: 'Yoga Flow' },
  { id: 'ballet-barre', label: 'Ballet Barre' },
];

const difficultyBadge: Record<string, string> = {
  easy: 'difficulty-easy',
  beginner: 'difficulty-beginner',
  intermediate: 'difficulty-intermediate',
  advanced: 'difficulty-advanced',
  master: 'difficulty-master',
};

const ITEMS_PER_PAGE = 24;

function getYouTubeThumbnail(exercise: Exercise): string | null {
  if (exercise.thumbnailUrl) return exercise.thumbnailUrl;
  if (exercise.videoUrl) {
    const match = exercise.videoUrl.match(/v=([^&]+)/);
    if (match) return `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}

// ─── Category count badges ───
function getCategoryCounts() {
  const counts: Record<string, number> = {};
  exercises.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
  return counts;
}

export function ExerciseLibrary() {
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [trackFilter, setTrackFilter] = useState<TrackId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const categoryCounts = useMemo(getCategoryCounts, []);

  const filtered = useMemo(() => {
    return exercises.filter(e => {
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      if (difficultyFilter !== 'all' && e.difficulty !== difficultyFilter) return false;
      if (trackFilter !== 'all' && !e.tracks.includes(trackFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return e.name.toLowerCase().includes(q) ||
               e.category.toLowerCase().includes(q) ||
               e.muscles.some(m => m.toLowerCase().includes(q));
      }
      return true;
    });
  }, [categoryFilter, difficultyFilter, trackFilter, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeFilterCount = (categoryFilter !== 'all' ? 1 : 0) + (difficultyFilter !== 'all' ? 1 : 0) + (trackFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setCategoryFilter('all');
    setDifficultyFilter('all');
    setTrackFilter('all');
    setSearch('');
    setPage(1);
  };

  const updateFilter = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <section className="relative px-4 py-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-end justify-between gap-4 mb-1">
          <div>
            <h2 className="text-editorial-sm text-foreground leading-none">EXERCISE LIBRARY</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} exercise{filtered.length !== 1 ? 's' : ''}
              {categoryFilter !== 'all' && ` in ${categoryConfig[categoryFilter].label}`}
              {difficultyFilter !== 'all' && ` · ${difficultyFilter}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-all",
                showFilters || activeFilterCount > 0
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-0.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="flex gap-px border border-foreground/10">
              <button
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 transition-colors", viewMode === 'list' ? "bg-foreground text-card" : "text-muted-foreground hover:text-foreground")}
              >
                <LayoutList className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 transition-colors", viewMode === 'grid' ? "bg-foreground text-card" : "text-muted-foreground hover:text-foreground")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-[3px] bg-foreground mt-2" />
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search exercises, muscles, categories..."
            className="w-full border border-foreground/10 bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category pills — always visible */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => updateFilter(setCategoryFilter, 'all')}
          className={cn(
            "flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-all",
            categoryFilter === 'all'
              ? "border-foreground bg-foreground text-card"
              : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
          )}
        >
          All
          <span className="text-[10px] opacity-60">{exercises.length}</span>
        </button>
        {categoryOrder.map(cat => {
          const conf = categoryConfig[cat];
          const Icon = conf.icon;
          const count = categoryCounts[cat] || 0;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => updateFilter(setCategoryFilter, categoryFilter === cat ? 'all' : cat)}
              className={cn(
                "flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-all",
                categoryFilter === cat
                  ? `${conf.bg} ${conf.color} border-current`
                  : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {conf.label}
              <span className="text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mb-4 grid gap-3 border border-foreground/10 bg-card p-4 sm:grid-cols-2">
              {/* Difficulty */}
              <div>
                <label className="mb-2 block text-label text-[10px] text-muted-foreground">DIFFICULTY</label>
                <div className="flex flex-wrap gap-1">
                  {difficulties.map(d => (
                    <button
                      key={d.id}
                      onClick={() => updateFilter(setDifficultyFilter, difficultyFilter === d.id ? 'all' : d.id as Difficulty | 'all')}
                      className={cn(
                        "border px-2.5 py-1 text-[11px] font-medium transition-all",
                        difficultyFilter === d.id
                          ? "border-foreground bg-foreground text-card"
                          : "border-foreground/10 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Track */}
              <div>
                <label className="mb-2 block text-label text-[10px] text-muted-foreground">TRACK</label>
                <select
                  value={trackFilter}
                  onChange={(e) => updateFilter(setTrackFilter, e.target.value as TrackId | 'all')}
                  className="w-full border border-foreground/10 bg-transparent px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  {trackFilters.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>

              {/* Clear all */}
              {activeFilterCount > 0 && (
                <div className="sm:col-span-2">
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((exercise) => {
            const thumb = getYouTubeThumbnail(exercise);
            const catConf = categoryConfig[exercise.category];
            const CatIcon = catConf.icon;
            return (
              <motion.div
                key={exercise.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedExercise(exercise)}
                className="group cursor-pointer border border-foreground/8 bg-card transition-all hover:border-foreground/20 hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-surface-0">
                  {exercise.image ? (
                    <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : thumb ? (
                    <img src={thumb} alt={exercise.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <CatIcon className={cn("h-10 w-10 opacity-20", catConf.color)} />
                    </div>
                  )}

                  {/* Play button overlay for videos */}
                  {exercise.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card/90 opacity-0 transition-all group-hover:opacity-100 group-hover:scale-100 scale-75">
                        <Play className="h-4 w-4 text-foreground ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Difficulty badge */}
                  <div className="absolute left-2 top-2">
                    <span className={cn("border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-card/90 backdrop-blur-sm", difficultyBadge[exercise.difficulty])}>
                      {exercise.difficulty}
                    </span>
                  </div>

                  {/* Category icon */}
                  <div className="absolute right-2 top-2">
                    <div className={cn("flex h-6 w-6 items-center justify-center bg-card/90 backdrop-blur-sm", catConf.color)}>
                      <CatIcon className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-chalk text-sm leading-tight">{exercise.name}</h3>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{exercise.shortPurpose}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className={cn("text-[10px] font-semibold", catConf.color)}>{catConf.label}</span>
                    <span className="text-foreground/20">·</span>
                    <span className="text-[10px] text-muted-foreground">{exercise.muscles.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="border border-foreground/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-foreground bg-card">
                <th className="px-4 py-2.5 text-left text-label text-[10px] text-foreground">EXERCISE</th>
                <th className="hidden px-4 py-2.5 text-left text-label text-[10px] text-foreground sm:table-cell">CATEGORY</th>
                <th className="hidden px-4 py-2.5 text-left text-label text-[10px] text-foreground md:table-cell">DIFFICULTY</th>
                <th className="hidden px-4 py-2.5 text-left text-label text-[10px] text-foreground lg:table-cell">MUSCLES</th>
                <th className="hidden px-4 py-2.5 text-center text-label text-[10px] text-foreground xl:table-cell">VIDEO</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((exercise) => {
                const catConf = categoryConfig[exercise.category];
                const CatIcon = catConf.icon;
                return (
                  <tr
                    key={exercise.id}
                    onClick={() => setSelectedExercise(exercise)}
                    className="cursor-pointer border-b border-foreground/6 bg-card transition-colors hover:bg-surface-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center", catConf.bg)}>
                          <CatIcon className={cn("h-4 w-4", catConf.color)} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-chalk text-sm truncate">{exercise.name}</div>
                          <div className="text-[11px] text-muted-foreground line-clamp-1 sm:hidden">
                            {catConf.label} · {exercise.difficulty}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className={cn("flex items-center gap-1 text-xs", catConf.color)}>
                        <CatIcon className="h-3 w-3" />
                        {catConf.label}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span className={cn("border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase", difficultyBadge[exercise.difficulty])}>
                        {exercise.difficulty}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <span className="text-xs text-muted-foreground">{exercise.muscles.slice(0, 3).join(', ')}</span>
                    </td>
                    <td className="hidden px-4 py-3 text-center xl:table-cell">
                      {exercise.videoUrl ? (
                        <Play className="inline h-4 w-4 text-primary" />
                      ) : (
                        <span className="text-[10px] text-muted-foreground/40">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-8 w-8 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No exercises found</p>
          <button onClick={clearFilters} className="mt-2 text-xs text-primary hover:underline">
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 border border-foreground/10 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground hover:text-card disabled:opacity-30"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "h-8 w-8 text-xs font-medium transition-colors",
                    page === pageNum
                      ? "bg-foreground text-card"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 border border-foreground/10 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground hover:text-card disabled:opacity-30"
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedExercise && (
          <ExerciseDetailModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
