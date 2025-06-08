import React from 'react';
import { Calendar, Download, Tag } from 'lucide-react';
const EventsSection = () => {
  const events = [{
    title: 'International Yoga Day',
    date: 'June 21, 2025',
    description: 'Join us for a special yoga session celebrating International Yoga Day with students, teachers, and parents.',
    tags: ['#YogaDay', '#Wellness'],
    image: 'https://fortuneworldschool.com/uploads/gallery/category/17301843644.jpg'
  }, {
    title: 'Investiture Ceremony',
    date: 'May 16, 2025',
    description: 'Annual ceremony to invest the new student council with leadership responsibilities and honor badges.',
    tags: ['#Leadership', '#Ceremony'],
    image: 'https://fortuneworldschool.com/uploads/gallery/image/17474674488.jpeg'
  }, {
    title: 'Mother\'s Day Celebration',
    date: 'May 9, 2025',
    description: 'Special celebration honoring mothers with cultural performances and appreciation activities.',
    tags: ['#MothersDay', '#Cultural'],
    image: 'https://fortuneworldschool.com/uploads/gallery/category/17467922167.jpeg'
  }, {
    title: 'Annual Day 2024',
    date: 'December 14, 2024',
    description: 'Grand Annual Day celebration featuring cultural performances, awards ceremony, and student achievements.',
    tags: ['#AnnualDay', '#Cultural'],
    image: 'https://fortuneworldschool.com/uploads/gallery/image/17345948165.JPG'
  }];
  return <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">Events & News</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Stay updated with the latest happenings, events, and announcements from Fortune World School.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
              <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                  <Calendar size={16} className="text-school-blue mr-1" />
                  <span className="text-sm font-medium text-school-blue">{event.date}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-school-blue mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, tagIndex) => <span key={tagIndex} className="inline-flex items-center px-3 py-1 bg-school-yellow/20 text-school-blue text-sm rounded-full">
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>)}
                </div>
              </div>
            </div>)}
        </div>

        {/* Download Academic Calendar */}
        <div className="text-center">
          <a href="https://fortuneworldschool.com/assets/web/images/calendar.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-school-blue text-yellow rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
            <Download className="mr-2" size={20} />
            Download Academic Calendar
          </a>
        </div>
      </div>
    </section>;
};
export default EventsSection;
