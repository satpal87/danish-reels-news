
import ThemeToggle from '@/components/ThemeToggle';

const SettingsPage = () => {
  const handleClearData = () => {
    // In a real app, you would clear user data here
    localStorage.removeItem('onboardingCompleted');
    alert('All app data cleared. Restart the app to see the onboarding again.');
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 p-4 bg-card border-b border-border z-20">
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      
      {/* Content */}
      <div className="flex-1 p-4">
        <div className="space-y-6">
          {/* Theme section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Appearance</h2>
            <div className="flex items-center justify-between p-3 bg-card border border-border rounded-md">
              <span>Dark Mode</span>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Language section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Language</h2>
            <div className="p-3 bg-card border border-border rounded-md">
              <select className="w-full bg-transparent focus:outline-none">
                <option value="en">English</option>
                <option value="da" disabled>Danish (Coming Soon)</option>
              </select>
            </div>
          </div>
          
          {/* Notifications section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Notifications</h2>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-3 bg-card border border-border rounded-md">
                <span>Breaking News</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-card border border-border rounded-md">
                <span>Daily Summary</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
          </div>
          
          {/* About section */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">About</h2>
            <div className="p-4 bg-card border border-border rounded-md space-y-2">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <div className="flex space-x-2">
                <a href="#" className="text-primary text-sm">Terms of Service</a>
                <a href="#" className="text-primary text-sm">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          {/* Reset data */}
          <div className="pt-4">
            <button 
              onClick={handleClearData}
              className="w-full py-3 border border-destructive text-destructive rounded-md hover:bg-destructive/10"
            >
              Reset App Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
