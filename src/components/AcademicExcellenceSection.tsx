
import React from 'react';
import { BookOpen, Lightbulb, Users, Heart, Target, CheckCircle } from 'lucide-react';

const AcademicExcellenceSection = () => {
  const skills = [
    {
      icon: Lightbulb,
      title: 'Creativity',
      color: 'bg-purple-500',
    },
    {
      icon: Target,
      title: 'Critical Thinking',
      color: 'bg-blue-500',
    },
    {
      icon: Users,
      title: 'Communication',
      color: 'bg-green-500',
    },
    {
      icon: Heart,
      title: 'Collaboration',
      color: 'bg-pink-500',
    },
  ];

  const innovativeApproaches = [
    "'Dhyana' meditative writing with music",
    "Assessment of pre-requisite skills",
    "Inclusive education for differently abled",
    "Customized curriculum and pedagogies"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-school-beige/20 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-school-red">Academic Excellence</h2>
          <div className="w-24 h-1 bg-school-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            CBSE-affiliated curriculum designed to develop 21st-century skills and competencies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Student-Centered Pedagogies */}
          <div className="bg-gradient-to-br from-school-red to-red-600 rounded-2xl p-8 text-white shadow-xl hover-lift">
            <BookOpen className="text-white mb-6" size={48} />
            <h3 className="text-2xl font-bold mb-4">Student-Centered Pedagogies</h3>
            <p className="text-red-100">
              Our teaching methodologies focus on individual attention to identify each student's strengths and challenges, helping them develop their unique identities while collaborating to bring out their best.
            </p>
          </div>

          {/* The 4Cs of 21st Century Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-school-red">The 4Cs of 21st Century Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover-lift transition-all duration-300 shadow-lg border border-school-beige/30"
                >
                  <div className={`${skill.color} rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3`}>
                    <skill.icon className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700">{skill.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Innovative Approaches */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-school-beige/30">
            <div className="flex items-center mb-6">
              <Lightbulb className="text-school-red mr-3" size={32} />
              <h3 className="text-2xl font-bold text-school-red">Innovative Approaches</h3>
            </div>
            <div className="space-y-3">
              {innovativeApproaches.map((approach, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mr-3 mt-2 ${
                    index === 0 ? 'bg-yellow-400' : 
                    index === 1 ? 'bg-green-400' : 
                    index === 2 ? 'bg-blue-400' : 'bg-purple-400'
                  }`}></div>
                  <p className="text-gray-700">{approach}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment & Evaluation */}
          <div className="beige-gradient rounded-2xl p-8 shadow-xl border border-school-beige">
            <h3 className="text-2xl font-bold mb-4 text-school-red">Assessment & Evaluation</h3>
            <p className="text-gray-700">
              Our assessment methods are integrated into the teaching-learning process, helping evaluate competencies across various skills while maintaining a student-friendly approach that promotes growth and learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicExcellenceSection;
