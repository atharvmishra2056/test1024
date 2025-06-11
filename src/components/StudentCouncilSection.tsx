
import React from 'react';
import { Users } from 'lucide-react';

const StudentCouncilSection = () => {
  return (
    <section id="student-council" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">
            Meet our Student Council
          </h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The voice of our student body, advocating for positive change and fostering community spirit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover-lift">
              <img
                src="/lovable-uploads/b2cea996-62e1-468e-9f58-d8e756a6fdaf.png"
                alt="Fortune World School Student Council members in their official ceremony"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center mb-6">
              <Users className="text-school-red mr-3" size={32} />
              <h3 className="text-2xl font-bold text-school-blue">Student Leadership</h3>
            </div>
            
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Welcome to the heart of student leadership at our school—the Student Council! 
              Comprising dedicated representatives from every grade, the Student Council serves 
              as the voice of our student body, advocating for ideas, initiatives, and positive change. 
              Through collaboration, innovation, and a commitment to service, our council members 
              strive to enhance school spirit, organize meaningful events, and foster a supportive 
              community where every voice is heard and valued.
            </p>

            <div className="bg-school-beige/20 rounded-2xl p-6 border-l-4 border-school-red">
              <h4 className="text-xl font-bold text-school-blue mb-4">Our Leaders</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-semibold text-school-red mr-2">Head Boy:</span>
                  <span className="text-gray-700">Atharv Mishra from Class 12</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-school-red mr-2">Head Girl:</span>
                  <span className="text-gray-700">Anvesha Singh from Class 11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentCouncilSection;
