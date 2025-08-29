
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Calendar,
  Trophy,
  Dumbbell,
  Target,
  TrendingUp,
  Zap,
  Settings,
  ChevronRight,
  Home,
  User,
  Activity
} from "lucide-react";
import type { ViewType } from "@/types";

interface AppSidebarProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const AppSidebar = ({ onNavigate, currentView }: AppSidebarProps) => {
  const { collapsed } = useSidebar();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    training: true,
    tools: true,
    progress: true
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const mainItems = [
    { id: 'dashboard' as ViewType, title: 'Dashboard', icon: LayoutDashboard, emoji: '🏠' },
  ];

  const trainingItems = [
    { id: 'enhanced-library' as ViewType, title: 'Exercise Library', icon: BookOpen, emoji: '📚' },
    { id: 'training' as ViewType, title: 'Active Training', icon: Dumbbell, emoji: '💪' },
    { id: 'foundation' as ViewType, title: 'Foundation', icon: Target, emoji: '🎯' },
    { id: 'skills' as ViewType, title: 'Skills Mastery', icon: Zap, emoji: '⚡' },
  ];

  const toolItems = [
    { id: 'agent' as ViewType, title: 'Agent TLC', icon: Brain, emoji: '🤖' },
    { id: 'plan' as ViewType, title: 'Weekly Plan', icon: Calendar, emoji: '📅' },
    { id: 'ai' as ViewType, title: 'AI Assistant', icon: Brain, emoji: '🧠' },
  ];

  const progressItems = [
    { id: 'progress' as ViewType, title: 'Progress', icon: TrendingUp, emoji: '📈' },
    { id: 'updates' as ViewType, title: 'Updates', icon: Trophy, emoji: '🏆' },
  ];

  const renderMenuItem = (item: any) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton
        asChild
        className={`${
          currentView === item.id 
            ? 'bg-primary text-primary-foreground font-semibold shadow-sm' 
            : 'hover:bg-accent/50 text-foreground'
        } transition-all duration-200`}
      >
        <button
          onClick={() => onNavigate(item.id)}
          className="flex items-center w-full"
        >
          <div className="flex items-center gap-3">
            {collapsed ? (
              <span className="text-lg">{item.emoji}</span>
            ) : (
              <>
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.title}</span>
              </>
            )}
          </div>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  const renderCollapsibleGroup = (
    groupId: string,
    title: string,
    items: any[],
    icon: React.ComponentType<any>
  ) => {
    const Icon = icon;
    return (
      <Collapsible
        open={openGroups[groupId] && !collapsed}
        onOpenChange={() => toggleGroup(groupId)}
      >
        <SidebarGroup>
          <CollapsibleTrigger asChild>
            <SidebarGroupLabel className="hover:bg-accent/30 rounded-md px-2 py-1 cursor-pointer transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span className="font-semibold">{title}</span>}
                </div>
                {!collapsed && (
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openGroups[groupId] ? 'rotate-90' : ''
                    }`} 
                  />
                )}
              </div>
            </SidebarGroupLabel>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(renderMenuItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    );
  };

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-border/60`}>
      <div className="p-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          {collapsed ? (
            <div className="text-2xl font-bold text-primary">C</div>
          ) : (
            <div className="text-xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              CALIXTLC
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2 py-4">
        {/* Main Items */}
        <SidebarGroup>
          <SidebarMenu>
            {mainItems.map(renderMenuItem)}
          </SidebarMenu>
        </SidebarGroup>

        {/* Training Group */}
        {renderCollapsibleGroup('training', 'Training', trainingItems, Dumbbell)}

        {/* Tools Group */}
        {renderCollapsibleGroup('tools', 'Tools', toolItems, Settings)}

        {/* Progress Group */}
        {renderCollapsibleGroup('progress', 'Progress', progressItems, Activity)}
      </SidebarContent>

      <div className="mt-auto p-4 border-t border-border/60">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
