import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import { useState } from "react";
import AdvisorDetailModal from "./AdvisorDetailModal";

// Import advisor profile images (reusing some existing ones)
import sarahChenImg from "@/assets/advisors/sarah-chen.jpg";
import michaelTanImg from "@/assets/advisors/michael-tan.jpg";
import jenniferLimImg from "@/assets/advisors/jennifer-lim.jpg";
import davidWongImg from "@/assets/advisors/david-wong.jpg";
import amandaLeeImg from "@/assets/advisors/amanda-lee.jpg";
import robertChuaImg from "@/assets/advisors/robert-chua.jpg";

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

interface InvestmentAdvisor {
  name: string;
  insuranceRating: number;
  insuranceReviews: number;
  specialties: string;
  experience: string;
  connections: string;
  avatar: string;
  profileImage: string;
  bio: string;
  repNumber: string;
  email: string;
  phone: string;
  specializations: string[];
  reviews: Review[];
}

interface InvestmentAdvisorCardsProps {
  onConnectClick: () => void;
}

const InvestmentAdvisorCards = ({ onConnectClick }: InvestmentAdvisorCardsProps) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<InvestmentAdvisor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topInvestmentAdvisors: InvestmentAdvisor[] = [
    {
      name: "Alex Thompson",
      insuranceRating: 4.9,
      insuranceReviews: 234,
      specialties: "Portfolio Management, ETF Strategies, Tax-Efficient Investing",
      experience: "HSBC Life",
      connections: "Li Wei and 8 other mutual connections",
      avatar: "AT",
      profileImage: michaelTanImg,
      bio: "Alex is a seasoned investment professional with expertise in portfolio management and tax-efficient investing strategies. He helps clients build diversified portfolios aligned with their risk tolerance and financial goals.",
      repNumber: "REP-AT-2024-007",
      email: "alex.thompson@hsbc.com.sg",
      phone: "+65 9789 0123",
      specializations: ["Investment Planning", "Wealth Management", "Tax Planning"],
      reviews: [
        {
          id: 8,
          clientName: "Sarah Lim",
          rating: 5,
          comment: "Alex helped me diversify my portfolio and significantly improved my returns. Excellent investment advice!",
          date: "2024-01-20",
          serviceType: "Investment Planning"
        }
      ]
    },
    {
      name: "Priya Sharma",
      insuranceRating: 4.8,
      insuranceReviews: 198,
      specialties: "Growth Investing, Dividend Strategies, Risk Assessment",
      experience: "Manulife",
      connections: "James Tan and 10 other mutual connections",
      avatar: "PS",
      profileImage: sarahChenImg,
      bio: "Priya specializes in growth investing and dividend strategies, with a focus on helping clients achieve long-term financial growth through strategic asset allocation.",
      repNumber: "REP-PS-2024-008",
      email: "priya.sharma@manulife.com.sg",
      phone: "+65 9890 1234",
      specializations: ["Investment Planning", "Retirement Planning"],
      reviews: [
        {
          id: 9,
          clientName: "Kevin Ng",
          rating: 5,
          comment: "Priya's dividend strategy has provided me with steady passive income. Highly recommend her services!",
          date: "2024-02-01",
          serviceType: "Investment Planning"
        }
      ]
    },
    {
      name: "Kevin Lim",
      insuranceRating: 4.8,
      insuranceReviews: 156,
      specialties: "Value Investing, Market Analysis, Asset Allocation",
      experience: "Great Eastern",
      connections: "Rachel Wong and 12 other mutual connections",
      avatar: "KL",
      profileImage: davidWongImg,
      bio: "Kevin is an expert in value investing and market analysis, helping clients identify undervalued opportunities and build robust investment portfolios.",
      repNumber: "REP-KL-2024-009",
      email: "kevin.lim@greatetern.com.sg",
      phone: "+65 9901 2345",
      specializations: ["Investment Planning", "Wealth Management"],
      reviews: [
        {
          id: 10,
          clientName: "Lisa Chen",
          rating: 4,
          comment: "Kevin's value investing approach has helped me find great investment opportunities. Very knowledgeable!",
          date: "2024-01-18",
          serviceType: "Investment Planning"
        }
      ]
    },
    {
      name: "Sophia Lee",
      insuranceRating: 4.7,
      insuranceReviews: 189,
      specialties: "ESG Investing, Alternative Investments, Portfolio Optimization",
      experience: "UOB Asset Management",
      connections: "Peter Tan and 9 other mutual connections",
      avatar: "SL",
      profileImage: jenniferLimImg,
      bio: "Sophia focuses on ESG investing and alternative investments, helping clients build sustainable portfolios that align with their values while achieving strong returns.",
      repNumber: "REP-SL-2024-010",
      email: "sophia.lee@uob.com.sg",
      phone: "+65 9012 3456",
      specializations: ["Investment Planning", "Wealth Management", "Estate Planning"],
      reviews: [
        {
          id: 11,
          clientName: "Mark Wong",
          rating: 5,
          comment: "Sophia's ESG investment strategy perfectly aligns with my values while delivering excellent returns.",
          date: "2024-02-08",
          serviceType: "Investment Planning"
        }
      ]
    },
    {
      name: "Ryan Chen",
      insuranceRating: 4.7,
      insuranceReviews: 143,
      specialties: "Technology Investing, Growth Stocks, International Markets",
      experience: "DBS Wealth Management",
      connections: "Jennifer Lim and 11 other mutual connections",
      avatar: "RC",
      profileImage: robertChuaImg,
      bio: "Ryan specializes in technology investing and international markets, helping clients capitalize on global growth opportunities and emerging market trends.",
      repNumber: "REP-RC-2024-011",
      email: "ryan.chen@dbs.com.sg",
      phone: "+65 9123 4567",
      specializations: ["Investment Planning", "Wealth Management"],
      reviews: [
        {
          id: 12,
          clientName: "Amy Tan",
          rating: 4,
          comment: "Ryan's technology investment insights have been invaluable. Great performance in my tech portfolio!",
          date: "2024-01-25",
          serviceType: "Investment Planning"
        }
      ]
    },
    {
      name: "Michelle Ng",
      insuranceRating: 4.6,
      insuranceReviews: 167,
      specialties: "Fixed Income, Bond Strategies, Risk Management",
      experience: "Phillip Capital",
      connections: "David Lee and 7 other mutual connections",
      avatar: "MN",
      profileImage: amandaLeeImg,
      bio: "Michelle is an expert in fixed income investments and bond strategies, providing clients with stable income solutions and effective risk management techniques.",
      repNumber: "REP-MN-2024-012",
      email: "michelle.ng@phillip.com.sg",
      phone: "+65 9234 5678",
      specializations: ["Investment Planning", "Retirement Planning"],
      reviews: [
        {
          id: 13,
          clientName: "Robert Lim",
          rating: 5,
          comment: "Michelle's bond strategies have provided me with steady income and capital preservation. Excellent advisor!",
          date: "2024-02-03",
          serviceType: "Investment Planning"
        }
      ]
    }
  ].sort((a, b) => {
    if (b.insuranceRating !== a.insuranceRating) return b.insuranceRating - a.insuranceRating;
    return b.insuranceReviews - a.insuranceReviews;
  });

  const handleViewClick = (advisor: InvestmentAdvisor) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          Top-Rated Investment Advisors
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Ranked by investment expertise ratings and reviews
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topInvestmentAdvisors.map((advisor, index) => (
            <Card key={advisor.name} className="service-card p-6 relative">
              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <img 
                    src={advisor.profileImage} 
                    alt={`${advisor.name} profile`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name and Rating */}
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {advisor.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{advisor.insuranceRating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({advisor.insuranceReviews} investment reviews)
                  </span>
                </div>
                
                {/* Experience */}
                <p className="text-sm text-muted-foreground mb-3">
                  {advisor.experience}
                </p>
                
                {/* View Button */}
                <Button
                  onClick={() => handleViewClick(advisor)}
                  variant="outline"
                  className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View
                </Button>
              </div>
              
              {/* Ranking Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-semibold">
                  #{index + 1}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AdvisorDetailModal
        advisor={selectedAdvisor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default InvestmentAdvisorCards;