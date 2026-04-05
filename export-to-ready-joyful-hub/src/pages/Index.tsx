import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell, ArrowDownToLine, ArrowUpFromLine, Footprints,
  Target, Move, Star, Flower2, Music, Play
} from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { AppShell } from '@/components/layout/AppShell';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExerciseLibrary } from '@/components/sections/ExerciseLibrary';
import { TrackLadder } from '@/components/sections/TrackLadder';
import { ProgressionMap } from '@/components/sections/ProgressionMap';
import { ProgressDashboard } from '@/components/sections/ProgressDashboard';
import { SettingsPanel } from '@/components/sections/SettingsPanel';
import { CoachCareStudio } from '@/components/CoachCare/CoachCareStudio';
import { ExerciseDetailModal } from '@/components/shared/ExerciseDetailModal';
import { exercises } from '@/lib/exercises';
import type { Exercise, Category } from '@/lib/types';
import { cn } from '@/lib/utils';

type Section = 'home' | 'library' | 'tracks' | 'coach' | 'progress' | 'settings';
type TrackView = 'ladder' | 'map';

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

const featured = exercises.filter(e => e.image || e.thumbnailUrl || e.videoUrl).slice(0, 8);

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.3, ease: 'easeOut' as const }
};

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [trackView, setTrackView] = useState<TrackView>('ladder');

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppShell>
      <div className="min-h-screen text-foreground">
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
        
        <main className="lg:pl-20">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.div key="home" {...pageTransition}>
                <HeroSection />

                {/* Featured Skills — editorial grid */}
                <section className="px-4 pb-8 lg:px-8">
                  <div className="editorial-divider-thick mb-4 pt-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-editorial-sm text-foreground">FEATURED SKILLS</h3>
                      <button onClick={() => handleNavigate('library')} className="text-label text-xs text-primary hover:underline">
                        VIEW ALL →
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {featured.map((ex) => {
                      const thumb = ex.image || ex.thumbnailUrl || (ex.videoUrl?.match(/v=([^&]+)/)?.[1] ? `https://i.ytimg.com/vi/${ex.videoUrl.match(/v=([^&]+)/)?.[1]}/hqdefault.jpg` : null);
                      const catConf = categoryConfig[ex.category];
                      const CatIcon = catConf.icon;
                      return (
                        <div
                          key={ex.id}
                          onClick={() => setSelectedExercise(ex)}
                          className="group cursor-pointer border border-foreground/8 bg-card transition-all hover:border-foreground/20 hover:-translate-y-0.5"
                        >
                          <div className="relative aspect-video overflow-hidden bg-surface-0">
                            {thumb ? (
                              <img src={thumb} alt={ex.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <CatIcon className={cn("h-8 w-8 opacity-20", catConf.color)} />
                              </div>
                            )}
                            {ex.videoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 opacity-0 transition-all group-hover:opacity-100 scale-75 group-hover:scale-100">
                                  <Play className="h-3.5 w-3.5 text-foreground ml-0.5" />
                                </div>
                              </div>
                            )}
                            <div className="absolute left-1.5 top-1.5">
                              <span className={cn("border px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-card/90 backdrop-blur-sm", difficultyBadge[ex.difficulty])}>
                                {ex.difficulty}
                              </span>
                            </div>
                            <div className="absolute right-1.5 top-1.5">
                              <div className={cn("flex h-5 w-5 items-center justify-center bg-card/90 backdrop-blur-sm", catConf.color)}>
                                <CatIcon className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5">
                            <h4 className="font-chalk text-xs sm:text-sm truncate">{ex.name}</h4>
                            <span className={cn("text-[10px] font-medium", catConf.color)}>{catConf.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </motion.div>
            )}

            {activeSection === 'library' && (
              <motion.div key="library" {...pageTransition}>
                <ExerciseLibrary />
              </motion.div>
            )}

            {activeSection === 'tracks' && (
              <motion.div key="tracks" {...pageTransition}>
                <div className="flex gap-px border-b border-foreground/10 px-4 lg:px-8 pt-4">
                  {(['ladder', 'map'] as const).map(v => (
                    <button key={v} onClick={() => setTrackView(v)}
                      className={cn("px-4 py-2 font-chalk text-xs transition-colors", trackView === v ? "bg-foreground text-card" : "text-muted-foreground hover:text-foreground")}>
                      {v.toUpperCase()}
                    </button>
                  ))}
                </div>
                {trackView === 'ladder' ? <TrackLadder /> : <ProgressionMap />}
              </motion.div>
            )}

            {activeSection === 'coach' && (
              <motion.div key="coach" {...pageTransition}>
                <CoachCareStudio />
              </motion.div>
            )}

            {activeSection === 'progress' && (
              <motion.div key="progress" {...pageTransition}>
                <ProgressDashboard />
              </motion.div>
            )}

            {activeSection === 'settings' && (
              <motion.div key="settings" {...pageTransition}>
                <SettingsPanel />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedExercise && (
              <ExerciseDetailModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
            )}
          </AnimatePresence>

          <div className="h-24 lg:hidden" />
        </main>
      </div>
    </AppShell>
  );
};

export default Index;
