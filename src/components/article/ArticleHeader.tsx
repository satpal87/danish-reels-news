
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArticleHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 bg-transparent flex items-center">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate(-1)}
        className="mr-auto"
      >
        <ArrowLeft />
      </Button>
    </div>
  );
};

export default ArticleHeader;
