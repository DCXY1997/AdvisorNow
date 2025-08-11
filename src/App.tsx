import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import AgentSignup from "./pages/AgentSignup";
import AgentDashboard from "./pages/AgentDashboard";
import AgentProfile from "./pages/AgentProfile";
import AgentReviews from "./pages/AgentReviews";
import AgentSubscription from "./pages/AgentSubscription";
import AdminDashboard from "./pages/AdminDashboard";
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/agent-signup" element={<AgentSignup />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/agent-profile" element={<AgentProfile />} />
          <Route path="/agent-reviews" element={<AgentReviews />} />
          <Route path="/agent-subscription" element={<AgentSubscription />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
