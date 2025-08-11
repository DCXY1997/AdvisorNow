const Testimonials = () => {
  const testimonials = [
    {
      quote: "This app is a game changer, no more awkward sales talk. Just advice",
      name: "John, 34",
      avatar: "👨‍💼"
    },
    {
      quote: "I used this app to ask about hospital plan. In minutes I managed to gain clarity",
      name: "Melissa, 27", 
      avatar: "👩‍💼"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why People Love It
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to join our platform and connect with real, ready to talk advisors
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-8 rounded-2xl shadow-card border border-border/50">
                <div className="mb-6">
                  <p className="text-foreground text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;