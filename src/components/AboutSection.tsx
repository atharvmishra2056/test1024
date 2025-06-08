
import React, { useEffect, useState } from 'react';

const AboutSection = () => {
  const [counters, setCounters] = useState({ results: 0, campus: 0, activities: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate counters
          const duration = 2000;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setCounters({
              results: Math.floor(100 * progress),
              campus: Math.floor(4 * progress),
              activities: Math.floor(25 * progress),
            });
            
            if (step >= steps) clearInterval(timer);
          }, stepDuration);
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">About Fortune World School</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-school-blue mb-6">Our Story</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Fortune World School is a world-class CBSE-affiliated school in Sector 105, Noida, founded under Mohan Charitable Educational Trust. 
              Our sprawling 4-acre campus features state-of-the-art facilities designed to nurture young minds with academic excellence and holistic development.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-school-blue mb-3">Our Mission</h4>
                <p className="text-gray-600">
                  To provide world-class education that empowers students to become confident, creative, and responsible global citizens.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-school-blue mb-3">Our Vision</h4>
                <p className="text-gray-600">
                  To be the leading educational institution that shapes future leaders through innovation, integrity, and excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover-lift">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Principal Sonal Srivastava"
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold text-school-blue">Principal Sonal Srivastava</h4>
                  <p className="text-gray-600">Principal</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The whole purpose of education is to turn mirrors into windows... We strive to create an environment 
                which stimulates inquiry, creativity, critical thinking, and prepares our students for future challenges."
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-school-blue text-white rounded-2xl p-8 hover-lift">
            <div className="text-4xl font-bold mb-2">{counters.results}%</div>
            <div className="text-xl">Board Results</div>
          </div>
          <div className="bg-school-yellow text-school-blue rounded-2xl p-8 hover-lift">
            <div className="text-4xl font-bold mb-2">{counters.campus}</div>
            <div className="text-xl">Acre Campus</div>
          </div>
          <div className="bg-school-blue text-white rounded-2xl p-8 hover-lift">
            <div className="text-4xl font-bold mb-2">{counters.activities}+</div>
            <div className="text-xl">Activities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
