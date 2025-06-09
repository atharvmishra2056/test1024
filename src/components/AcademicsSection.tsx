
import React from 'react';
import { BookOpen, Download, Award } from 'lucide-react';

const AcademicsSection = () => {
  const streams = [
    {
      title: 'Science Stream',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
      icon: '🔬'
    },
    {
      title: 'Commerce Stream',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
      icon: '💼'
    },
    {
      title: 'Humanities',
      subjects: ['History', 'Geography', 'Political Science', 'Psychology', 'English'],
      icon: '📚'
    }
  ];

  const achievements = [
    'Pre-Nursery to XII comprehensive education',
    'CBSE-affiliated curriculum excellence',
    'Critical thinking and creativity focus',
    'Real-life problem solving approach'
  ];

  return (
    <section id="academics" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-red mb-4">Academics</h2>
          <div className="w-24 h-1 bg-school-beige mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our curriculum is intended to inspire and engage on a very high level of critical thinking, creativity, 
            and solution-finding for real-life problems. We offer comprehensive education from Pre-Nursery to XII.
          </p>
        </div>

        {/* Subject Streams */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {streams.map((stream, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="text-4xl mb-4 text-center">{stream.icon}</div>
              <h3 className="text-2xl font-bold text-school-red mb-4 text-center">{stream.title}</h3>
              <ul className="space-y-2">
                {stream.subjects.map((subject, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <BookOpen size={16} className="text-school-beige mr-2" />
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-school-red mb-6 text-center flex items-center justify-center">
            <Award className="mr-2" />
            Our Academic Excellence
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center text-gray-700 bg-gray-50 rounded-lg p-4">
                <div className="w-2 h-2 bg-school-beige rounded-full mr-3"></div>
                {achievement}
              </div>
            ))}
          </div>
        </div>

        {/* Download Links */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-school-red mb-6">Download Resources</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Syllabus', 'Exam Pattern', 'CBSE Guidelines', 'Academic Calendar'].map((item, index) => (
              <button
                key={index}
                className="flex items-center px-6 py-3 bg-school-red text-white rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                <Download size={20} className="mr-2" />
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
