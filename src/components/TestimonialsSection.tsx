
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Mrs. Priyanka Gupta',
      role: 'Parent',
      quote: 'Fortune World School has been instrumental in shaping my daughter\'s character. The teachers are dedicated and the environment is nurturing.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Rahul Sharma',
      role: 'Alumni (Class of 2022)',
      quote: 'The education I received here prepared me well for engineering college. The faculty\'s support and modern teaching methods made all the difference.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Ananya Patel',
      role: 'Current Student (Class XI)',
      quote: 'I love the co-curricular activities here. The school has helped me discover my passion for music and provided platforms to showcase my talent.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Mr. Vikash Kumar',
      role: 'Parent',
      quote: 'The holistic approach to education at Fortune World School is commendable. My son has grown both academically and personally.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Reduced from 5000ms to 8000ms for slower auto-scroll

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-red mb-4">What Our Community Says</h2>
          <div className="w-24 h-1 bg-school-beige mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from our parents, students, and alumni about their experience at Fortune World School.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <Quote className="text-school-beige mb-6" size={48} />
            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="flex items-center">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="text-xl font-bold text-school-red">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-school-red text-white p-3 rounded-full hover:bg-school-red/90 transition-colors duration-300 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-school-red text-white p-3 rounded-full hover:bg-school-red/90 transition-colors duration-300 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator - Fixed visibility */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 border-2 ${
                  index === currentIndex 
                    ? 'bg-school-red border-school-red' 
                    : 'bg-transparent border-school-red hover:bg-school-red/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
