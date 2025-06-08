import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  const quickLinks = [{
    name: 'Privacy Policy',
    href: '#'
  }, {
    name: 'Terms of Use',
    href: '#'
  }, {
    name: 'Sitemap',
    href: '#'
  }, {
    name: 'Academic Calendar',
    href: '#'
  }];
  const socialLinks = [{
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Instagram,
    href: '#',
    label: 'Instagram'
  }, {
    icon: Youtube,
    href: '#',
    label: 'YouTube'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }];
  return <footer className="bg-school-blue text-white">
      <div className="container mx-auto px-4 py-12 bg-orange-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-school-yellow rounded-full flex items-center justify-center">
                <span className="text-school-blue font-bold text-xl">FW</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Fortune World School</h3>
                <p className="text-blue-200">Excellence in Education</p>
              </div>
            </div>
            <p className="text-blue-200 mb-4">
              Empowering young minds since 2012 with quality education, moral values, and global vision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-blue-200 hover:text-school-yellow transition-colors duration-300">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">Sector 15, Noida, UP - 201301</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">info@fortuneworldschool.edu.in</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => <a key={index} href={social.href} aria-label={social.label} className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-school-yellow hover:text-school-blue transition-all duration-300 transform hover:scale-110">
                  <social.icon size={20} />
                </a>)}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm">
            <p>&copy; 2024 Fortune World School. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="font-semibold text-school-yellow">AI Summer Camp Project</p>
              <p>This website was built as part of the TOI Summer Camp for Students</p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;