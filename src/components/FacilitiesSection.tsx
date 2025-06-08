
import React from 'react';
import { GraduationCap, BookOpen, Users, Bus, Utensils, Heart } from 'lucide-react';

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: GraduationCap,
      title: 'Smart Classrooms',
      description: 'Digital boards and modern learning technology',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    },
    {
      icon: BookOpen,
      title: 'Science & Robotics Labs',
      description: 'State-of-the-art laboratories for hands-on learning',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
    },
    {
      icon: BookOpen,
      title: 'Library',
      description: 'Extensive collection of books and digital resources',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
    {
      icon: Users,
      title: 'Sports Complex',
      description: 'Multi-sport facilities for physical development',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop',
    },
    {
      icon: Heart,
      title: 'Infirmary',
      description: '24/7 medical care with trained staff',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    },
    {
      icon: Bus,
      title: 'School Buses',
      description: 'Safe and comfortable transportation',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
    },
    {
      icon: Utensils,
      title: 'Cafeteria',
      description: 'Nutritious meals and healthy snacks',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    },
  ];

  return (
    <section id="facilities" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">World-Class Facilities</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our campus is equipped with modern facilities to support every aspect of student development.
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
                  alt={facility.title}
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
