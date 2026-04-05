import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Play, ChevronRight, ChevronLeft, ExternalLink,
  Dumbbell, ArrowDownToLine, ArrowUpFromLine, Footprints,
  Target, Move, Star, Flower2, Music, Clock, RotateCcw, AlertTriangle, Eye
} from 'lucide-react';
import type { Exercise, Category } from '@/lib/types';
import { getExerciseById } from '@/lib/exercises';
import { cn } from '@/lib/utils';

const difficultyBadge: Record<string, string> = {
  easy: 'difficulty-easy',
  beginner: 'difficulty-beginner',
  intermediate: 'difficulty-intermediate',
  advanced: 'difficulty-advanced',
  master: 'difficulty-master',
};

const categoryConfig: Record<Category, { label: string; icon: typeof Dumbbell; color: string }> = {
  push:     { label: 'Push',      icon: ArrowUpFromLine, color: 'text-red-500' },
  pull:     { label: 'Pull',      icon: ArrowDownToLine, color: 'text-blue-500' },
  legs:     { label: 'Legs',      icon: Footprints,      color: 'text-amber-500' },
  core:     { label: 'Core',      icon: Target,          color: 'text-orange-500' },
  mobility: { label: 'Mobility',  icon: Move,            color: 'text-teal-500' },
  skills:   { label: 'Skills',    icon: Star,            color: 'text-purple-500' },
  yoga:     { label: 'Yoga',      icon: Flower2,         color: 'text-emerald-500' },
  ballet:   { label: 'Ballet',    icon: Music,           color: 'text-pink-500' },
};

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1` : null;
}

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export function ExerciseDetailModal({ exercise: initialExercise, onClose }: ExerciseDetailModalProps) {
  const [exercise, setExercise] = useState(initialExercise);
  const [showVideo, setShowVideo] = useState(false);

  const regressExercises = exercise.regressTo.map(id => getExerciseById(id)).filter(Boolean) as Exercise[];
  const progressExercises = exercise.progressTo.map(id => getExerciseById(id)).filter(Boolean) as Exercise[];
  const catConf = categoryConfig[exercise.category];
  const CatIcon = catConf.icon;
  const embedUrl = exercise.videoUrl ? getYouTubeEmbedUrl(exercise.videoUrl) : null;

  const navigateTo = (ex: Exercise) => {
    setExercise(ex);
    setShowVideo(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-foreground/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        key={exercise.id}
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' as const }}
        onClick={e => e.stopPropagation()}
        className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto bg-card border-t-2 border-t-primary sm:border-2 sm:border-foreground/15"
      >
        {/* Drag indicator on mobile */}
        <div className="mx-auto mt-2 mb-0 h-1 w-10 bg-muted-foreground/30 sm:hidden" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center bg-card/90 backdrop-blur-sm text-muted-foreground hover:bg-foreground hover:text-card transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ─── Hero: Video / Image ─── */}
        <div className="relative">
          {showVideo && embedUrl ? (
            <div className="aspect-video w-full bg-foreground">
              <iframe
                src={embedUrl}
                title={exercise.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : exercise.image ? (
            <div className="relative aspect-video overflow-hidden bg-surface-0">
              <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover" />
              {embedUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-colors hover:bg-foreground/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card/95 shadow-lg">
                    <Play className="h-6 w-6 text-primary ml-0.5" />
                  </div>
                </button>
              )}
            </div>
          ) : exercise.thumbnailUrl ? (
            <div className="relative aspect-video overflow-hidden bg-surface-0">
              <img src={exercise.thumbnailUrl} alt={exercise.name} className="h-full w-full object-cover" />
              {embedUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-colors hover:bg-foreground/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card/95 shadow-lg">
                    <Play className="h-6 w-6 text-primary ml-0.5" />
                  </div>
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* ─── Content ─── */}
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn("border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase", difficultyBadge[exercise.difficulty])}>
                  {exercise.difficulty}
                </span>
                <span className={cn("flex items-center gap-1 text-xs font-medium", catConf.color)}>
                  <CatIcon className="h-3.5 w-3.5" />
                  {catConf.label}
                </span>
              </div>
              <h2 className="font-chalk text-2xl sm:text-3xl leading-tight">{exercise.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exercise.description}</p>
            </div>
          </div>

          {/* Muscles & Equipment tags */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {exercise.muscles.map(m => (
              <span key={m} className="border border-foreground/10 bg-surface-0 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{m}</span>
            ))}
            {exercise.equipment.map(eq => (
              <span key={eq} className="border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">{eq}</span>
            ))}
          </div>

          {/* ─── DO THIS card ─── */}
          <div className="mb-4 border-2 border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <h4 className="text-label text-xs text-primary">DO THIS</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Sets</div>
                <div className="font-chalk text-lg">{exercise.doThis.setsRange}</div>
              </div>
              {exercise.doThis.repsRange && (
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Reps</div>
                  <div className="font-chalk text-lg">{exercise.doThis.repsRange}</div>
                </div>
              )}
              {exercise.doThis.timeSecRange && (
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Hold</div>
                  <div className="font-chalk text-lg">{exercise.doThis.timeSecRange}</div>
                </div>
              )}
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Rest</div>
                <div className="font-chalk text-lg">{exercise.doThis.restSecRange}</div>
              </div>
            </div>
          </div>

          {/* ─── Cues & Fail Signs ─── */}
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            {exercise.cueStack.length > 0 && (
              <div className="border border-foreground/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-label text-[10px] text-emerald-500">COACHING CUES</h4>
                </div>
                <ul className="space-y-2">
                  {exercise.cueStack.map((cue, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center bg-emerald-500/10 text-[9px] font-bold text-emerald-500">{i + 1}</span>
                      {cue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {exercise.failSigns.length > 0 && (
              <div className="border border-foreground/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <h4 className="text-label text-[10px] text-red-500">FAIL SIGNS</h4>
                </div>
                <ul className="space-y-2">
                  {exercise.failSigns.map((fs, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center bg-red-500/10 text-[9px] font-bold text-red-500">!</span>
                      {fs}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ─── Coach Notes ─── */}
          {exercise.coachNotes && (
            <div className="mb-4 grid gap-px bg-foreground/10 grid-cols-1 sm:grid-cols-2 border border-foreground/10">
              {[
                { key: 'mechanic', label: 'MECHANIC', value: exercise.coachNotes.mechanic },
                { key: 'brutality', label: 'BRUTALITY', value: exercise.coachNotes.brutality },
                { key: 'watchOut', label: 'WATCH OUT', value: exercise.coachNotes.watchOut },
                { key: 'recoveryVector', label: 'RECOVERY', value: exercise.coachNotes.recoveryVector },
              ].map(note => (
                <div key={note.key} className="bg-card p-4">
                  <h4 className="mb-1 text-label text-[10px] text-primary">{note.label}</h4>
                  <p className="text-sm text-foreground">{note.value}</p>
                </div>
              ))}
            </div>
          )}

          {exercise.creator && (
            <div className="mb-4 flex items-center gap-2 border border-foreground/10 p-3">
              <div className="flex-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Credit</span>
                <p className="text-sm font-medium">{exercise.creator}</p>
              </div>
              {exercise.instagramUrl && (
                <a href={exercise.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  Instagram <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

          {/* ─── Progression Chain ─── */}
          {(regressExercises.length > 0 || progressExercises.length > 0) && (
            <div className="border-t-2 border-foreground pt-4">
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="h-4 w-4 text-foreground" />
                <h4 className="text-label text-xs text-foreground">PROGRESSION CHAIN</h4>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {regressExercises.length > 0 && (
                  <div className="flex-1">
                    <div className="mb-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                      <ChevronLeft className="inline h-3 w-3" /> Easier
                    </div>
                    <div className="space-y-1.5">
                      {regressExercises.map(ex => {
                        const exCat = categoryConfig[ex.category];
                        const ExCatIcon = exCat.icon;
                        return (
                          <button
                            key={ex.id}
                            onClick={() => navigateTo(ex)}
                            className="flex w-full items-center gap-3 border border-foreground/10 bg-card px-3 py-2.5 text-left transition-colors hover:bg-surface-0 hover:border-foreground/20"
                          >
                            <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center", exCat.color)}>
                              <ExCatIcon className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-chalk text-xs truncate">{ex.name}</div>
                              <span className={cn("text-[9px] font-bold tracking-wider uppercase", difficultyBadge[ex.difficulty])}>{ex.difficulty}</span>
                            </div>
                            <ChevronLeft className="h-3 w-3 text-muted-foreground shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {progressExercises.length > 0 && (
                  <div className="flex-1">
                    <div className="mb-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase text-right sm:text-left">
                      Harder <ChevronRight className="inline h-3 w-3" />
                    </div>
                    <div className="space-y-1.5">
                      {progressExercises.map(ex => {
                        const exCat = categoryConfig[ex.category];
                        const ExCatIcon = exCat.icon;
                        return (
                          <button
                            key={ex.id}
                            onClick={() => navigateTo(ex)}
                            className="flex w-full items-center gap-3 border border-foreground/10 bg-card px-3 py-2.5 text-left transition-colors hover:bg-surface-0 hover:border-foreground/20"
                          >
                            <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center", exCat.color)}>
                              <ExCatIcon className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-chalk text-xs truncate">{ex.name}</div>
                              <span className={cn("text-[9px] font-bold tracking-wider uppercase", difficultyBadge[ex.difficulty])}>{ex.difficulty}</span>
                            </div>
                            <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── Tracks ─── */}
          {exercise.tracks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exercise.tracks.map(t => (
                <span key={t} className="border border-foreground/10 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{t}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
