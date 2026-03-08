import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

const ShareButton = ({ title, text, url, className }: ShareButtonProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = { title, text: text || title, url: url || window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      toast({ title: "Link copied", description: "Copied to clipboard" });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className={`h-8 w-8 p-0 rounded-full border-2 ${className || ""}`}>
      <Share2 className="h-3 w-3" />
    </Button>
  );
};

export default ShareButton;
