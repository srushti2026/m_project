import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/ui/Card';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { GithubIcon, LinkedInIcon } from '../components/icons/Icons';

// RevealOnScroll component for smooth animations
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

// Team Member Card Component
const TeamMemberCard: React.FC<{ name: string; role: string; bio: string; imageUrl: string; githubUrl: string; linkedinUrl: string; }> = ({ name, role, bio, imageUrl, githubUrl, linkedinUrl }) => (
    <Card className="text-center h-full flex flex-col group">
        <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-300" />
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-blue-400 font-semibold mb-3">{role}</p>
            <p className="text-sm text-gray-400 mb-4">{bio}</p>
        </div>
        <div className="flex justify-center space-x-4 mt-auto pt-4">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><GithubIcon /></a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon /></a>
        </div>
    </Card>
);

// Mock data for team members
const teamMembers = [
    { id: 1, name: 'Alex Chen', role: 'CEO & Founder', bio: 'Visionary leader with a passion for cybersecurity and protecting digital creators.', imageUrl: 'https://i.pravatar.cc/150?u=alexchen', githubUrl: '#', linkedinUrl: '#' },
    { id: 2, name: 'Maria Garcia', role: 'Lead Frontend Engineer', bio: 'Expert in crafting beautiful, intuitive user interfaces that make complex technology simple.', imageUrl: 'https://i.pravatar.cc/150?u=mariagarcia', githubUrl: '#', linkedinUrl: '#' },
    { id: 3, name: 'David Smith', role: 'UX/UI Design Lead', bio: 'Creative mind focused on user-centric design and ensuring a seamless experience.', imageUrl: 'https://i.pravatar.cc/150?u=davidsmith', githubUrl: '#', linkedinUrl: '#' },
    { id: 4, name: 'Priya Patel', role: 'Backend & Security Specialist', bio: 'Architect of our robust and secure infrastructure, ensuring data is always safe.', imageUrl: 'https://i.pravatar.cc/150?u=priyapatel', githubUrl: '#', linkedinUrl: '#' },
];

const TeamPage: React.FC = () => {
    return (
        <div className="relative overflow-hidden pb-16">
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto px-4 space-y-24">
                {/* Hero Section */}
                <section className="text-center pt-16 pb-8">
                    <h1 className="text-5xl lg:text-6xl font-bold animate-fadeInUp animated-gradient-text">Our Mission & Team</h1>
                    <p className="text-xl text-slate-400 mt-4 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Discover the 'why' behind our project and the passionate team dedicated to building the future of digital security.
                    </p>
                </section>

                {/* Project Explanation Section */}
                <RevealOnScroll>
                    <Card>
                        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Our Project: VeilForge</h2>
                        <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto">
                            VeilForge is a comprehensive suite of steganography and watermarking tools designed for everyone—from digital artists and photographers to privacy-conscious individuals. We provide robust, user-friendly solutions to embed imperceptible data within images and documents. Our goal is to make advanced digital protection techniques accessible, allowing you to secure your intellectual property, verify authenticity, and communicate with an extra layer of privacy.
                        </p>
                    </Card>
                </RevealOnScroll>

                {/* The Problem We Solve Section */}
                <RevealOnScroll delay={0.2}>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <img src="https://images.unsplash.com/photo-1550751827-4138d04d475d?q=80&w=800&auto=format&fit=crop" alt="Cybersecurity network" className="rounded-lg shadow-xl aspect-square object-cover"/>
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-blue-400">The Problem We Solve</h2>
                            <p className="text-slate-300">
                                In an era of rampant digital content sharing, protecting ownership and preventing misuse has become a significant challenge. Unauthorized distribution, intellectual property theft, and the spread of manipulated media are commonplace. VeilForge addresses this by providing powerful tools to embed hidden, verifiable watermarks and data, creating a digital fingerprint that travels with your assets, ensuring your rights are always protected.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
                
                {/* Demo Video Section */}
                <RevealOnScroll delay={0.2}>
                     <section className="text-center">
                        <h2 className="text-4xl font-bold mb-8">See VeilForge in Action</h2>
                        <div className="relative aspect-video max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-2xl overflow-hidden border-2 border-slate-700 group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" alt="Video placeholder background" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                                <div className="p-6 bg-white/10 rounded-full backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20 transition-transform duration-300" aria-label="Play Video">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                                </div>
                                <p className="mt-4 text-white font-semibold text-lg">Our Demo Video is Coming Soon!</p>
                            </div>
                        </div>
                     </section>
                </RevealOnScroll>

                {/* Team Section */}
                <section>
                    <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                             <RevealOnScroll key={member.id} delay={index * 0.1}>
                                <TeamMemberCard {...member} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeamPage;