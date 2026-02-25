
import React, { useEffect } from 'react';
import { X, Sparkles, ArrowRight, Instagram, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lockScroll?: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lockScroll = true }) => {

  useEffect(() => {
    if (isOpen) {
      if (lockScroll) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (lockScroll) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (lockScroll) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, lockScroll]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop for overlay - Fade In From Black */}
        <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl animate-fade-in"
            onClick={onClose}
        />
        
        <div className="relative w-full max-w-md bg-brand-dark border border-white/10 rounded-3xl p-8 flex flex-col items-center shadow-2xl overflow-hidden animate-modal-pop origin-center">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>

            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors z-10"
            >
                <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6 text-brand-accent shadow-[0_0_20px_rgba(212,176,140,0.1)]">
                <Sparkles size={28} />
            </div>

            <h3 className="text-3xl font-serif text-white italic mb-2">Let's Create</h3>
            <p className="text-white/50 text-center text-sm font-light mb-8 leading-relaxed">
                Ready to transform your brand? Connect with us directly to start your project.
            </p>

            <div className="w-full space-y-3">
                <a 
                    href="https://www.instagram.com/snapcraft_creative_hub?igsh=eGhlaWVieGFzM216" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black hover:border-transparent hover:scale-[1.02] transition-all duration-300 group"
                >
                    <div className="flex items-center gap-3">
                        <Instagram size={20} className="text-white/70 group-hover:text-black transition-colors" />
                        <span className="font-mono text-xs uppercase tracking-widest">Instagram</span>
                    </div>
                    <ArrowRight size={16} className="text-white/30 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </a>
                
                <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=snapcraft.ch@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black hover:border-transparent hover:scale-[1.02] transition-all duration-300 group"
                >
                    <div className="flex items-center gap-3">
                        <Mail size={20} className="text-white/70 group-hover:text-black transition-colors" />
                        <span className="font-mono text-xs uppercase tracking-widest">Email</span>
                    </div>
                    <ArrowRight size={16} className="text-white/30 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </a>
            </div>
        </div>
    </div>
  );
};

export default ContactModal;
