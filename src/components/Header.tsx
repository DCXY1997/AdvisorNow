import { Button } from "@/components/ui/button";

interface HeaderProps {
  onFindAdvisorClick: () => void;
}

const Header = ({ onFindAdvisorClick }: HeaderProps) => {
  const navigationItems = [
    "Insurance",
    "Investment", 
    "Retirement",
    "Education",
    "More"
  ];

  return (
    <header className="bg-background border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-8 bg-secondary rounded-full mr-3 flex items-center justify-center">
              <div className="w-8 h-6 bg-secondary-light rounded-full"></div>
            </div>
            <span className="font-bold text-xl text-primary">Logo</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Agent Login Button */}
          <Button
            variant="default"
            className="bg-primary hover:bg-primary-light text-primary-foreground rounded-full px-6"
          >
            Agent Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;