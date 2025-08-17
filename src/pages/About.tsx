import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { CheckCircle, Shield, Users, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => {}} />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About AdvisorNow
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At AdvisorNow, we believe financial advice should be simple, accessible, and on your terms.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Instead of cold calls or roadshows, AdvisorNow connects you instantly to licensed financial advisors in Singapore through secure, browser-based video calls. No downloads, no fees for consumers — just clear conversations when you want them.
              </p>
            </div>

            {/* For Consumers & Advisors */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Users className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-2xl font-bold text-primary">For Consumers</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Get matched instantly with a licensed financial advisor.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Ask questions, clarify concerns, and explore options — all in one secure call.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">100% free to use, with no hidden conditions.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Heart className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-2xl font-bold text-primary">For Advisors</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Receive new clients directly through the platform without relying on prospecting.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Build trust faster through real conversations.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Focus more on advising, less on chasing leads.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Our Commitment */}
            <div className="bg-card rounded-lg p-8 border border-primary/20">
              <div className="flex items-center mb-8">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-primary">Our Commitment</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Licensed Advisors Only</h3>
                  <p className="text-muted-foreground text-sm">Every advisor on AdvisorNow is verified against the MAS register.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Privacy First</h3>
                  <p className="text-muted-foreground text-sm">We comply with Singapore's Personal Data Protection Act (PDPA) to keep your information safe.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">Fair & Transparent</h3>
                  <p className="text-muted-foreground text-sm">No fees for consumers, and no misleading promises. Just a fair platform that works for both consumers and advisors.</p>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="text-center mt-16">
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                AdvisorNow is here to reshape how financial advice works in Singapore — making it more accessible, transparent, and human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Experience AdvisorNow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with a licensed financial advisor today and get the guidance you need.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-light text-primary-foreground shadow-button text-lg px-8 py-4 rounded-full transition-smooth font-semibold"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;