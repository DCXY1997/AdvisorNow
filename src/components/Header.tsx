import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import AgentLoginModal from "@/components/AgentLoginModal";

interface HeaderProps {
  onFindAdvisorClick: () => void;
}

const Header = ({ onFindAdvisorClick }: HeaderProps) => {
  const [isAgentLoginOpen, setIsAgentLoginOpen] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    { name: "Insurance", path: "/insurance" },
    { name: "Investment", path: "/investment" }, 
    { name: "Retirement", path: "/retirement" },
    { name: "Education", path: "/education" },
  ];

  return (
    <header className="bg-background border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-8 bg-secondary rounded-full mr-3 flex items-center justify-center">
              <div className="w-8 h-6 bg-secondary-light rounded-full"></div>
            </div>
            <span className="font-bold text-xl text-primary">AdvisorNow</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-smooth ${
                  location.pathname === item.path 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Agent Login Button */}
          <Button
            onClick={() => setIsAgentLoginOpen(true)}
            variant="default"
            className="bg-primary hover:bg-primary-light text-primary-foreground rounded-full px-6"
          >
            Agent Login
          </Button>
        </div>
      </div>
      
      {/* Agent Login Modal */}
      <AgentLoginModal
        isOpen={isAgentLoginOpen}
        onClose={() => setIsAgentLoginOpen(false)}
      />
    </header>
  );
};

export default Header;