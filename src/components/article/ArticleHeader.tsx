
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArticleHeader = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 p-4 bg-black border-b border-neutral-800 z-50">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </Button>
        <div className="font-medium">Article</div>
        <div className="w-8"></div>
      </div>
    </header>
  );
};

export default ArticleHeader;
