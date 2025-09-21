import React from 'react';
import Card from '../components/ui/Card';

const feedbacks = [
  {
    id: 1,
    name: 'Sarah L.',
    text: 'The image steganography tool is amazing! I was able to hide a message in a photo for my friend\'s birthday, and it worked flawlessly.',
    imageUrl: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 2,
    name: 'David Chen',
    text: 'As a photographer, protecting my work is crucial. VeilForge\'s invisible watermarking gives me peace of mind without ruining the look of my photos.',
    imageUrl: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: 3,
    name: 'Emily R.',
    text: 'The Key Vault is a fantastic feature. It\'s so convenient to have all my encryption keys managed securely in one place.',
    imageUrl: 'https://i.pravatar.cc/150?u=emily'
  },
  {
    id: 4,
    name: 'Mark T.',
    text: 'I was impressed by how intuitive the whole platform is. From uploading files to embedding watermarks, the process is straightforward and fast.',
    imageUrl: 'https://i.pravatar.cc/150?u=mark'
  },
   {
    id: 5,
    name: 'Jessica P.',
    text: 'The URL steganography is a fun and clever way to share links with a hidden note. Super cool feature!',
    imageUrl: 'https://i.pravatar.cc/150?u=jessica'
  }
];


const ContactPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Add custom animation styles */}
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

      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Have a question or feedback? We'd love to hear from you. Fill out the form, and our team will get back to you as soon as possible.
            </p>
            <div className="space-y-4 text-gray-300 mb-8">
              <p><strong>Email:</strong> support@veilforge.com</p>
              <p><strong>Phone:</strong> +91 99xxxxx899</p>
              <p><strong>Address:</strong> KSIT, 80ft BDA road, Raghuvanhalli, Bengaluru-560109 Karnataka, India.</p>
            </div>
             <h3 className="text-xl font-semibold mb-3 text-blue-400">Business Hours</h3>
             <p className="text-gray-300">Monday - Saturday: 8:30 AM - 5:00 PM (IST)</p>
          </div>
          <form className="space-y-4 md:col-span-1">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" rows={4} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 mt-1 text-white focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">Send Message</button>
          </form>
        </div>
      </Card>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Feedbacks</h2>
        <div className="relative w-full overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-scroll">
                {[...feedbacks, ...feedbacks].map((feedback, index) => (
                    <Card key={`${feedback.id}-${index}`} className="flex-shrink-0 w-80 mx-4 flex flex-col">
                        <div className="flex items-center mb-4">
                            <img 
                                src={feedback.imageUrl} 
                                alt={feedback.name}
                                className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                            />
                            <span className="font-bold text-lg text-white">{feedback.name}</span>
                        </div>
                        <p className="text-gray-300 text-sm flex-grow">"{feedback.text}"</p>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;