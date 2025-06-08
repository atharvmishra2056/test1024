
import React from 'react';
import { GraduationCap, BookOpen, Users, Bus, Utensils, Heart } from 'lucide-react';

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: GraduationCap,
      title: 'Smart Classrooms',
      description: 'Digital boards and modern learning technology',
      image: 'https://www.cmsitportal.org/img/snb1.jpg',
      alt: 'Smart classroom with digital board at Fortune World School'
    },
    {
      icon: BookOpen,
      title: 'Science & Robotics Labs',
      description: 'State-of-the-art laboratories for hands-on learning',
      image: 'https://fortuneworldschool.com/assets/web/images/pages/laboratories-2.jpg',
      alt: 'Science and Robotics Lab at Fortune World School'
    },
    {
      icon: BookOpen,
      title: 'Library',
      description: 'Extensive collection of books and digital resources',
      image: 'https://fortuneworldschool.com/assets/web/images/pages/lib-3.jpg',
      alt: 'Modern library at Fortune World School'
    },
    {
      icon: Users,
      title: 'Sports Complex',
      description: 'Multi-sport facilities for physical development',
      image: 'https://images.uniapply.com/uploads/college/image/500/7054/Sport1_210123_211305.jpg',
      alt: 'Sports complex at Fortune World School'
    },
    {
      icon: Heart,
      title: 'Infirmary',
      description: '24/7 medical care with trained staff',
      image: 'https://fortuneworldschool.com/assets/web/images/health-care-1.jpeg',
      alt: 'Medical infirmary at Fortune World School'
    },
    {
      icon: Bus,
      title: 'School Transport',
      description: 'Safe and comfortable transportation',
      image: 'https://fortuneworldschool.com/assets/web/images/pages/trans-1.jpg',
      alt: 'Front elevation of Fortune World School, Noida'
    },
    {
      icon: Utensils,
      title: 'Cafeteria',
      description: 'Nutritious meals and healthy snacks',
      image: 'https://fortuneworldschool.com/assets/web/images/pages/cafe-1.jpg',
      alt: 'School cafeteria at Fortune World School'
    },
  ];

  return (
    <section id="facilities" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">World-Class Facilities</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our 4-acre campus is equipped with modern facilities to support every aspect of student development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-school-blue/20 group-hover:bg-school-blue/40 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <facility.icon className="text-school-blue" size={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-school-blue mb-2">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
