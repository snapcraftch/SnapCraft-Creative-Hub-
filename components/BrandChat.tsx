import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { ChatMessage } from '../types';

const BrandChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Initial message updated to be generic
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Snapcraft. How can we help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // Simulate a brief delay for realism
    setTimeout(() => {
        // We use a special marker to render the rich text response
        const responseText = "STATIC_RESPONSE_MARKER";
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        setIsLoading(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.role === 'model' && msg.text === "STATIC_RESPONSE_MARKER") {
        return (
            <div className="space-y-4 text-sm leading-relaxed">
                <p className="font-medium">Welcome to SNAPCRAFT CREATIVE HUB —</p>
                <p>Where creativity meets AI speed. ⚡️</p>
                <p>Whether you need high-end product shots, model visuals, ad videos, or brand-ready designs, you’re in the right place.</p>
                <p>Share your requirement and watch us craft it in seconds.</p>
                <div className="pt-2 space-y-2">
                    <p className="flex flex-wrap items-center gap-x-2">
                        <span>📸 Instagram:</span>
                        <a 
                            href="https://www.instagram.com/snapcraft_creative_hub?igsh=eGhlaWVieGFzM216" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-brand-accent hover:text-white transition-colors underline decoration-brand-accent/30 underline-offset-4"
                        >
                            snapcraft_creative_hub
                        </a>
                    </p>
                    <p className="flex flex-wrap items-center gap-x-2">
                        <span>📩 Email:</span>
                        <a 
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=snapcraft.ch@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-accent hover:text-white transition-colors underline decoration-brand-accent/30 underline-offset-4"
                        >
                            snapcraft.ch@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        );
    }
    return msg.text;
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)] interactive group ${
          isOpen ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100'
        }`}
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Window */}
      <div
        className={`fixed bottom-8 right-8 w-[350px] md:w-[400px] h-[600px] flex flex-col overflow-hidden transition-all duration-500 z-50 origin-bottom-right rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/80 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center border border-brand-accent/30 shadow-[0_0_15px_rgba(212,176,140,0.2)]">
               <User className="w-4 h-4 text-brand-accent" />
            </div>
            <div>
                <h3 className="font-serif italic text-lg text-white leading-none tracking-wide">Support</h3>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[9px] text-white/50 uppercase tracking-wider font-mono">Online</p>
                </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/30 hover:text-white transition-colors interactive p-2 hover:bg-white/10 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[85%] p-4 text-sm leading-relaxed relative shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-white text-black rounded-2xl rounded-tr-sm font-medium'
                    : 'bg-white/5 text-white/90 border border-white/10 rounded-2xl rounded-tl-sm backdrop-blur-sm'
                }`}
              >
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                <span className="w-1 h-1 bg-brand-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1 h-1 bg-brand-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 h-1 bg-brand-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-brand-accent/30 focus:bg-white/10 transition-all placeholder-white/20 font-light"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-accent/70 hover:text-brand-accent disabled:opacity-30 transition-colors interactive hover:bg-white/5 rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandChat;