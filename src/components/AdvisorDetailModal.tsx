import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Mail, User, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

interface AdvisorDetails {
  name: string;
  profileImage: string;
  bio: string;
  repNumber: string;
  email: string;
  phone: string;
  specializations: string[];
  insuranceRating: number;
  insuranceReviews: number;
  reviews: Review[];
}

interface AdvisorDetailModalProps {
  advisor: AdvisorDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const AdvisorDetailModal = ({ advisor, isOpen, onClose }: AdvisorDetailModalProps) => {
  if (!advisor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            <img 
              src={advisor.profileImage} 
              alt={`${advisor.name} profile`} 
              className="w-full h-full object-cover"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">
            {advisor.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Biography
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advisor.bio}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Representative Number
                </h3>
                <p className="text-muted-foreground font-mono">{advisor.repNumber}</p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </h3>
                <p className="text-muted-foreground">{advisor.email}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </h3>
                <p className="text-muted-foreground">{advisor.phone}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Overall Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{advisor.insuranceRating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({advisor.insuranceReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Specializations */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {advisor.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Reviews Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Client Reviews</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {advisor.reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-foreground">{review.clientName}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {review.serviceType}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvisorDetailModal;