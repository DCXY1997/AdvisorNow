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

interface EducationAdvisor {
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

interface EducationAdvisorCardsProps {
  onConnectClick: () => void;
}

const EducationAdvisorCards = ({ onConnectClick }: EducationAdvisorCardsProps) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<EducationAdvisor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topEducationAdvisors: EducationAdvisor[] = [
    {
      name: "Amanda Ng",
      insuranceRating: 4.9,
      insuranceReviews: 143,
      specialties: "Education Savings, University Planning, Study Abroad Funding",
      experience: "Manulife",
      connections: "Li Wei and 7 other mutual connections",
      avatar: "AN",
      profileImage: amandaLeeImg,
      bio: "Amanda is an education planning specialist helping families prepare for their children's educational journey from early childhood through university and beyond.",
      repNumber: "REP-AN-2024-019",
      email: "amanda.ng@manulife.com.sg",
      phone: "+65 9901 2345",
      specializations: ["Education Planning", "Investment Planning"],
      reviews: [
        {
          id: 20,
          clientName: "John Tan",
          rating: 5,
          comment: "Amanda helped us plan for our children's university education. Excellent financial guidance!",
          date: "2024-01-30",
          serviceType: "Education Planning"
        }
      ]
    },
    {
      name: "Marcus Tan",
      insuranceRating: 4.8,
      insuranceReviews: 127,
      specialties: "Education Insurance, Scholarship Planning, Skills Training",
      experience: "Great Eastern",
      connections: "James Wong and 9 other mutual connections",
      avatar: "MT",
      profileImage: michaelTanImg,
      bio: "Marcus specializes in education insurance and scholarship planning, helping families secure funding for their children's educational goals and skills development.",
      repNumber: "REP-MT-2024-020",
      email: "marcus.tan@greatetern.com.sg",
      phone: "+65 9012 3456",
      specializations: ["Education Planning", "Insurance Coverage"],
      reviews: [
        {
          id: 21,
          clientName: "Rachel Lim",
          rating: 5,
          comment: "Marcus's education insurance plan has secured my daughter's future education funding. Highly recommend!",
          date: "2024-02-08",
          serviceType: "Education Planning"
        }
      ]
    },
    {
      name: "Lisa Wang",
      insuranceRating: 4.7,
      insuranceReviews: 164,
      specialties: "Early Childhood Education, Professional Development, Skills Training",
      experience: "Prudential",
      connections: "Kevin Lee and 11 other mutual connections",
      avatar: "LW",
      profileImage: sarahChenImg,
      bio: "Lisa focuses on early childhood education planning and professional development funding, ensuring children have the best educational foundation and career development opportunities.",
      repNumber: "REP-LW-2024-021",
      email: "lisa.wang@prudential.com.sg",
      phone: "+65 9123 4567",
      specializations: ["Education Planning", "Investment Planning"],
      reviews: [
        {
          id: 22,
          clientName: "David Chen",
          rating: 4,
          comment: "Lisa's early childhood education planning has set my children up for success. Great advice!",
          date: "2024-01-12",
          serviceType: "Education Planning"
        }
      ]
    },
    {
      name: "Jennifer Koh",
      insuranceRating: 4.7,
      insuranceReviews: 138,
      specialties: "International Education, Study Abroad Programs, Language Learning",
      experience: "AIA",
      connections: "Peter Ng and 8 other mutual connections",
      avatar: "JK",
      profileImage: jenniferLimImg,
      bio: "Jennifer specializes in international education planning and study abroad programs, helping families navigate the complexities of overseas education funding.",
      repNumber: "REP-JK-2024-022",
      email: "jennifer.koh@aia.com.sg",
      phone: "+65 9234 5678",
      specializations: ["Education Planning", "Investment Planning"],
      reviews: [
        {
          id: 23,
          clientName: "Michael Wong",
          rating: 5,
          comment: "Jennifer's international education planning helped my son study at his dream university abroad!",
          date: "2024-02-15",
          serviceType: "Education Planning"
        }
      ]
    },
    {
      name: "Steven Lee",
      insuranceRating: 4.6,
      insuranceReviews: 152,
      specialties: "Vocational Training, Technical Education, Career Development",
      experience: "Income",
      connections: "Grace Tan and 10 other mutual connections",
      avatar: "SL",
      profileImage: davidWongImg,
      bio: "Steven focuses on vocational and technical education planning, helping families invest in practical skills training and career development programs.",
      repNumber: "REP-SL-2024-023",
      email: "steven.lee@income.com.sg",
      phone: "+65 9345 6789",
      specializations: ["Education Planning", "Investment Planning"],
      reviews: [
        {
          id: 24,
          clientName: "Sharon Ng",
          rating: 4,
          comment: "Steven's vocational training planning helped my son develop valuable technical skills. Excellent guidance!",
          date: "2024-01-25",
          serviceType: "Education Planning"
        }
      ]
    },
    {
      name: "Karen Lim",
      insuranceRating: 4.6,
      insuranceReviews: 119,
      specialties: "Graduate Studies, Professional Certifications, Continuing Education",
      experience: "Singlife",
      connections: "Robert Chen and 6 other mutual connections",
      avatar: "KL",
      profileImage: robertChuaImg,
      bio: "Karen specializes in graduate studies and professional certification funding, helping working adults continue their education and career advancement.",
      repNumber: "REP-KL-2024-024",
      email: "karen.lim@singlife.com.sg",
      phone: "+65 9456 7890",
      specializations: ["Education Planning", "Investment Planning"],
      reviews: [
        {
          id: 25,
          clientName: "Eric Tan",
          rating: 5,
          comment: "Karen's graduate studies planning enabled me to pursue my MBA while managing finances effectively.",
          date: "2024-02-20",
          serviceType: "Education Planning"
        }
      ]
    }
  ].sort((a, b) => {
    if (b.insuranceRating !== a.insuranceRating) return b.insuranceRating - a.insuranceRating;
    return b.insuranceReviews - a.insuranceReviews;
  });

  const handleViewClick = (advisor: EducationAdvisor) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          Top-Rated Education Advisors
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Ranked by education planning expertise ratings and reviews
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topEducationAdvisors.map((advisor, index) => (
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
                    ({advisor.insuranceReviews} education reviews)
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

export default EducationAdvisorCards;