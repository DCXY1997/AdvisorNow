import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import { useState } from "react";
import AdvisorDetailModal from "./AdvisorDetailModal";

// Import advisor profile images
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

interface InsuranceAdvisor {
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

interface InsuranceAdvisorCardsProps {
  onConnectClick: () => void;
}

const InsuranceAdvisorCards = ({ onConnectClick }: InsuranceAdvisorCardsProps) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<InsuranceAdvisor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topInsuranceAdvisors: InsuranceAdvisor[] = [
    {
      name: "Sarah Chen",
      insuranceRating: 4.9,
      insuranceReviews: 167,
      specialties: "Life Insurance, Health Insurance, Critical Illness",
      experience: "Great Eastern",
      connections: "Li Wei and 6 other mutual connections",
      avatar: "SC",
      profileImage: sarahChenImg,
      bio: "Sarah is a dedicated insurance professional with extensive experience in life and health insurance. She specializes in helping families secure their financial future through comprehensive coverage solutions.",
      repNumber: "REP-SC-2024-001",
      email: "sarah.chen@greatetern.com.sg",
      phone: "+65 9123 4567",
      specializations: ["Life Insurance", "Health Insurance", "Critical Illness", "Family Protection"],
      reviews: [
        {
          id: 1,
          clientName: "John Lim",
          rating: 5,
          comment: "Sarah provided excellent guidance on my family's insurance needs. Very professional and thorough.",
          date: "2024-01-15",
          serviceType: "Life Insurance"
        },
        {
          id: 2,
          clientName: "Mary Tan", 
          rating: 5,
          comment: "Outstanding service! Sarah helped me understand complex insurance terms and found the perfect coverage.",
          date: "2024-02-20",
          serviceType: "Health Insurance"
        }
      ]
    },
    {
      name: "Michael Tan",
      insuranceRating: 4.8,
      insuranceReviews: 203,
      specialties: "Term Life, Whole Life, Investment-Linked",
      experience: "AIA",
      connections: "James Lim and 12 other mutual connections",
      avatar: "MT",
      profileImage: michaelTanImg,
      bio: "Michael brings over a decade of experience in the insurance industry, specializing in investment-linked policies and retirement planning.",
      repNumber: "REP-MT-2024-002",
      email: "michael.tan@aia.com.sg",
      phone: "+65 9234 5678",
      specializations: ["Term Life", "Whole Life", "Investment-Linked", "Retirement Planning"],
      reviews: [
        {
          id: 3,
          clientName: "David Wong",
          rating: 5,
          comment: "Michael's expertise in investment-linked policies is exceptional. Highly recommend!",
          date: "2024-01-10",
          serviceType: "Investment-Linked"
        }
      ]
    },
    {
      name: "Jennifer Lim",
      insuranceRating: 4.8,
      insuranceReviews: 156,
      specialties: "Family Protection, Business Insurance, Disability",
      experience: "Prudential",
      connections: "Rachel Wong and 8 other mutual connections",
      avatar: "JL",
      profileImage: jenniferLimImg,
      bio: "Jennifer focuses on comprehensive family and business protection strategies, ensuring her clients have robust coverage for all life scenarios.",
      repNumber: "REP-JL-2024-003",
      email: "jennifer.lim@prudential.com.sg",
      phone: "+65 9345 6789",
      specializations: ["Family Protection", "Business Insurance", "Disability Insurance", "Estate Planning"],
      reviews: [
        {
          id: 4,
          clientName: "Susan Lee",
          rating: 4,
          comment: "Jennifer helped protect my family and business. Very knowledgeable and patient.",
          date: "2024-02-05",
          serviceType: "Family Protection"
        }
      ]
    },
    {
      name: "David Wong",
      insuranceRating: 4.7,
      insuranceReviews: 189,
      specialties: "Estate Planning, Legacy Protection, Wealth Transfer",
      experience: "Income",
      connections: "Kevin Ng and 15 other mutual connections",
      avatar: "DW",
      profileImage: davidWongImg,
      bio: "David specializes in estate planning and wealth transfer strategies, helping high-net-worth individuals preserve and transfer their wealth efficiently.",
      repNumber: "REP-DW-2024-004",
      email: "david.wong@income.com.sg",
      phone: "+65 9456 7890",
      specializations: ["Estate Planning", "Legacy Protection", "Wealth Transfer", "High Net Worth Insurance"],
      reviews: [
        {
          id: 5,
          clientName: "Robert Chen",
          rating: 5,
          comment: "David's estate planning expertise is unmatched. He helped structure my family's wealth transfer perfectly.",
          date: "2024-01-25",
          serviceType: "Estate Planning"
        }
      ]
    },
    {
      name: "Amanda Lee",
      insuranceRating: 4.7,
      insuranceReviews: 134,
      specialties: "Young Professional Insurance, Health Coverage",
      experience: "Singlife",
      connections: "Mark Tan and 7 other mutual connections",
      avatar: "AL",
      profileImage: amandaLeeImg,
      bio: "Amanda specializes in insurance solutions for young professionals, helping them build a strong financial foundation early in their careers.",
      repNumber: "REP-AL-2024-005",
      email: "amanda.lee@singlife.com.sg",
      phone: "+65 9567 8901",
      specializations: ["Young Professional Insurance", "Health Coverage", "Term Life", "Savings Plans"],
      reviews: [
        {
          id: 6,
          clientName: "Kevin Ng",
          rating: 4,
          comment: "Amanda understood my needs as a young professional and provided affordable yet comprehensive coverage.",
          date: "2024-02-10",
          serviceType: "Young Professional Insurance"
        }
      ]
    },
    {
      name: "Robert Chua",
      insuranceRating: 4.6,
      insuranceReviews: 198,
      specialties: "Business Insurance, Corporate Solutions",
      experience: "FWD",
      connections: "Peter Lee and 18 other mutual connections",
      avatar: "RC",
      profileImage: robertChuaImg,
      bio: "Robert focuses on corporate insurance solutions, helping businesses protect their operations, employees, and key personnel.",
      repNumber: "REP-RC-2024-006",
      email: "robert.chua@fwd.com.sg",
      phone: "+65 9678 9012",
      specializations: ["Business Insurance", "Corporate Solutions", "Key Person Insurance", "Group Employee Benefits"],
      reviews: [
        {
          id: 7,
          clientName: "Linda Tan",
          rating: 5,
          comment: "Robert provided excellent corporate insurance solutions for our company. Very professional service.",
          date: "2024-01-30",
          serviceType: "Business Insurance"
        }
      ]
    }
  ].sort((a, b) => {
    // Sort by insurance rating first (descending), then by insurance review count (descending)
    if (b.insuranceRating !== a.insuranceRating) return b.insuranceRating - a.insuranceRating;
    return b.insuranceReviews - a.insuranceReviews;
  });

  const handleViewClick = (advisor: InsuranceAdvisor) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          Top-Rated Insurance Advisors
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Ranked by insurance expertise ratings and reviews
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topInsuranceAdvisors.map((advisor, index) => (
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
                    ({advisor.insuranceReviews} insurance reviews)
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

export default InsuranceAdvisorCards;