import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import { useState } from "react";
import AdvisorDetailModal from "./AdvisorDetailModal";

// Import advisor profile images (reusing existing ones)
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

interface RetirementAdvisor {
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

interface RetirementAdvisorCardsProps {
  onConnectClick: () => void;
}

const RetirementAdvisorCards = ({ onConnectClick }: RetirementAdvisorCardsProps) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<RetirementAdvisor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topRetirementAdvisors: RetirementAdvisor[] = [
    {
      name: "Robert Johnson",
      insuranceRating: 4.9,
      insuranceReviews: 178,
      specialties: "CPF Optimization, Retirement Income, Estate Planning",
      experience: "Singlife",
      connections: "Li Wei and 12 other mutual connections",
      avatar: "RJ",
      profileImage: davidWongImg,
      bio: "Robert is a retirement planning specialist with extensive experience in CPF optimization and estate planning. He helps clients secure their financial future through comprehensive retirement strategies.",
      repNumber: "REP-RJ-2024-013",
      email: "robert.johnson@singlife.com.sg",
      phone: "+65 9345 6789",
      specializations: ["Retirement Planning", "Estate Planning", "Wealth Management"],
      reviews: [
        {
          id: 14,
          clientName: "Mary Lim",
          rating: 5,
          comment: "Robert's CPF optimization strategy has maximized my retirement savings. Excellent guidance throughout!",
          date: "2024-01-15",
          serviceType: "Retirement Planning"
        }
      ]
    },
    {
      name: "Michelle Lee",
      insuranceRating: 4.8,
      insuranceReviews: 145,
      specialties: "Pension Planning, Long-term Care, Wealth Preservation",
      experience: "Income",
      connections: "James Tan and 9 other mutual connections",
      avatar: "ML",
      profileImage: jenniferLimImg,
      bio: "Michelle specializes in pension planning and long-term care strategies, helping clients preserve wealth and plan for healthcare needs in retirement.",
      repNumber: "REP-ML-2024-014",
      email: "michelle.lee@income.com.sg",
      phone: "+65 9456 7890",
      specializations: ["Retirement Planning", "Insurance Coverage", "Wealth Management"],
      reviews: [
        {
          id: 15,
          clientName: "Peter Wong",
          rating: 5,
          comment: "Michelle's long-term care planning saved my family from financial stress. Highly recommend her expertise!",
          date: "2024-02-12",
          serviceType: "Retirement Planning"
        }
      ]
    },
    {
      name: "Daniel Chua",
      insuranceRating: 4.7,
      insuranceReviews: 192,
      specialties: "Retirement Strategies, Tax Planning, Asset Protection",
      experience: "Great Eastern",
      connections: "Rachel Lee and 15 other mutual connections",
      avatar: "DC",
      profileImage: robertChuaImg,
      bio: "Daniel is an expert in comprehensive retirement strategies and tax planning, helping clients optimize their retirement income while protecting their assets.",
      repNumber: "REP-DC-2024-015",
      email: "daniel.chua@greatetern.com.sg",
      phone: "+65 9567 8901",
      specializations: ["Retirement Planning", "Tax Planning", "Estate Planning"],
      reviews: [
        {
          id: 16,
          clientName: "Susan Chen",
          rating: 4,
          comment: "Daniel's tax planning strategies have significantly improved my retirement income projections.",
          date: "2024-01-28",
          serviceType: "Retirement Planning"
        }
      ]
    },
    {
      name: "Catherine Tan",
      insuranceRating: 4.7,
      insuranceReviews: 164,
      specialties: "Senior Financial Planning, Healthcare Funding, Legacy Planning",
      experience: "Prudential",
      connections: "Kevin Ng and 11 other mutual connections",
      avatar: "CT",
      profileImage: sarahChenImg,
      bio: "Catherine focuses on senior financial planning and healthcare funding, ensuring clients have comprehensive coverage for their golden years and legacy planning needs.",
      repNumber: "REP-CT-2024-016",
      email: "catherine.tan@prudential.com.sg",
      phone: "+65 9678 9012",
      specializations: ["Retirement Planning", "Insurance Coverage", "Estate Planning"],
      reviews: [
        {
          id: 17,
          clientName: "David Lim",
          rating: 5,
          comment: "Catherine's healthcare funding plan gives me peace of mind for my retirement years. Excellent service!",
          date: "2024-02-05",
          serviceType: "Retirement Planning"
        }
      ]
    },
    {
      name: "William Ng",
      insuranceRating: 4.6,
      insuranceReviews: 156,
      specialties: "Retirement Income Strategies, Social Security Optimization, Portfolio Management",
      experience: "AIA",
      connections: "Jennifer Wong and 8 other mutual connections",
      avatar: "WN",
      profileImage: michaelTanImg,
      bio: "William specializes in retirement income strategies and portfolio management, helping clients create sustainable income streams for their retirement years.",
      repNumber: "REP-WN-2024-017",
      email: "william.ng@aia.com.sg",
      phone: "+65 9789 0123",
      specializations: ["Retirement Planning", "Investment Planning", "Wealth Management"],
      reviews: [
        {
          id: 18,
          clientName: "Grace Tan",
          rating: 4,
          comment: "William's retirement income strategy has provided me with confidence about my financial future.",
          date: "2024-01-22",
          serviceType: "Retirement Planning"
        }
      ]
    },
    {
      name: "Helen Wong",
      insuranceRating: 4.6,
      insuranceReviews: 139,
      specialties: "Retirement Planning for Women, Financial Independence, Longevity Planning",
      experience: "OCBC Bank",
      connections: "Mark Lee and 6 other mutual connections",
      avatar: "HW",
      profileImage: amandaLeeImg,
      bio: "Helen specializes in retirement planning for women and longevity planning, addressing the unique financial challenges and opportunities women face in retirement.",
      repNumber: "REP-HW-2024-018",
      email: "helen.wong@ocbc.com.sg",
      phone: "+65 9890 1234",
      specializations: ["Retirement Planning", "Investment Planning", "Wealth Management"],
      reviews: [
        {
          id: 19,
          clientName: "Lisa Ng",
          rating: 5,
          comment: "Helen understands the unique retirement challenges women face. Her planning has been invaluable!",
          date: "2024-02-18",
          serviceType: "Retirement Planning"
        }
      ]
    }
  ].sort((a, b) => {
    if (b.insuranceRating !== a.insuranceRating) return b.insuranceRating - a.insuranceRating;
    return b.insuranceReviews - a.insuranceReviews;
  });

  const handleViewClick = (advisor: RetirementAdvisor) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          Top-Rated Retirement Advisors
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Ranked by retirement planning expertise ratings and reviews
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRetirementAdvisors.map((advisor, index) => (
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
                    ({advisor.insuranceReviews} retirement reviews)
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

export default RetirementAdvisorCards;