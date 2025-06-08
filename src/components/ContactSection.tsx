
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    mobile: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });
    setFormData({ name: '', class: '', mobile: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/HtPq3F5AaBwnjepNA', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-school-red mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-school-beige mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with us for admissions, inquiries, or any other information you need.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-school-red mb-8">Get In Touch</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className="text-school-beige mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-school-red mb-1">Address</h4>
                  <p className="text-gray-700">
                    Sector 105, Noida<br />
                    Uttar Pradesh - 201301<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-school-beige mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-school-red mb-1">Phone</h4>
                  <p className="text-gray-700">+91 98765 43210</p>
                  <p className="text-gray-700">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-school-beige mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-school-red mb-1">Email</h4>
                  <p className="text-gray-700">admissions@fortuneworldschool.edu.in</p>
                  <p className="text-gray-700">info@fortuneworldschool.edu.in</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-school-beige mr-4 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-school-red mb-1">Office Hours</h4>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM to 2:30 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM to 12:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8758087866827!2d77.38848931548024!3d28.645469382414863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzQ3LjciTiA3N8KwMjMnMjQuNiJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fortune World School Location"
              ></iframe>
              <div className="p-4 bg-white">
                <button
                  onClick={openGoogleMaps}
                  className="flex items-center text-school-red hover:text-school-red/80 transition-colors font-medium"
                >
                  <ExternalLink className="mr-2" size={16} />
                  View on Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-school-red mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                  Class Interested In
                </label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent transition-colors"
                >
                  <option value="">Select a class</option>
                  <option value="pre-nursery">Pre-Nursery</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="class-1-5">Class I - V</option>
                  <option value="class-6-8">Class VI - VIII</option>
                  <option value="class-9-10">Class IX - X</option>
                  <option value="class-11-12">Class XI - XII</option>
                </select>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent transition-colors resize-none"
                  placeholder="Your message or inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-school-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-school-red/90 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
