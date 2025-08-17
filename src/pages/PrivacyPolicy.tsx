import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onFindAdvisorClick={() => {}} />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Privacy Policy
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
                      AdvisorNow ("we", "our", "us") respects your privacy and is committed to protecting your personal data in accordance with Singapore's Personal Data Protection Act 2012 (PDPA).
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                      This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use our platform.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">1. Personal Data We Collect</h2>
                      <div className="space-y-4 text-muted-foreground">
                        <p>We may collect the following information:</p>
                        <ul className="space-y-2">
                          <li>• <strong>For Consumers:</strong> name, email, contact details, financial preferences or questions you choose to share.</li>
                          <li>• <strong>For Advisors:</strong> name, email, contact details, MAS Representative Code, financial institution represented, and other professional details.</li>
                          <li>• <strong>Platform Data:</strong> device information, IP address, cookies, and usage logs.</li>
                          <li>• <strong>Video Calls:</strong> audio and video data are transmitted securely. Calls are not recorded unless you provide explicit consent.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">2. Purpose of Collection</h2>
                      <div className="space-y-4 text-muted-foreground">
                        <p>We collect, use, and disclose your personal data to:</p>
                        <ul className="space-y-2">
                          <li>• Match consumers with licensed financial advisors.</li>
                          <li>• Verify advisor credentials against MAS's public register.</li>
                          <li>• Facilitate video calls between consumers and advisors.</li>
                          <li>• Process advisor subscriptions and payments.</li>
                          <li>• Improve our services and troubleshoot issues.</li>
                          <li>• Comply with legal and regulatory obligations.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">3. Consent</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• By using AdvisorNow, you consent to us collecting, using, and disclosing your personal data for the purposes stated in this Policy.</li>
                        <li>• You may withdraw consent at any time by contacting our Data Protection Officer (DPO), but this may affect your ability to use the platform.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">4. Data Protection & Security</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• We implement reasonable security measures to safeguard your data, including encryption, access controls, and secure cloud hosting.</li>
                        <li>• However, no system is completely secure. While we do our best, we cannot guarantee absolute security.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">5. Disclosure of Personal Data</h2>
                      <div className="space-y-4 text-muted-foreground">
                        <p>We do not sell your personal data. We may share it only with:</p>
                        <ul className="space-y-2">
                          <li>• Licensed financial advisors when you request a call.</li>
                          <li>• Service providers (e.g. cloud hosting, payment processors) under strict confidentiality agreements.</li>
                          <li>• Regulators or authorities if required by law.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">6. Cross-Border Transfers</h2>
                      <p className="text-muted-foreground">
                        Some of our service providers may store or process data outside Singapore. In such cases, we ensure your personal data continues to receive protection at standards comparable to the PDPA.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">7. Retention of Data</h2>
                      <p className="text-muted-foreground">
                        We retain personal data only for as long as it is reasonably necessary to fulfil the purposes stated, or as required by law. When no longer needed, data will be securely deleted.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">8. Access & Correction</h2>
                      <p className="text-muted-foreground">
                        You may request access to or correction of your personal data at any time by contacting our DPO. We may require verification before processing such requests.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Us</h2>
                      <div className="text-muted-foreground">
                        <p className="mb-4">If you have any questions about this Privacy Policy, or wish to make a data-related request, please contact our Data Protection Officer:</p>
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="font-semibold text-primary mb-2">Data Protection Officer (DPO)</p>
                          <p>Name: [Insert Name]</p>
                          <p>Email: [Insert Email]</p>
                          <p>Phone: [Insert Phone]</p>
                        </div>
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

export default PrivacyPolicy;