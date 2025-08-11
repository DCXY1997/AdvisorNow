import { MousePointer, Users, Phone } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MousePointer className="w-12 h-12 text-primary" />,
      title: "Click \"FIND AN ADVISOR NOW\"",
      description: "Start your journey with a simple click"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Get matched to an available advisor instantly",
      description: "Our system connects you with qualified professionals"
    },
    {
      icon: <Phone className="w-12 h-12 text-primary" />,
      title: "Jump into call",
      description: "Begin your consultation immediately"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-left">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-card">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;