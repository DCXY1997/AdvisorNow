import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Investment from "./pages/Investment";
import Insurance from "./pages/Insurance";
import Retirement from "./pages/Retirement";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import AgentSignup from "./pages/AgentSignup";
import AgentDashboard from "./pages/AgentDashboard";
import AgentProfile from "./pages/AgentProfile";
import AgentReviews from "./pages/AgentReviews";
import AdvisorFullReview from "./pages/AdvisorFullReview";
import AgentSubscription from "./pages/AgentSubscription";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import VideoCall from "./pages/VideoCall";
import ReviewRating from "./pages/ReviewRating";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/retirement" element={<Retirement />} />
          <Route path="/education" element={<Education />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/agent-signup" element={<AgentSignup />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/agent-profile" element={<AgentProfile />} />
          <Route path="/agent-reviews" element={<AgentReviews />} />
          <Route path="/agent-subscription" element={<AgentSubscription />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/advisor-full-review" element={<AdvisorFullReview />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/review-rating" element={<ReviewRating />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
