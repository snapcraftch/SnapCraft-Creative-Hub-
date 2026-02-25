
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { PlayCircle, Play, MoveHorizontal, ArrowRight, ArrowUpRight, Sparkles, Zap, Aperture, Circle, Instagram, Mail, ChevronDown, Check } from 'lucide-react';
import { ASSETS, HERO_IMAGES_COL_1, HERO_IMAGES_COL_2 } from './constants';
import { BrandAsset } from './types';
import AssetModal from './components/AssetModal';
import BrandChat from './components/BrandChat';
import ContactModal from './components/ContactModal';

// --- HELPER: Preloaded Video Item for Smooth Transitions ---
interface VideoItemProps {
    src?: string;
    poster?: string;
    isActive: boolean;
    className?: string;
    shouldReset?: boolean;
}

const VideoItem: React.FC<VideoItemProps> = ({
    src,
    poster,
    isActive,
    className,
    shouldReset = false
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isActive) {
            const playPromise = videoRef.current?.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay prevented or interrupted
                });
            }
        } else {
            videoRef.current?.pause();
            if (shouldReset && videoRef.current) {
                videoRef.current.currentTime = 0;
            }
        }
    }, [isActive, shouldReset]);

    return (
        <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            className={className}
        />
    );
};

// --- COMPONENT: BEFORE / AFTER SLIDER ---
interface BeforeAfterSliderProps {
    inputImage: string;
    outputImage: string;
    alt: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ inputImage, outputImage, alt }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isInteractive, setIsInteractive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef(50);
    const directionRef = useRef(1);

    const handleMove = useCallback((clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
            setSliderPosition(percent);
            positionRef.current = percent;
        }
    }, []);

    const toggleInteraction = () => {
        setIsInteractive(!isInteractive);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isInteractive) {
            handleMove(e.clientX);
        }
    };

    // Auto-animate
    useEffect(() => {
        const interval = setInterval(() => {
            if (isInteractive) return;

            let current = positionRef.current;
            const dir = directionRef.current;

            // Movement speed
            current += dir * 0.2;

            // Bounce bounds
            if (current > 65) directionRef.current = -1;
            if (current < 35) directionRef.current = 1;

            positionRef.current = current;
            setSliderPosition(current);
        }, 20);
        return () => clearInterval(interval);
    }, [isInteractive]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden rounded-lg select-none group ${isInteractive ? 'cursor-col-resize' : 'cursor-pointer'}`}
            onClick={toggleInteraction}
            onMouseMove={onMouseMove}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
            <img src={outputImage} alt={`${alt} After`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <img src={inputImage} alt={`${alt} Before`} className="absolute inset-0 w-full h-full object-cover max-w-none" />
            </div>

            {/* Slider Line */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-white z-20" style={{ left: `${sliderPosition}%` }}>
                <div className={`absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full border backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-colors ${isInteractive ? 'bg-brand-accent/20 border-brand-accent text-brand-accent' : 'bg-white/10 border-white/50 text-white'}`}>
                    <MoveHorizontal size={14} />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-white/60 text-[10px] uppercase tracking-widest font-mono">Raw Input</div>
            <div className="absolute bottom-6 right-6 px-3 py-1 bg-brand-accent text-brand-black text-[10px] uppercase tracking-widest font-mono font-bold">AI Rendered</div>
        </div>
    );
};

// --- SECTION: HERO (SPOTLIGHT & MARKETING CARDS) ---

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={heroRef} className="relative w-full min-h-screen overflow-hidden bg-brand-black flex items-center justify-center pt-20 lg:pt-0">

            {/* Spotlight Effect Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 176, 140, 0.15), transparent 40%)`,
                }}
            />

            {/* Content Container - Split Layout */}
            <div className="w-full h-full max-w-[1920px] mx-auto relative z-10 flex flex-col lg:flex-row">

                {/* --- LEFT SIDE: TEXT (60%) --- */}
                <div className="w-full lg:w-[60%] min-h-[50vh] lg:h-auto flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 lg:py-0 relative z-20">
                    <h1 className="text-5xl md:text-6xl lg:text-[7rem] font-serif text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 drop-shadow-2xl">
                        Future <br />
                        <span className="italic text-brand-accent">marketing</span> <br />
                        for your brand <br />
                        is here
                    </h1>

                    {/* Scroll Indicator (Positioned Bottom Right of Left Panel) */}
                    <div className="lg:absolute lg:bottom-12 lg:right-12 mt-12 lg:mt-0 flex flex-col items-start lg:items-center gap-4 cursor-pointer group" onClick={() => document.getElementById('visuals')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-light group-hover:text-brand-accent transition-colors duration-300">Enter into it</span>
                        <div className="w-8 h-12 rounded-full border border-white/30 flex justify-center pt-2 backdrop-blur-sm group-hover:border-brand-accent/60 transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <div className="w-1 h-1.5 bg-brand-accent rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: VISUALS AREA (40%) --- */}
                {/* This area strictly contains the image columns within the marked box boundaries */}
                <div className="hidden lg:flex w-[40%] h-[100vh] relative border-l border-white/5 bg-brand-black/20 backdrop-blur-sm overflow-hidden">

                    {/* Inner Padding Container */}
                    <div className="w-full h-full px-8 py-0 flex gap-6 justify-center relative">

                        {/* Gradient Masks */}
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-brand-black via-brand-black/90 to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent z-20 pointer-events-none"></div>

                        {/* COLUMN 1: Scrolling UP */}
                        <div className="w-1/2 h-full relative">
                            <div className="animate-marquee-vertical flex flex-col gap-6 w-full" style={{ animationDuration: '45s' }}>
                                {[...HERO_IMAGES_COL_1, ...HERO_IMAGES_COL_1].map((item, i) => (
                                    <div key={`col1-${i}`} className="relative w-full aspect-[3/4] flex-shrink-0 bg-brand-gray rounded-lg overflow-hidden border border-white/10 shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
                                        <img src={item.src} alt={item.label} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:grayscale-0" />

                                        {/* Card Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <h3 className="text-white font-serif italic text-2xl">{item.label}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 2: Scrolling DOWN */}
                        <div className="w-1/2 h-full relative">
                            <div className="animate-marquee-vertical-reverse flex flex-col gap-6 w-full" style={{ animationDuration: '50s' }}>
                                {[...HERO_IMAGES_COL_2, ...HERO_IMAGES_COL_2].map((item, i) => (
                                    <div key={`col2-${i}`} className="relative w-full aspect-[3/4] flex-shrink-0 bg-brand-gray rounded-lg overflow-hidden border border-white/10 shadow-2xl group transition-transform duration-700 hover:scale-[1.02]">
                                        <img src={item.src} alt={item.label} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:grayscale-0" />

                                        {/* Card Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <h3 className="text-white font-serif italic text-2xl">{item.label}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

// --- SECTION: ABOUT ---
const AboutSection = () => {
    return (
        <section id="about" className="relative py-20 bg-brand-black border-t border-white/5 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Title */}
                    <div className="lg:col-span-6 xl:col-span-6">
                        <div className="flex items-center gap-3 mb-8 text-brand-accent">
                            <Circle size={10} fill="currentColor" />
                            <span className="font-mono text-xs uppercase tracking-widest">Who We Are</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-8">
                            We bridge the gap between <span className="italic text-white/50">human artistry</span> and <span className="text-brand-accent">machine precision.</span>
                        </h2>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8 space-y-8 text-white/60 font-light leading-relaxed pt-4">
                        <p className="text-xl">
                            Snapcraft isn’t just another agency — we’re a digital forge where data meets design and creativity meets intelligence. With our proprietary AI models, we transform static ideas into dynamic, market-ready assets in seconds, empowering brands to move faster than ever.
                        </p>
                        <p className="text-xl">
                            From flatlay-to-model transformations and hyper-realistic product visuals to cinematic video generation, our suite delivers infinite scalability without sacrificing the soul, character, or craftsmanship of bespoke design. At Snapcraft, every pixel is engineered to elevate your brand, amplify your reach, and accelerate your growth.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SECTION: STATS ---
const StatsSection = () => {
    return (
        <section className="relative py-12 bg-brand-black border-t border-white/5 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Generated Assets', value: '2K+' },
                        { label: 'Rendering Time', value: '< 5s' },
                        { label: 'Active Brands', value: '50+' },
                        { label: 'Creative Styles', value: 'Infinite' }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center text-center hover:bg-white/5 p-6 rounded-xl transition-colors interactive cursor-default border border-transparent hover:border-white/5 group">
                            <h3 className="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:text-brand-accent transition-colors">{stat.value}</h3>
                            <p className="text-xs uppercase tracking-widest text-white/40 font-mono">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SECTION: VISUALS (TRANSFORMATION) ---
const VisualsSection = ({ onSelect }: { onSelect: (a: BrandAsset) => void }) => {
    const featured = ASSETS.find(a => a.id === 'v-g1') || ASSETS[0];
    const others = ASSETS.filter(a => a.module === 'visuals').slice(1, 7);

    // Split into two rows for the layout gap
    const row1 = others.slice(0, 3);
    const row2 = others.slice(3, 6);

    return (
        <section id="visuals" className="w-full bg-brand-dark relative py-20 border-t border-white/5">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white italic mb-4 leading-none">Transformation</h2>
                        <div className="flex items-center gap-3 text-brand-accent">
                            <Sparkles size={16} />
                            <span className="font-mono text-xs uppercase tracking-widest">Flatlay to Lifestyle Engine</span>
                        </div>
                    </div>
                    <p className="max-w-md text-white/50 text-sm font-light leading-relaxed lg:text-right">
                        Experience the power of context. Our AI takes simple product photography and hallucinates hyper-realistic environments.
                    </p>
                </div>

                {/* Main Interaction Area */}
                <div className="relative w-full h-[60vh] md:h-[80vh] mb-12 rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
                    {featured.inputImageUrl && (
                        <BeforeAfterSlider
                            inputImage={featured.inputImageUrl}
                            outputImage={featured.imageUrl}
                            alt={featured.title}
                        />
                    )}
                </div>

                {/* Sub Grid Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-8">
                    {row1.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="interactive group relative h-[250px] bg-brand-black overflow-hidden cursor-pointer hover:z-20 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out"
                        >
                            <img src={item.imageUrl} className="w-full h-full object-cover group-hover:opacity-100 transition-opacity duration-700" alt={item.title} />
                            <div className="absolute inset-0 flex flex-col justify-between p-6 bg-black/20 group-hover:bg-transparent transition-colors">
                                <div className="flex justify-end">
                                    <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                                </div>
                                <div>
                                    <span className="block text-white font-serif italic text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sub Grid Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {row2.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="interactive group relative h-[250px] bg-brand-black overflow-hidden cursor-pointer hover:z-20 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out"
                        >
                            <img src={item.imageUrl} className="w-full h-full object-cover group-hover:opacity-100 transition-opacity duration-700" alt={item.title} />
                            <div className="absolute inset-0 flex flex-col justify-between p-6 bg-black/20 group-hover:bg-transparent transition-colors">
                                <div className="flex justify-end">
                                    <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                                </div>
                                <div>
                                    <span className="block text-white font-serif italic text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SECTION: CINEMA MODE (UPDATED) ---
const CinemaSection = ({ onSelect }: { onSelect: (a: BrandAsset) => void }) => {
    const videos = ASSETS.filter(a => a.module === 'videos');
    const [currentVideo, setCurrentVideo] = useState(videos[0]);

    return (
        <section id="videos" className="w-full bg-brand-black relative py-12 lg:py-20 z-20 border-t border-white/5 overflow-hidden">
            {/* Ambient Background with cross-fading videos */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent z-10"></div>
                {videos.map((video) => (
                    <VideoItem
                        key={`bg-${video.id}`}
                        src={video.videoUrl}
                        isActive={currentVideo.id === video.id}
                        className={`absolute inset-0 w-full h-full object-cover filter blur-[80px] scale-110 transition-opacity duration-1000 ${currentVideo.id === video.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-10 lg:mb-20 gap-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white italic mb-4 leading-none">Cinema</h2>
                        <div className="flex items-center gap-3 text-brand-accent">
                            <Zap size={16} className="fill-brand-accent" />
                            <span className="font-mono text-xs uppercase tracking-widest">Motion Engine</span>
                        </div>
                    </div>
                    <p className="max-w-md text-white/50 text-sm font-light leading-relaxed lg:text-right">
                        High-fidelity video generation. Transform static concepts into dynamic cinematic experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* Left Side: Content List */}
                    <div className="flex flex-col w-full order-2 lg:order-1 lg:col-span-5">
                        {videos.map((video, index) => {
                            const isActive = currentVideo.id === video.id;
                            return (
                                <div
                                    key={video.id}
                                    onMouseEnter={() => setCurrentVideo(video)}
                                    onClick={() => onSelect(video)}
                                    className={`group cursor-pointer flex items-center justify-between border-b border-white/10 py-8 transition-all duration-500 ${index === 0 ? 'border-t' : ''}`}
                                >
                                    <div className="flex items-center gap-6 md:gap-8">
                                        <span className={`text-sm md:text-base font-mono transition-colors duration-500 ${isActive ? 'text-brand-accent' : 'text-white/20'}`}>
                                            0{index + 1}
                                        </span>
                                        <h3 className={`text-3xl md:text-5xl lg:text-6xl font-serif transition-all duration-500 ${isActive ? 'text-white italic translate-x-4' : 'text-white/30 group-hover:text-white/50'}`}>
                                            {video.title}
                                        </h3>
                                    </div>

                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-accent/50 flex items-center justify-center text-brand-accent transition-all duration-500 ${isActive ? 'opacity-100 scale-100 bg-brand-accent/10' : 'opacity-0 scale-75 -translate-x-4'}`}>
                                        <Play size={18} className="ml-0.5 fill-brand-accent" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side: Video Preview Card */}
                    <div className="order-1 lg:order-2 lg:col-span-7 w-full relative flex items-center justify-center lg:justify-center py-4 lg:py-0">
                        {/* Adjusted height constraints for responsiveness */}
                        <div className="relative w-full flex items-center justify-center lg:justify-center h-[60vh] md:h-[70vh] lg:h-[85vh]">
                            <div
                                className="relative h-full w-auto aspect-[9/16] bg-brand-gray rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer transition-transform duration-700 hover:scale-[1.02] shadow-brand-accent/5 mx-auto max-w-[90vw]"
                                onClick={() => onSelect(currentVideo)}
                            >
                                {/* Video Stack: We render all videos to avoid mount/unmount flash, using opacity to transition */}
                                {videos.map((video) => (
                                    <VideoItem
                                        key={`prev-${video.id}`}
                                        src={video.videoUrl}
                                        isActive={currentVideo.id === video.id}
                                        shouldReset={true} // Reset to start on hover for fresh preview
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${currentVideo.id === video.id ? 'opacity-90 group-hover:opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    />
                                ))}

                                {/* Gradient Overlays (z-20) */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
                                </div>

                                {/* Bottom Info Bar (z-30) */}
                                <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
                                    <div className="p-8 pb-6 bg-gradient-to-t from-black/95 to-transparent flex justify-between items-end">
                                        <div>
                                            <p className="text-brand-accent font-mono text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                                                Now Playing
                                            </p>
                                            {/* Text changes immediately, which is fine as video crossfades */}
                                            <h4 className="text-white font-serif italic text-3xl md:text-4xl">{currentVideo.title}</h4>
                                        </div>
                                        {/* Play Button Indicator */}
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-brand-accent group-hover:text-black group-hover:border-transparent transition-all duration-300">
                                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Progress Bar Animation */}
                                    <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 h-full w-full bg-brand-accent origin-left animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Center Play Button (Hidden by default, shown on hover) z-40 */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100 pointer-events-none">
                                    <div className="w-24 h-24 rounded-full bg-brand-accent/20 backdrop-blur-md flex items-center justify-center border border-brand-accent/40 text-white">
                                        <span className="font-serif italic text-lg tracking-wider">View</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SECTION: CREATIVE PROCESS ---
const CreativeProcessSection = () => {
    return (
        <section id="process" className="relative w-full py-24 bg-brand-dark border-t border-white/5 z-10 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Our <span className="italic text-brand-accent">Creative Process</span></h2>
                    <p className="text-white/50 max-w-2xl font-light">A structured roadmap ensuring your brand's vision is executed with precision and strategic depth.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-[1px] bg-white/10 z-0"></div>

                    {[
                        {
                            step: '01',
                            title: 'Proof of Concept (POC)',
                            description: 'You share your product input. We craft a premium visual sample that defines the lighting, mood, and overall direction.'
                        },
                        {
                            step: '02',
                            title: 'Strategic Alignment',
                            description: 'If you’re happy with the POC, we align on scope, deliverables, timeline, and pricing.'
                        },
                        {
                            step: '03',
                            title: 'Brand Onboarding',
                            description: 'Once confirmed, your brand is seamlessly onboarded into our structured production workflow — where refined execution begins.'
                        }
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-brand-black border border-white/20 flex items-center justify-center mb-8 group-hover:border-brand-accent transition-colors duration-500 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                                <span className={`text-xl font-mono ${i === 2 ? 'text-brand-accent' : 'text-white/40'}`}>{item.step}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 italic">{item.title}</h3>
                            <p className="text-white/50 font-light leading-relaxed max-w-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- COMPONENT: NAVIGATION ---
const Navigation = () => {
    return (
        <nav className="absolute top-0 left-0 w-full z-40 py-6 flex justify-center items-center mix-blend-exclusion pointer-events-none max-w-[1920px] mx-auto">
            <div className="absolute left-6 flex flex-col items-start pointer-events-auto cursor-pointer group">
                <span className="text-white font-bold tracking-[0.25em] text-base group-hover:text-brand-accent transition-colors leading-none">SNAPCRAFT</span>
                <span className="text-brand-accent font-mono text-[9px] uppercase tracking-[0.35em] mt-1.5 ml-0.5">Creative Hub</span>
            </div>
            <div className="hidden md:flex gap-10 pointer-events-auto">
                <button onClick={() => document.getElementById('visuals')?.scrollIntoView({ behavior: 'smooth' })} className="interactive text-[11px] font-bold font-mono text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors">Visuals</button>
                <button onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })} className="interactive text-[11px] font-bold font-mono text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors">Cinema</button>
                <button onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })} className="interactive text-[11px] font-bold font-mono text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors">Process</button>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="interactive text-[11px] font-bold font-mono text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors">About</button>
            </div>
        </nav>
    );
};

// --- MAIN APP ---
function App() {
    const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);
    const [showContact, setShowContact] = useState(false);

    return (
        <div className="relative w-full overflow-x-hidden bg-brand-black">
            <Navigation />

            <main>
                <Hero />
                <VisualsSection onSelect={setSelectedAsset} />
                <CinemaSection onSelect={setSelectedAsset} />
                <CreativeProcessSection />
                <StatsSection />
                <AboutSection />
            </main>

            {/* Footer */}
            <footer id="contact" className="bg-brand-black py-12 px-6 md:px-12 border-t border-white/5 relative z-10">
                <div className="max-w-[1800px] mx-auto flex flex-col items-center justify-center gap-6">

                    <h4 className="text-brand-accent font-mono text-sm uppercase tracking-[0.3em]">Contact Us</h4>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <a href="https://www.instagram.com/snapcraft_creative_hub?igsh=eGhlaWVieGFzM216" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <Instagram size={18} />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Instagram</span>
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=snapcraft.ch@gmail.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <Mail size={18} />
                            <span className="text-[10px] font-mono uppercase tracking-widest">Email</span>
                        </a>
                    </div>
                </div>
            </footer>

            {/* 
         Logic: Keep AssetModal open when ContactModal opens to prevent scrollbar flicker.
         ContactModal will NOT manage scroll lock if AssetModal is present (since AssetModal already does it).
      */}
            <AssetModal
                asset={selectedAsset}
                onClose={() => setSelectedAsset(null)}
                onGetStarted={() => setShowContact(true)}
            />
            <ContactModal
                isOpen={showContact}
                onClose={() => setShowContact(false)}
                lockScroll={selectedAsset === null}
            />
            <BrandChat />
        </div>
    );
}

export default App;
