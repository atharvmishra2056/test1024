
import React from 'react';

const CoactivitiesSection = () => {
  const activities = [
    { name: 'Music', icon: '🎵', color: 'bg-purple-100 text-purple-600' },
    { name: 'Theatre', icon: '🎭', color: 'bg-pink-100 text-pink-600' },
    { name: 'Dance', icon: '💃', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Art', icon: '🎨', color: 'bg-orange-100 text-orange-600' },
    { name: 'Debate', icon: '🗣️', color: 'bg-green-100 text-green-600' },
    { name: 'NCC', icon: '🎖️', color: 'bg-red-100 text-red-600' },
    { name: 'Yoga', icon: '🧘', color: 'bg-teal-100 text-teal-600' },
    { name: 'Shooting', icon: '🎯', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Taekwondo', icon: '🥋', color: 'bg-gray-100 text-gray-600' },
  ];

  const achievements = [
    { title: 'State Music Competition', award: '1st Place', year: '2024' },
    { title: 'Inter-School Drama Festival', award: 'Best Performance', year: '2024' },
    { title: 'District Sports Championship', award: 'Multiple Medals', year: '2023' },
    { title: 'National Art Exhibition', award: 'Special Recognition', year: '2023' },
  ];

  return (
    <section id="activities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">Co-curricular & Sports</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Beyond academics, we nurture talents in arts, sports, and cultural activities to develop well-rounded personalities.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`${activity.color} rounded-2xl p-6 text-center hover-lift cursor-pointer group`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {activity.icon}
              </div>
              <h3 className="font-semibold">{activity.name}</h3>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-school-blue mb-8 text-center">Our Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-school-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="font-bold text-school-blue mb-2">{achievement.title}</h4>
                <p className="text-school-yellow font-semibold">{achievement.award}</p>
                <p className="text-gray-500 text-sm">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoactivitiesSection;
