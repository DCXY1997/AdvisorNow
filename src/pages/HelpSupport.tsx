import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";
import Footer from "@/components/Footer";

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => {}} />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Help & Support
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              We're here to help you get the most out of AdvisorNow
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="border-primary/20 text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-primary">Email Support</h3>
                  <p className="text-muted-foreground mb-2">Get help via email</p>
                  <a href="mailto:support@advisornow.sg" className="text-primary font-medium hover:underline">
                    support@advisornow.sg
                  </a>
                </CardContent>
              </Card>

              <Card className="border-primary/20 text-center">
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-primary">Response Time</h3>
                  <p className="text-muted-foreground">We typically respond within</p>
                  <p className="text-primary font-medium">24 hours</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 text-center">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-primary">Office Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday</p>
                  <p className="text-primary font-medium">9:00 AM - 6:00 PM SGT</p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      How does AdvisorNow work?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      AdvisorNow connects you instantly with licensed financial advisors through secure video calls. Simply fill out our matching form, get connected with a suitable advisor, and have a conversation about your financial needs - all for free.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      Is AdvisorNow really free for consumers?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, AdvisorNow is completely free for consumers. There are no hidden fees, subscription costs, or charges for using our platform to connect with financial advisors.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      Are the advisors on AdvisorNow licensed?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, all advisors on our platform are verified and licensed with the Monetary Authority of Singapore (MAS). We regularly check their credentials to ensure they maintain their licensing status.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      What types of financial advice can I get?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Our advisors specialize in various areas including Insurance Planning, Investment Advisory, Retirement Planning, Estate Planning, Education Planning, and Corporate Solutions. You can specify your area of interest when filling out the matching form.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      How long does it take to get connected with an advisor?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Our platform is designed for instant connections. Once you submit your matching form, we work to connect you with a suitable advisor as quickly as possible, often within minutes during business hours.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      Is my personal information safe?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, we take data protection seriously and comply with Singapore's Personal Data Protection Act (PDPA). All video calls are secure, and we only share necessary information with matched advisors. Please refer to our Privacy Policy for detailed information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      Can I choose my own advisor?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Our matching system connects you with advisors based on your specific needs and preferences. While you don't directly choose from a list, our algorithm ensures you're matched with advisors who specialize in your areas of interest.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8" className="border border-primary/20 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold text-primary">
                      What if I'm not satisfied with the advice I receive?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      If you have concerns about the advice received, please contact us at support@advisornow.sg. We take all feedback seriously and will investigate any issues promptly. Remember that AdvisorNow is a platform that connects you with advisors - the advice itself comes from the licensed professionals.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Still need help?</h3>
                  <p className="text-muted-foreground mb-6">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <a 
                    href="mailto:support@advisornow.sg"
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary-light transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Support
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpSupport;