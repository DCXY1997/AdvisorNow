import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => {}} />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Terms of Service
            </h1>
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
                      Welcome to AdvisorNow ("we", "our", "us"). By accessing or using our platform (the "Service"), you agree to these Terms of Use. Please read them carefully.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">1. Nature of Service</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• AdvisorNow is a technology platform that connects consumers with licensed financial advisors through instant video calls.</li>
                        <li>• AdvisorNow does not provide financial advice. All advice is given solely by the advisors you connect with.</li>
                        <li>• We verify that advisors are licensed under the Monetary Authority of Singapore (MAS), but we do not guarantee the quality of their advice.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">2. Eligibility</h2>
                      <div className="space-y-4 text-muted-foreground">
                        <p>• Consumers must be at least 18 years old to use the platform.</p>
                        <div>
                          <p>• Advisors must provide accurate information, including:</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li>- Full name</li>
                            <li>- MAS Representative Code</li>
                            <li>- Financial institution represented</li>
                          </ul>
                        </div>
                        <p>• False or misleading information may result in removal from the platform.</p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">3. User Obligations</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Consumers agree to use the platform responsibly and not rely solely on advice given without conducting their own due diligence.</li>
                        <li>• Advisors agree to comply with all MAS regulations and are fully responsible for the financial advice they provide.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">4. Subscriptions & Payments (Advisors)</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Subscription fees are clearly displayed before payment.</li>
                        <li>• Payments are processed securely via third-party providers (e.g., Stripe, PayNow).</li>
                        <li>• All subscription fees are strictly non-refundable.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">5. Cancellations & Extensions</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Advisors may cancel their subscription at any time. Cancellation stops future renewals and charges.</li>
                        <li>• If a technical fault or service failure is caused by AdvisorNow, the remedy provided will be a reasonable extension of the subscription period.</li>
                        <li>• No cash refunds or service credits will be issued under any circumstances.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">6. Fair Trading</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• We comply with the Consumer Protection (Fair Trading) Act (CPFTA).</li>
                        <li>• We do not engage in misleading, deceptive, or unfair practices.</li>
                        <li>• Any complaints should be directed to: [Support Email]. We will investigate promptly.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">7. Data Protection & Privacy</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal data under the Personal Data Protection Act (PDPA).</li>
                        <li>• By using AdvisorNow, you consent to our collection and use of your personal data as described in the Privacy Policy.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• AdvisorNow is not responsible for any loss, damage, or liability resulting from financial advice provided by advisors.</li>
                        <li>• We provide the platform "as is" and do not guarantee uninterrupted or error-free service.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">9. Intellectual Property</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• All content, trademarks, and software on the platform belong to AdvisorNow.</li>
                        <li>• You may not copy, modify, or distribute our materials without permission.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">10. Termination</h2>
                      <p className="text-muted-foreground">
                        • We may suspend or terminate access to the Service if you violate these Terms or applicable laws.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">11. Governing Law</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• These Terms are governed by the laws of Singapore.</li>
                        <li>• Any disputes will be resolved in the courts of Singapore.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">12. Contact</h2>
                      <div className="text-muted-foreground">
                        <p className="mb-2">For support or legal inquiries, contact us at:</p>
                        <p>📧 Email: support@advisornow.sg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;