
import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = ['All', 'Campus Life', 'Annual Day', 'Field Trips', 'Sports Day'];

  const galleryItems = [
    { category: 'Campus Life', image: 'https://d3bat55ebwjhsf.cloudfront.net/schools/cover/988/user_fortuneworldschool/2021-08-30.jpg', caption: 'School facade view' },
    { category: 'Campus Life', image: 'https://www.edustoke.com/assets/uploads-new/e66cf84e-8660-4b56-be0a-30b444ef951e.jpeg', caption: 'Students in classroom' },
    { category: 'Annual Day', image: 'https://delhiworldschool.com/wp-content/uploads/2025/01/annual13-1.png', caption: 'Annual Day Performance' },
    { category: 'Field Trips', image: 'https://media.fortuneindia.com/fortune-india/import/2024-10-09/mia8jwsk/University.jpg?w=640&auto=format,compress&fit=max&q=70', caption: 'Educational Visit' },
    { category: 'Sports Day', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', caption: 'Athletic Competition' },
    { category: 'Campus Life', image: 'https://fortuneworldschool.com/assets/web/images/3.jpg' },
    { category: 'Annual Day', image: 'https://i.ibb.co/QFX1Bvsk/487150596-1067804302035931-58532030792832080-n.jpg', caption: 'Award Ceremony' },
    { category: 'Sports Day', image: 'https://sanfortworldschool.com/wp-content/uploads/2024/02/IMG_4470-1024x683.jpg', caption: 'Victory Celebration' },
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">Gallery</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore the vibrant life at Fortune World School through our photo gallery.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-school-blue text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-school-yellow hover:text-school-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover-lift cursor-pointer"
              onClick={() => setLightboxImage(item.image)}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={lightboxImage}
              alt="Gallery item"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
