const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-7 bg-secondary rounded-full mr-3 flex items-center justify-center">
                <div className="w-7 h-5 bg-secondary-light rounded-full"></div>
              </div>
              <span className="text-xl font-bold">AdvisorNow</span>
            </div>
            <p className="text-primary-foreground/80">
              Connecting you with licensed financial advisors for instant, pressure-free advice.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="/insurance" className="hover:text-primary-foreground transition-colors">Insurance Planning</a></li>
              <li><a href="/investment" className="hover:text-primary-foreground transition-colors">Investment Advisory</a></li>
              <li><a href="/retirement" className="hover:text-primary-foreground transition-colors">Retirement Planning</a></li>
              <li><a href="/education" className="hover:text-primary-foreground transition-colors">Education Funding</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="/about" className="hover:text-primary-foreground transition-colors">About AdvisorNow</a></li>
              <li><a href="/help-support" className="hover:text-primary-foreground transition-colors">Help & Support</a></li>
              <li><a href="/terms-of-service" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/consumer-protection-act" className="hover:text-primary-foreground transition-colors">Consumer Protection Act</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 AdvisorNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;