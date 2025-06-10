
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const PrincipalMessageModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    window.addEventListener('openPrincipalMessage', handleOpenModal);
    return () => window.removeEventListener('openPrincipalMessage', handleOpenModal);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-school-red text-center mb-4">
            Principal's Message
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Principal Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <img
              src="https://fortuneworldschool.com/assets/web/images/principal.jpg"
              alt="Principal Sonal Srivastava"
              className="w-32 h-32 rounded-full object-cover border-4 border-school-beige shadow-lg"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-school-red mb-2">Sonal Srivastava</h2>
              <p className="text-lg text-gray-600 mb-3">Principal</p>
              <p className="text-base italic text-school-red font-medium">
                "The whole purpose of education is to turn mirrors into windows." – Sydney J. Harris
              </p>
            </div>
          </div>

          {/* Message Content */}
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Welcome to Fortune World School! Inspired by the words of Sydney J. Harris, we believe that education should be a window to new vistas and new opportunities for each child. Being the Principal of this school, I am enthusiastic about sharing with you how we strive to make learning a rewarding experience beyond the four walls of the classroom.
            </p>

            <p>
              At Fortune World School, it is our endeavour to create an environment in which education would be the leading doorway to wider horizons. We are committed to providing a stimulating, invigorating, and supportive learning environment that will help foster inquiry, creativity, critical thinking, and lifelong learning among students. Our objective is to transform "mirrors" of knowledge into "windows" that open up a vista of opportunities.
            </p>

            <p>
              Our curriculum is intended to inspire and engage on a very high level of critical thinking, creativity, and solution-finding for real-life problems. Our highly esteemed faculty members-merchants of passion and experience in teaching-will ensure that each student travels his or her unique educational journey to be prepared and equipped to enter the future with confidence and curiosity.
            </p>

            <p>
              We also acknowledge the importance of growth and development through a more holistic approach. We support our academic programs with extracurricular activities, such as sports, arts, community service, and character-building activities, which further develop the many talents of our students.
            </p>

            <p>
              Fortune World School is inclusive and respectful, having welcomed students from different walks of life. We ensure the environment set forth is nurturing, where every child feels valued and well-equipped to work with his peers and build a strong supportive network that contributes toward his success.
            </p>

            <p>
              Thank you for being a part of the Fortune World School family. We look forward to a year that is full of discovery, growth, and achievement.
            </p>

            <div className="mt-6 pt-4 border-t border-school-beige">
              <p className="text-lg font-semibold text-school-red">Principal</p>
              <p className="text-lg font-bold text-school-red">Sonal Srivastava</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrincipalMessageModal;
