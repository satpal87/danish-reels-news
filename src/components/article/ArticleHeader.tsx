
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArticleHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-16 z-40 p-4 bg-black border-b border-neutral-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-white" />
        </Button>
        <div className="font-medium text-white">Article</div>
        <div className="w-8"></div>
      </div>
    </div>
  );
};

export default ArticleHeader;
