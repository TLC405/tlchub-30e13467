import { useState } from "react";
import { Download, FileText, Code, Image, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ProjectFile {
  name: string;
  type: "component" | "page" | "style" | "config" | "asset";
  size: string;
  lastModified: string;
  description: string;
}

const projectFiles: ProjectFile[] = [
  {
    name: "SkillMastery.tsx",
    type: "component",
    size: "8.2 KB",
    lastModified: "2024-12-25",
    description: "Advanced skill progression component"
  },
  {
    name: "DisciplineLibrary.tsx", 
    type: "component",
    size: "12.1 KB",
    lastModified: "2024-12-25",
    description: "Exercise library with progressions"
  },
  {
    name: "WeeklyPlan.tsx",
    type: "component", 
    size: "6.8 KB",
    lastModified: "2024-12-25",
    description: "Weekly training plan component"
  },
  {
    name: "index.css",
    type: "style",
    size: "4.2 KB", 
    lastModified: "2024-12-25",
    description: "Main styling and design system"
  },
  {
    name: "tailwind.config.ts",
    type: "config",
    size: "2.1 KB",
    lastModified: "2024-12-25", 
    description: "Tailwind configuration"
  },
  {
    name: "App.tsx",
    type: "page",
    size: "1.8 KB",
    lastModified: "2024-12-25",
    description: "Main app component"
  }
];

const FileManager = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { toast } = useToast();

  const getFileIcon = (type: string) => {
    switch (type) {
      case "component":
      case "page":
        return <Code className="h-4 w-4" />;
      case "style":
      case "config":
        return <FileText className="h-4 w-4" />;
      case "asset":
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "component": return "bg-blue-600";
      case "page": return "bg-green-600";
      case "style": return "bg-purple-600";
      case "config": return "bg-orange-600";
      case "asset": return "bg-pink-600";
      default: return "bg-gray-600";
    }
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const handleDownloadSelected = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to download",
        variant: "destructive"
      });
      return;
    }

    // Create a simulated download
    const blob = new Blob([`Selected files: ${selectedFiles.join(", ")}\n\nThis is a demo download. In a real implementation, these would be the actual file contents.`], 
      { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tlc-files-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `Downloading ${selectedFiles.length} files`,
    });
  };

  const handleDownloadAll = () => {
    // Create a comprehensive project export
    const projectData = {
      name: "Tender Loving Care",
      version: "2.0.0",
      description: "Complete calisthenics training app",
      files: projectFiles,
      exportDate: new Date().toISOString(),
      components: [
        "SkillMastery", "DisciplineLibrary", "WeeklyPlan", 
        "MobileDashboard", "ExerciseLibrary", "TimerView"
      ],
      features: [
        "Skill progression tracking",
        "Exercise library with muscle/tendon details", 
        "Weekly planning system",
        "AI-powered exercise generation",
        "Recovery time calculations"
      ]
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], 
      { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tlc-project-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Complete Project Downloaded",
      description: "All project files and data exported successfully",
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">File Manager</h1>
        <p className="text-muted-foreground">Download and manage project files</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={handleDownloadAll} className="bg-green-600 hover:bg-green-700">
          <Package className="h-4 w-4 mr-2" />
          Download Complete Project
        </Button>
        <Button 
          onClick={handleDownloadSelected}
          disabled={selectedFiles.length === 0}
          variant="secondary"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Selected ({selectedFiles.length})
        </Button>
      </div>

      <div className="space-y-2">
        {projectFiles.map((file) => (
          <Card 
            key={file.name}
            className={`cursor-pointer border transition-all ${
              selectedFiles.includes(file.name) 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-accent'
            }`}
            onClick={() => handleFileSelect(file.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <Badge className={`${getTypeColor(file.type)} text-white`}>
                    {file.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{file.size}</div>
                  <div className="text-xs text-muted-foreground">{file.lastModified}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{file.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="text-amber-700 dark:text-amber-400">APK Builder Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            APK building requires native development tools and cannot be done directly in a web browser. 
            For mobile app deployment, please:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>Export project to GitHub</li>
            <li>Use Capacitor for mobile deployment</li>
            <li>Build with Android Studio or Xcode</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManager;