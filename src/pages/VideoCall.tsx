import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare,
  Volume2,
  VolumeX,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoCall = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(true);

  // Mock advisor data
  const advisor = {
    name: "Sarah Johnson",
    specialty: "Financial Planning",
    rating: 4.8,
    reviewCount: 127,
    licenseCode: "FP-2024-456",
    avatar: ""
  };

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    // Navigate to review page after ending call
    navigate('/review-rating', { 
      state: { 
        advisor: advisor,
        callDuration: callDuration 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AN</span>
              </div>
              <span className="font-bold text-lg text-foreground">Advisor Now</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
              Connected
            </Badge>
            <div className="text-sm font-medium text-muted-foreground">
              {formatTime(callDuration)}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 relative bg-gray-900">
          {/* Advisor Video */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
            <div className="text-center text-white">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white/20">
                <AvatarImage src={advisor.avatar} />
                <AvatarFallback className="text-4xl bg-primary">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{advisor.name}</h2>
              <p className="text-lg text-blue-200 mb-2">{advisor.specialty}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-yellow-400">★</span>
                <span>{advisor.rating}</span>
                <span className="text-gray-300">({advisor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* User Video (Picture-in-Picture) */}
          <div className="absolute bottom-6 right-6 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
            <div className="text-white text-center">
              {isVideoOn ? (
                <div className="text-sm">Your Video</div>
              ) : (
                <div className="text-center">
                  <VideoOff className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-400">Camera Off</div>
                </div>
              )}
            </div>
          </div>

          {/* Call Status */}
          <div className="absolute top-6 left-6">
            <Badge className="bg-red-600 text-white animate-pulse">
              ● LIVE
            </Badge>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-card border-l border-border p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={advisor.avatar} />
                  <AvatarFallback>
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{advisor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    License: {advisor.licenseCode}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{advisor.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{advisor.reviewCount}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Session Duration</div>
                <div className="text-2xl font-bold text-primary">{formatTime(callDuration)}</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Call Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-card/95 backdrop-blur border border-border rounded-full px-6 py-4 shadow-lg">
          <div className="flex items-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            <Button
              variant={!isVideoOn ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={!isSpeakerOn ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>

            <div className="w-px h-8 bg-border mx-2" />

            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-12 h-12 p-0 bg-red-600 hover:bg-red-700"
              onClick={handleEndCall}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;