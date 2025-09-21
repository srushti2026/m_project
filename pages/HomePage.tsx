import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/ui/Card';
import { Page } from '../types';
import AnimatedBackground from '../components/ui/AnimatedBackground';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const FeatureCard = ({ title, description, imageUrl }: { title: string, description: string, imageUrl: string }) => (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover"/>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm flex-grow mb-4">{description}</p>
        </div>
    </Card>
);

const RevealOnScroll: React.FC<{children: React.ReactNode, className?: string, delay?: number}> = ({ children, className, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${className || ''} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ animationDelay: `${delay}s`, transition: 'opacity 0.5s ease-out' }}
        >
            {children}
        </div>
    );
};


const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {

  return (
    <div className="relative overflow-hidden pb-16">
      <AnimatedBackground />

      <div className="relative z-10 space-y-32">
        <section className="text-center pt-16 pb-8">
            <h1 className="text-5xl lg:text-6xl font-bold animate-fadeInUp animated-gradient-text" style={{ animationDelay: '0.1s' }}>Welcome to VeilForge</h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Your dashboard for secure watermarking and file management.
            </p>
            <div className="mt-8 flex justify-center space-x-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <button 
                onClick={() => navigateTo('watermarking')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 active:scale-95"
            >
                Go to Dashboard
            </button>
            <button 
                onClick={() => navigateTo('uploads')}
                className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 active:scale-95">
                Manage Uploads
            </button>
            </div>
        </section>

        {/* Core Features Section */}
        <section className="px-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16 pb-4 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-500 after:rounded-full">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RevealOnScroll delay={0.1}>
                    <FeatureCard 
                        title="Invisible Image Watermarking"
                        description="Embed imperceptible watermarks into your digital photos and artwork. Protect your intellectual property without compromising visual quality. Ideal for photographers, designers, and artists."
                        imageUrl="https://images.unsplash.com/photo-1512295767273-b684ac6d5fa6?q=80&w=800&auto=format&fit=crop"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.2}>
                    <FeatureCard 
                        title="Secure Document Protection"
                        description="Safeguard your sensitive documents like reports and contracts. Our technology embeds unique identifiers deep within the file structure, helping you track distribution and prevent unauthorized sharing."
                        imageUrl="https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=800&auto=format&fit=crop"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.3}>
                    <FeatureCard 
                        title="Encrypted Uploads & Vault"
                        description="Upload your files to our secure, encrypted cloud storage. Manage your watermarked assets and cryptographic keys in your personal Key Vault, ensuring your data is safe and accessible only to you."
                        imageUrl="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop"
                    />
                </RevealOnScroll>
            </div>
        </section>
        
        {/* Compatibility Section */}
        <section className="px-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16 pb-4 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-500 after:rounded-full">Broad Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RevealOnScroll delay={0.1}>
                    <FeatureCard 
                        title="Versatile Image Support"
                        description="We support a wide array of popular image formats, including high-fidelity PNGs, universal JPEGs, classic BMPs, and more. Your creativity isn't limited by file type."
                        imageUrl="https://images.unsplash.com/photo-1621935939023-99e023f85b6f?q=80&w=800&auto=format&fit=crop"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.2}>
                    <FeatureCard 
                        title="Comprehensive Document Handling"
                        description="From universally accepted PDFs to editable DOCX files and simple TXT documents, VeilForge handles the formats you use every day for business and personal projects."
                        imageUrl="https://images.unsplash.com/photo-1529310242441-3836015a51ce?q=80&w=800&auto=format&fit=crop"
                    />
                </RevealOnScroll>
                <RevealOnScroll delay={0.3}>
                    <FeatureCard 
                        title="Creative Steganography Tools"
                        description="Go beyond traditional watermarking. Experiment with our fun and innovative tools to hide secret messages in plain sight using URLs and even emojis."
                        imageUrl="https://images.unsplash.com/photo-1618423447333-82b3d73f15a3?q=80&w=800&auto=format&fit=crop"
                    />
                </RevealOnScroll>
            </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;