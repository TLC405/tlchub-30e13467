
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Home,
  Dumbbell,
  BookOpen,
  Timer,
  TrendingUp,
  Zap,
  Target,
  Settings
} from "lucide-react";

interface AppSidebarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "training", title: "Training", icon: Dumbbell },
  { id: "exercises", title: "Exercise Library", icon: BookOpen },
  { id: "timer", title: "Timer", icon: Timer },
  { id: "progress", title: "Progress", icon: TrendingUp },
];

const quickActions = [
  { id: "handstand", title: "Handstand Focus", icon: Target },
  { id: "strength", title: "Strength Training", icon: Zap },
  { id: "flexibility", title: "Flexibility", icon: Settings },
];

export function AppSidebar({ onNavigate, activeView }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} border-r border-border bg-card/50 backdrop-blur-sm`}>
      <SidebarContent className="p-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? "hidden" : "block"} text-xs font-semibold text-muted-foreground uppercase tracking-wider`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    className={`w-full justify-start transition-colors ${
                      activeView === item.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <item.icon className={`${isCollapsed ? "mr-0" : "mr-3"} h-5 w-5 flex-shrink-0`} />
                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {quickActions.map((action) => (
                  <SidebarMenuItem key={action.id}>
                    <SidebarMenuButton
                      onClick={() => onNavigate("training")}
                      className="w-full justify-start text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <action.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{action.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
