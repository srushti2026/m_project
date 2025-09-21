import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: Date;
  sections: LegalSection[];
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, sections }) => {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
                if (visibleSection) {
                    setActiveSection(visibleSection.id);
                }
            },
            {
                rootMargin: '-20% 0px -80% 0px', // Highlights when the section is near the top of the viewport
                threshold: 0,
            }
        );

        const elements = sections.map(({ id }) => document.getElementById(id)).filter((el) => el);
        elements.forEach((el) => observer.current?.observe(el));

        return () => {
            elements.forEach((el) => observer.current?.unobserve(el));
        };
    }, [sections]);
    

    const navLinkClasses = (id: string) => `
        block w-full text-left p-2 rounded-md text-sm transition-all duration-200
        ${activeSection === id 
            ? 'bg-blue-600/20 text-blue-300 font-semibold' 
            : 'text-gray-400 hover:bg-slate-700/50 hover:text-gray-200'
        }`;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
            <p className="text-center text-gray-500 mb-10">Last updated: {lastUpdated.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <Card>
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Navigation */}
                    <aside className="lg:w-1/4">
                        <nav className="sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-white">Contents</h3>
                            <ul className="space-y-2">
                                {sections.map(section => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`} className={navLinkClasses(section.id)}>
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* Right Content */}
                    <main className="lg:w-3/4">
                        <div className="prose prose-invert max-w-none text-gray-300 space-y-8">
                            {sections.map(section => (
                                <section key={section.id} id={section.id}>
                                    <h2 className="text-blue-400 !mb-4">{section.title}</h2>
                                    <div className="text-gray-300/80">
                                        {section.content}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </main>
                </div>
            </Card>
        </div>
    );
};

export default LegalPageLayout;
