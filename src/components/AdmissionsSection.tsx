
import React from 'react';
import { CheckCircle, Calendar, Users, DollarSign } from 'lucide-react';

const AdmissionsSection = () => {
  const admissionSteps = [
    { step: 1, title: 'Enquiry', description: 'Contact our admissions office' },
    { step: 2, title: 'School Tour', description: 'Visit our campus and facilities' },
    { step: 3, title: 'Registration', description: 'Submit application form and documents' },
    { step: 4, title: 'Assessment', description: 'Age-appropriate evaluation' },
    { step: 5, title: 'Admission', description: 'Welcome to Fortune World School!' },
  ];

  const feeStructure = [
    { grade: 'Pre-Nursery', fee: '₹45,000' },
    { grade: 'Nursery - UKG', fee: '₹50,000' },
    { grade: 'Class I - V', fee: '₹55,000' },
    { grade: 'Class VI - VIII', fee: '₹60,000' },
    { grade: 'Class IX - X', fee: '₹65,000' },
    { grade: 'Class XI - XII', fee: '₹70,000' },
  ];

  return (
    <section id="admissions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-4">Admissions</h2>
          <div className="w-24 h-1 bg-school-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join our family of excellence. We welcome bright minds ready to explore, learn, and grow.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-school-yellow/10 border-l-4 border-school-yellow rounded-lg p-6 mb-12">
          <div className="flex items-center mb-2">
            <Calendar className="text-school-blue mr-2" size={24} />
            <h3 className="text-xl font-bold text-school-blue">Important Dates</h3>
          </div>
          <p className="text-gray-700">
            <strong>Admissions Open:</strong> December 1, 2024 | <strong>Last Date:</strong> March 15, 2025
          </p>
        </div>

        {/* Admission Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-school-blue mb-8 text-center">Admission Process</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {admissionSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-school-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-school-blue mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-school-blue/30 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Eligibility Criteria */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-school-blue mb-6 flex items-center">
              <Users className="mr-2" />
              Eligibility Criteria
            </h3>
            <div className="space-y-4">
              {[
                'Pre-Nursery: 2.5 - 3 years',
                'Nursery: 3 - 4 years',
                'LKG: 4 - 5 years',
                'UKG: 5 - 6 years',
                'Class I: 6 - 7 years',
                'Other classes: Previous grade completion',
              ].map((criteria, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-school-yellow mr-3" size={20} />
                  <span className="text-gray-700">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Structure */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-school-blue mb-6 flex items-center">
              <DollarSign className="mr-2" />
              Fee Structure (Annual)
            </h3>
            <div className="space-y-3">
              {feeStructure.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                  <span className="font-medium text-gray-700">{item.grade}</span>
                  <span className="font-bold text-school-blue">{item.fee}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              *Fees include tuition, books, and basic activities. Transport charges separate.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-school-blue text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
