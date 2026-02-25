
import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { BrandAsset } from '../types';

interface AssetModalProps {
  asset: BrandAsset | null;
  onClose: () => void;
  onGetStarted: () => void;
}

// --- EXTRACTED COMPONENTS TO PREVENT RE-RENDERING GLITCHES ---

const ModalBackdrop = () => (
  <div
    className="fixed inset-0 z-0 bg-black/95 backdrop-blur-xl animate-fade-in"
    aria-hidden="true"
  />
);

const ModalCloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed top-6 right-6 z-[120] p-3 bg-white/5 rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 group backdrop-blur-md animate-fade-in"
  >
    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
  </button>
);

const ModalWrapper = ({ children, onClose, hideCloseButton }: { children?: React.ReactNode; onClose: () => void; hideCloseButton?: boolean }) => (
  <div
    className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden"
  >
    <ModalBackdrop />
    {!hideCloseButton && <ModalCloseButton onClick={onClose} />}
    <div
      className="min-h-full w-full flex items-center justify-center p-4 md:p-8 relative z-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  </div>
);

const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose, onGetStarted }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  useEffect(() => {
    if (asset) {
      // Lock scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [asset]);

  if (!asset) return null;

  const formatLabel = (str: string) => str.replace(/-/g, ' ').toUpperCase();

  // --- PREMIUM VIEW FOR VISUALS (TRANSFORMATION TEMPLATE) ---
  if (asset.module === 'visuals') {
    // Fallback if no variations
    const outputs = asset.outputVariations && asset.outputVariations.length >= 2
      ? asset.outputVariations
      : [asset.imageUrl, asset.imageUrl, asset.imageUrl];

    // Ensure we have exactly 3 outputs for the specific layout
    const displayOutputs = outputs.slice(0, 3);
    while (displayOutputs.length < 3) {
      displayOutputs.push(asset.imageUrl);
    }

    return (
      <ModalWrapper onClose={onClose} hideCloseButton={!!fullScreenImage}>
        {/* Removed animate-modal-pop from container for progressive reveal on children */}
        <div className="relative w-full max-w-[95vw] flex flex-col md:flex-row gap-6 md:gap-4 h-auto md:h-[80vh] origin-center">

          {/* 1. INPUT IMAGE (Left - Gray Background) - Enters First */}
          <div
            className="relative w-full md:w-1/4 aspect-[4/5] md:aspect-auto md:h-full bg-brand-gray/50 rounded-3xl overflow-hidden border border-white/5 flex flex-col items-center justify-center group animate-modal-pop opacity-0"
            style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
          >
            {/* Blurred Background Fill for Input */}
            {asset.inputImageUrl && (
              <div className="absolute inset-0 z-0">
                <img src={asset.inputImageUrl} className="w-full h-full object-cover blur-xl opacity-30 scale-110" alt="" />
              </div>
            )}

            {/* Label Overlay */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <span className="px-6 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white/60">
                Input
              </span>
            </div>

            {asset.inputImageUrl && (
              <img
                src={asset.inputImageUrl}
                alt="Original Input"
                className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-cinematic hover:scale-105 cursor-zoom-in"
                onClick={() => setFullScreenImage(asset.inputImageUrl)}
              />
            )}
          </div>

          {/* 2. OUTPUTS CONTAINER (Right - 3/4 width) - Unified */}
          <div
            className="relative w-full md:w-3/4 aspect-[4/5] md:aspect-auto md:h-full bg-brand-gray/30 rounded-3xl overflow-hidden border border-white/5 flex flex-col items-center justify-center group animate-modal-pop opacity-0"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            {/* Unified Blurred Background (using first image as base) */}
            <div className="absolute inset-0 z-0">
              <img src={displayOutputs[0]} className="w-full h-full object-cover blur-2xl opacity-20 scale-110" alt="" />
            </div>

            {/* Grid of 3 Images */}
            <div className="relative z-10 w-full h-full p-4 md:p-8 grid grid-cols-3 gap-4 md:gap-6 items-center">
              {displayOutputs.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02] hover:z-20 cursor-zoom-in"
                  onClick={() => setFullScreenImage(src)}
                >
                  <img
                    src={src}
                    alt={`Output ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Single Label Overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="px-5 py-2 bg-brand-accent/90 text-brand-black backdrop-blur-md rounded-full flex items-center gap-2 shadow-lg shadow-black/20 scale-75 md:scale-90">
                <Sparkles size={10} className="fill-brand-black" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Output</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- FULL SCREEN IMAGE OVERLAY --- */}
        {fullScreenImage && (
          <div
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-fade-in"
            onClick={() => setFullScreenImage(null)}
          >
            <button
              onClick={() => setFullScreenImage(null)}
              className="absolute top-8 right-8 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-[210] border border-white/20 flex items-center justify-center"
            >
              <X size={32} />
            </button>

            <img
              src={fullScreenImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain shadow-2xl animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            />

          </div>
        )}
      </ModalWrapper>
    );
  }

  // --- PREMIUM VIEW FOR VIDEOS (CINEMA TEMPLATE) AND POSTERS (EDITORIAL) ---
  if (asset.module === 'videos' || asset.module === 'posters') {
    const isVideo = asset.module === 'videos';
    const isPoster = asset.module === 'posters';

    // Logic: Hide the sidebar Input card if it's a poster OR if it's a video (since we don't have separate input footage)
    // This leaves the sidebar strictly for text content in these modes.
    const showInputCard = !isPoster && !isVideo;

    return (
      <ModalWrapper onClose={onClose}>
        <div className="relative w-full max-w-[95vw] md:max-w-[90vw] flex flex-col md:flex-row justify-center gap-8 h-auto md:h-[85vh] animate-modal-pop origin-center">

          {/* 1. MAIN MEDIA DISPLAY (Left / Top) */}
          <div
            className={`relative w-full md:w-auto md:h-full aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 group mx-auto md:mx-0 flex items-center justify-center shrink-0 max-h-[60vh] md:max-h-full`}
          >
            {isVideo ? (
              asset.videoUrl ? (
                <video
                  src={asset.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  onContextMenu={(e) => e.preventDefault()}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                asset.imageUrl ? (
                  <img
                    src={asset.imageUrl}
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-gray flex items-center justify-center">
                    <span className="text-white/20 font-mono text-xs uppercase tracking-widest">Video Loading...</span>
                  </div>
                )
              )
            ) : (
              <img
                src={asset.imageUrl}
                alt={asset.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Decorative Overlay */}
            <div className="absolute top-4 left-4 z-10">
              <div className={`px-4 py-1 ${isVideo ? 'bg-red-600/90' : 'bg-brand-accent/90 text-brand-black'} text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 backdrop-blur-md shadow-lg`}>
                {isVideo ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live Render
                  </>
                ) : (
                  <>
                    <Sparkles size={10} className="fill-brand-black" />
                    AI Render
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 2. SIDEBAR (Right / Bottom) */}
          <div
            className={`w-full md:w-[400px] flex-shrink-0 flex flex-col gap-4 h-auto md:h-full`}
          >
            {/* Input Image Card - Hidden for Posters AND Videos to avoid redundancy */}
            {showInputCard && (
              <div className="flex-[2] bg-brand-gray/50 border border-white/10 rounded-3xl p-5 flex flex-col gap-3 relative overflow-hidden group min-h-[250px] md:min-h-[300px]">
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Input</span>
                  <div className="w-2 h-2 rounded-full bg-brand-accent/50"></div>
                </div>
                <div className="relative flex-1 w-full rounded-xl overflow-hidden bg-black/50">
                  <img
                    src={asset.inputImageUrl || asset.imageUrl}
                    alt="Input Source"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Details Card */}
            <div className={`flex-1 bg-brand-gray/30 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col backdrop-blur-sm justify-between relative overflow-hidden`}>

              {/* Decorative Orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Title Section */}
                <div className="mb-6">
                  <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-[1.1] mb-2">{asset.title}</h2>
                  {isPoster && (
                    <p className="text-brand-accent/80 font-mono text-xs uppercase tracking-widest">{asset.subCategory}</p>
                  )}
                </div>

                {/* Description Section - Visible for Editorial (Posters) and Videos now */}
                <div className="space-y-4 mb-auto">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Description</h3>
                  <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={onGetStarted}
                    className="w-full py-5 bg-white text-black rounded-xl font-bold hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 group uppercase tracking-widest text-xs md:text-sm shadow-lg hover:shadow-brand-accent/20"
                  >
                    <span>GET STARTED</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ModalWrapper>
    );
  }

  // --- STANDARD VIEW FOR OTHER MODULES (Fallback) ---
  return (
    <ModalWrapper onClose={onClose}>
      <div className="relative w-full max-w-6xl md:h-[90vh] h-auto bg-brand-dark rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 animate-modal-pop origin-center">

        {/* Media Section (Left/Top) */}
        <div className="w-full md:w-2/3 h-[50vh] md:h-full bg-brand-black flex items-center justify-center relative group overflow-hidden">
          {/* Blurred Background to Fill Ratio */}
          <div className="absolute inset-0 z-0">
            <img src={asset.imageUrl} className="w-full h-full object-cover blur-3xl opacity-30 scale-110" alt="" />
          </div>

          <img
            src={asset.imageUrl}
            alt={asset.title}
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Details Section (Right/Bottom) */}
        <div className="w-full md:w-1/3 md:h-full p-8 flex flex-col border-l border-white/5 bg-brand-dark relative z-20">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-accent text-brand-black rounded-full">
                {formatLabel(asset.module)}
              </span>
              {asset.subCategory && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20 rounded-full text-white/70">
                  {formatLabel(asset.subCategory)}
                </span>
              )}
              {asset.style && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20 rounded-full text-white/70">
                  {formatLabel(asset.style)}
                </span>
              )}
            </div>

            <h2 className="font-sans font-bold text-3xl text-white mb-4">{asset.title}</h2>
            <p className="text-white/70 font-light leading-relaxed mb-8 text-sm md:text-base">
              {asset.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3 pt-6 border-t border-white/5">
            <button
              onClick={onGetStarted}
              className="w-full py-4 px-4 bg-brand-accent text-brand-black rounded-xl font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 group"
            >
              <span>GET STARTED</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AssetModal;
