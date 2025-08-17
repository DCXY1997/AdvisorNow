import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, AlertTriangle, Phone } from "lucide-react";
import Footer from "@/components/Footer";

const ConsumerProtectionAct = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => {}} />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                Consumer Protection Statement
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Last updated: [Date]
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none space-y-8">
                  <div className="mb-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      AdvisorNow is committed to fair trading and transparency. We comply with the Consumer Protection (Fair Trading) Act (CPFTA) of Singapore to ensure a fair and reliable experience for all users.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary mr-3" />
                        <h2 className="text-2xl font-bold text-primary">1. No Fees for Consumers</h2>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• AdvisorNow is completely free for consumers.</li>
                        <li>• There are no hidden charges, subscription costs, or conditions for using the platform.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center mb-4">
                        <Shield className="h-6 w-6 text-primary mr-3" />
                        <h2 className="text-2xl font-bold text-primary">2. Transparent Subscription for Advisors</h2>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Only advisors pay subscription fees to access the platform.</li>
                        <li>• Subscription pricing is clearly displayed before payment.</li>
                        <li>• All fees are non-refundable. Advisors may cancel anytime to stop future renewals.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary mr-3" />
                        <h2 className="text-2xl font-bold text-primary">3. Fair Trading Practices</h2>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• We do not engage in unfair, misleading, or aggressive practices.</li>
                        <li>• We verify that all advisors listed on AdvisorNow are licensed with the Monetary Authority of Singapore (MAS).</li>
                        <li>• We do not guarantee investment returns or financial outcomes.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center mb-4">
                        <Phone className="h-6 w-6 text-primary mr-3" />
                        <h2 className="text-2xl font-bold text-primary">4. Complaints & Dispute Resolution</h2>
                      </div>
                      <div className="space-y-4 text-muted-foreground">
                        <ul className="space-y-2">
                          <li>• If you believe you have been treated unfairly, you may contact us directly at: support@advisornow.sg.</li>
                          <li>• We will acknowledge complaints within 5 business days and work to resolve them fairly.</li>
                          <li>• If disputes cannot be resolved, consumers may seek assistance from the Consumers Association of Singapore (CASE) or other relevant authorities.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-primary mr-3" />
                        <h2 className="text-2xl font-bold text-primary">5. Limitation of Liability</h2>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• AdvisorNow is a matching platform only. We are not a financial adviser and do not provide financial advice.</li>
                        <li>• Any advice given is the responsibility of the licensed advisor. Consumers are encouraged to exercise judgment and seek independent confirmation where necessary.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="mt-12 p-6 bg-primary/10 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">Need Help?</h3>
                    <p className="text-muted-foreground mb-2">
                      If you have any concerns or complaints, please don't hesitate to reach out:
                    </p>
                    <p className="text-primary font-semibold">📧 support@advisornow.sg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsumerProtectionAct;