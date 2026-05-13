import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-black px-8 py-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 mt-auto">
      <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 md:mb-0">
        <Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link>
        <Link to="/guidelines" className="hover:text-black transition-colors">Library Guidelines</Link>
        <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
      </div>

      <div className="text-[10px] font-bold uppercase italic text-gray-800">
        © 2024 KLE Library Management 
        <span className="text-f1-red ml-2 font-black tracking-tighter">PRO SERIES</span>
      </div>
    </footer>
  );
}
