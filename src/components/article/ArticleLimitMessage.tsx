
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ArticleLimitMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pb-20">
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

      <div className="px-4 py-10 flex flex-col items-center justify-center text-center">
        <div className="bg-neutral-800 p-8 rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Daily Reading Limit Reached</h2>
          <p className="mb-6 text-gray-400">
            You've reached your daily limit of free articles. Sign in to get unlimited access to all our articles.
          </p>
          <Button
            onClick={() => navigate('/auth')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Sign In For Unlimited Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleLimitMessage;
