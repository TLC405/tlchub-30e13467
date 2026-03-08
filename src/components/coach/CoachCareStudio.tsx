import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ChatPanel } from './ChatPanel';
import { CanvasPanel } from './canvas/CanvasPanel';
import type { CanvasMode, CanvasAction, ChatMessage } from '@/types/coach';

const CHAT_STORAGE_KEY = 'coach_care_chat_history';

const CoachCareStudio: React.FC = () => {
  const [activeCanvasMode, setActiveCanvasMode] = useState<CanvasMode>('welcome');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | undefined>();
  const [selectedSkillTreeId, setSelectedSkillTreeId] = useState<string | undefined>();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | undefined>();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePanelView, setMobilePanelView] = useState<'chat' | 'canvas'>('chat');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
    } catch {
      // ignore storage errors
    }
  }, [chatHistory]);

  const handleCanvasAction = (action: CanvasAction) => {
    setActiveCanvasMode(action.mode);
    if (action.exerciseId) setSelectedExerciseId(action.exerciseId);
    if (action.skillTreeId) setSelectedSkillTreeId(action.skillTreeId);
    if (action.muscleGroup) setSelectedMuscleGroup(action.muscleGroup);
    if (isMobile) setMobilePanelView('canvas');
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Mobile toggle */}
        <div className="flex border-b-[3px] border-foreground bg-card">
          <button
            onClick={() => setMobilePanelView('chat')}
            className={`flex-1 py-2 text-sm font-bold tracking-wide transition-colors ${
              mobilePanelView === 'chat'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground'
            }`}
          >
            💬 Coach Chat
          </button>
          <button
            onClick={() => setMobilePanelView('canvas')}
            className={`flex-1 py-2 text-sm font-bold tracking-wide transition-colors ${
              mobilePanelView === 'canvas'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground'
            }`}
          >
            🎨 Canvas
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {mobilePanelView === 'chat' ? (
            <ChatPanel
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              onCanvasAction={handleCanvasAction}
              activeCanvasMode={activeCanvasMode}
              selectedExerciseId={selectedExerciseId}
              selectedSkillTreeId={selectedSkillTreeId}
            />
          ) : (
            <CanvasPanel
              activeCanvasMode={activeCanvasMode}
              setActiveCanvasMode={setActiveCanvasMode}
              selectedExerciseId={selectedExerciseId}
              setSelectedExerciseId={setSelectedExerciseId}
              selectedSkillTreeId={selectedSkillTreeId}
              setSelectedSkillTreeId={setSelectedSkillTreeId}
              selectedMuscleGroup={selectedMuscleGroup}
              setSelectedMuscleGroup={setSelectedMuscleGroup}
              onAskCoach={(msg) => {
                setMobilePanelView('chat');
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full rounded-[24px] border-[3px] border-foreground overflow-hidden">
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatPanel
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            onCanvasAction={handleCanvasAction}
            activeCanvasMode={activeCanvasMode}
            selectedExerciseId={selectedExerciseId}
            selectedSkillTreeId={selectedSkillTreeId}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={60} minSize={30}>
          <CanvasPanel
            activeCanvasMode={activeCanvasMode}
            setActiveCanvasMode={setActiveCanvasMode}
            selectedExerciseId={selectedExerciseId}
            setSelectedExerciseId={setSelectedExerciseId}
            selectedSkillTreeId={selectedSkillTreeId}
            setSelectedSkillTreeId={setSelectedSkillTreeId}
            selectedMuscleGroup={selectedMuscleGroup}
            setSelectedMuscleGroup={setSelectedMuscleGroup}
            onAskCoach={() => {}}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CoachCareStudio;
