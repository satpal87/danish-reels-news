
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ArticleLimitMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Daily Limit Reached</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You've reached your daily limit of 5 free articles. Sign up or subscribe to continue reading unlimited articles.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={() => navigate("/auth")}>Sign Up Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleLimitMessage;
