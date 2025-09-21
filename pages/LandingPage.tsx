import React from 'react';
import Card from '../components/ui/Card';
import { UploadIcon, DownloadIcon } from '../components/icons/Icons';
import { Page } from '../types';
import AnimatedBackground from '../components/ui/AnimatedBackground';

interface LandingPageProps {
  navigateTo: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigateTo }) => {

  const reviews = [
    { name: 'Alex Johnson', text: 'VeilForge is incredibly powerful yet easy to use. I secured my documents in minutes.', imageUrl: 'https://i.pravatar.cc/150?u=alex' },
    { name: 'Samantha Bee', text: 'The steganography tools are so much fun to play with! A great all-in-one app.', imageUrl: 'https://i.pravatar.cc/150?u=samantha' },
    { name: 'Tech Weekly', text: 'A must-have tool for digital artists and anyone concerned with data privacy.', imageUrl: 'https://i.pravatar.cc/150?u=tech' },
  ];

  return (
    <div>
      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative text-center pt-16 pb-24">
        <AnimatedBackground />
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold pb-2 animated-gradient-text animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            VEILFORGE
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            The next generation of digital watermarking and steganography. Hide, protect, and verify your data with confidence.
          </p>
          <div className="mt-8 flex justify-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => navigateTo('login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              Register / Login
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper for Visual Separation */}
      <div className="bg-slate-950/30 backdrop-blur-sm border-t-2 border-blue-500/20 pt-24 pb-24 rounded-t-[40px] -mt-16">
        <div className="container mx-auto px-4 space-y-24">

          {/* How It Works Section */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12">How It Works in 3 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="bg-slate-800 p-6 rounded-full border-2 border-blue-500 mb-4">
                        <UploadIcon className="h-10 w-10 text-blue-400"/>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">1. Upload</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">Select the image or document you want to protect from your device.</p>
                </div>
                 <div className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-slate-800 p-6 rounded-full border-2 border-blue-500 mb-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">2. Embed Watermark</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">Choose your unique identifier—text or an image—and embed it invisibly.</p>
                </div>
                 <div className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-slate-800 p-6 rounded-full border-2 border-blue-500 mb-4">
                        <DownloadIcon />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">3. Download</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">Download your newly protected file, ready for secure distribution.</p>
                </div>
            </div>
          </section>

          {/* Services Section */}
          <section>
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>Protect What's Yours</h2>
                <p className="text-gray-400 mb-12 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                    VeilForge offers state-of-the-art solutions to embed invisible watermarks within your files, ensuring ownership and integrity without compromising quality. Explore our core services.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Card 1 */}
                <div className="relative group rounded-2xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
                    <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg" aria-hidden="true"></div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1598362149229-8733d26b6062?q=80&w=1200&auto=format&fit=crop" alt="Image Watermarking" className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-3xl font-bold text-white mb-2">Image Watermarking</h3>
                            <p className="text-gray-300">Seamlessly embed identifiers in your images, perfect for photographers and digital artists.</p>
                        </div>
                    </div>
                </div>
                {/* Service Card 2 */}
                <div className="relative group rounded-2xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '1.0s' }}>
                    <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg" aria-hidden="true"></div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1554492232-15f5c634c07d?q=80&w=1200&auto=format&fit=crop" alt="Document Watermarking" className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-3xl font-bold text-white mb-2">Document Watermarking</h3>
                            <p className="text-gray-300">Protect sensitive documents by embedding hidden data within the file structure.</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

           {/* Features Section */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12">Explore Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="animate-fadeInUp" style={{ animationDelay: '0.9s' }}><Card>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Invisible Watermarking</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">Watermarks are imperceptible to the human eye, maintaining your file's quality.</p>
                </Card></div>
                 <div className="animate-fadeInUp" style={{ animationDelay: '1.0s' }}><Card>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Robust Encryption</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">All files are protected with end-to-end encryption, ensuring your data remains secure and private.</p>
                </Card></div>
                 <div className="animate-fadeInUp" style={{ animationDelay: '1.1s' }}><Card>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Secure Key Vault</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">Manage your cryptographic keys safely within your personal Key Vault.</p>
                </Card></div>
                 <div className="animate-fadeInUp" style={{ animationDelay: '1.2s' }}><Card>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Multiple File Types</h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">We support a wide range of image and document formats, including JPG, PNG, and PDF.</p>
                </Card></div>
            </div>
          </section>

          {/* User Reviews Section */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-10">User Reviews</h2>
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <div className="flex animate-scroll">
                    {[...reviews, ...reviews].map((review, index) => (
                        <Card key={index} className="flex-shrink-0 w-80 md:w-96 mx-4 flex flex-col">
                            <div className="flex items-center mb-4">
                                <img 
                                    src={review.imageUrl} 
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                                />
                                <span className="font-bold text-lg text-white">{review.name}</span>
                            </div>
                            <p className="text-gray-300 text-sm flex-grow group-hover:text-gray-100 transition-colors">"{review.text}"</p>
                        </Card>
                    ))}
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
