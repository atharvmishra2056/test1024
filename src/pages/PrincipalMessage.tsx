
import React from 'react';
import DisclaimerHeader from '../components/DisclaimerHeader';
import Navigation from '../components/Navigation';
import BackToTop from '../components/BackToTop';

const PrincipalMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-school-beige/20 to-white">
      <DisclaimerHeader />
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-school-red mb-4">Principal's Message</h1>
              <div className="w-24 h-1 bg-school-red mx-auto"></div>
            </div>

            {/* Principal Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                <img
                  src="https://fortuneworldschool.com/assets/web/images/principal.jpg"
                  alt="Principal Sonal Srivastava"
                  className="w-48 h-48 rounded-full object-cover border-8 border-school-beige shadow-lg"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-school-red mb-2">Sonal Srivastava</h2>
                  <p className="text-xl text-gray-600 mb-4">Principal</p>
                  <p className="text-lg italic text-school-red font-medium">
                    "The whole purpose of education is to turn mirrors into windows." – Sydney J. Harris
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Welcome to Fortune World School! Inspired by the words of Sydney J. Harris, we believe that education should be a window to new vistas and new opportunities for each child. Being the Principal of this school, I am enthusiastic about sharing with you how we strive to make learning a rewarding experience beyond the four walls of the classroom.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  At Fortune World School, it is our endeavour to create an environment in which education would be the leading doorway to wider horizons. We are committed to providing a stimulating, invigorating, and supportive learning environment that will help foster inquiry, creativity, critical thinking, and lifelong learning among students. Our objective is to transform "mirrors" of knowledge into "windows" that open up a vista of opportunities.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Our curriculum is intended to inspire and engage on a very high level of critical thinking, creativity, and solution-finding for real-life problems. Our highly esteemed faculty members-merchants of passion and experience in teaching-will ensure that each student travels his or her unique educational journey to be prepared and equipped to enter the future with confidence and curiosity.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  We also acknowledge the importance of growth and development through a more holistic approach. We support our academic programs with extracurricular activities, such as sports, arts, community service, and character-building activities, which further develop the many talents of our students.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Fortune World School is inclusive and respectful, having welcomed students from different walks of life. We ensure the environment set forth is nurturing, where every child feels valued and well-equipped to work with his peers and build a strong supportive network that contributes toward his success.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  Thank you for being a part of the Fortune World School family. We look forward to a year that is full of discovery, growth, and achievement.
                </p>

                <div className="mt-8 pt-6 border-t border-school-beige">
                  <p className="text-xl font-semibold text-school-red">Principal</p>
                  <p className="text-xl font-bold text-school-red">Sonal Srivastava</p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <a
                href="/"
                className="inline-flex items-center px-8 py-4 bg-school-red text-white font-semibold rounded-full hover:bg-school-red/90 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default PrincipalMessage;
