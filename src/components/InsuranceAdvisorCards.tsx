import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";

interface InsuranceAdvisor {
  name: string;
  insuranceRating: number;
  insuranceReviews: number;
  specialties: string;
  experience: string;
  connections: string;
  avatar: string;
}

interface InsuranceAdvisorCardsProps {
  onConnectClick: () => void;
}

const InsuranceAdvisorCards = ({ onConnectClick }: InsuranceAdvisorCardsProps) => {
  const topInsuranceAdvisors: InsuranceAdvisor[] = [
    {
      name: "Sarah Chen",
      insuranceRating: 4.9,
      insuranceReviews: 167,
      specialties: "Life Insurance, Health Insurance, Critical Illness",
      experience: "Great Eastern",
      connections: "Li Wei and 6 other mutual connections",
      avatar: "SC"
    },
    {
      name: "Michael Tan",
      insuranceRating: 4.8,
      insuranceReviews: 203,
      specialties: "Term Life, Whole Life, Investment-Linked",
      experience: "AIA",
      connections: "James Lim and 12 other mutual connections",
      avatar: "MT"
    },
    {
      name: "Jennifer Lim",
      insuranceRating: 4.8,
      insuranceReviews: 156,
      specialties: "Family Protection, Business Insurance, Disability",
      experience: "Prudential",
      connections: "Rachel Wong and 8 other mutual connections",
      avatar: "JL"
    },
    {
      name: "David Wong",
      insuranceRating: 4.7,
      insuranceReviews: 189,
      specialties: "Estate Planning, Legacy Protection, Wealth Transfer",
      experience: "Income",
      connections: "Kevin Ng and 15 other mutual connections",
      avatar: "DW"
    },
    {
      name: "Amanda Lee",
      insuranceRating: 4.7,
      insuranceReviews: 134,
      specialties: "Young Professional Insurance, Health Coverage",
      experience: "Singlife",
      connections: "Mark Tan and 7 other mutual connections",
      avatar: "AL"
    },
    {
      name: "Robert Chua",
      insuranceRating: 4.6,
      insuranceReviews: 198,
      specialties: "Business Insurance, Corporate Solutions",
      experience: "FWD",
      connections: "Peter Lee and 18 other mutual connections",
      avatar: "RC"
    }
  ].sort((a, b) => {
    // Sort by insurance rating first (descending), then by insurance review count (descending)
    if (b.insuranceRating !== a.insuranceRating) return b.insuranceRating - a.insuranceRating;
    return b.insuranceReviews - a.insuranceReviews;
  });

  return (
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
              {/* Profile Avatar */}
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {advisor.avatar}
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
                onClick={onConnectClick}
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
  );
};

export default InsuranceAdvisorCards;