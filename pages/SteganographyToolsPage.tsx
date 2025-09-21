import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { CopyIcon, UploadIcon } from '../components/icons/Icons';
import { Page, SteganographyHistoryItem } from '../types';
import LoginPromptModal from '../components/ui/LoginPromptModal';

const ImageSteganographyTool: React.FC = () => {
    const [carrierImage, setCarrierImage] = useState<string | null>(null);
    const [secretMessage, setSecretMessage] = useState('');
    const [encodedImage, setEncodedImage] = useState<string | null>(null);
    const [imageToDecode, setImageToDecode] = useState<string | null>(null);
    const [decodedMessage, setDecodedMessage] = useState<string>('');
    const [isEncoding, setIsEncoding] = useState(false);
    const [isDecoding, setIsDecoding] = useState(false);

    const handleFileSelect = (file: File | null, type: 'carrier' | 'decode') => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (type === 'carrier') {
                    setCarrierImage(result);
                    setEncodedImage(null); // Reset output if input changes
                } else {
                    setImageToDecode(result);
                    setDecodedMessage(''); // Reset output if input changes
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (type === 'carrier') {
                setCarrierImage(null);
            } else {
                setImageToDecode(null);
            }
        }
    };

    const handleEncode = () => {
        if (!carrierImage || !secretMessage) {
            alert("Please provide an image and a secret message.");
            return;
        }
        setIsEncoding(true);
        setEncodedImage(null);
        setTimeout(() => {
            setEncodedImage(carrierImage); // In reality, this would be a new image
            setIsEncoding(false);
        }, 1500);
    };

    const handleDecode = () => {
        if (!imageToDecode) {
            alert("Please upload an image to decode.");
            return;
        }
        setIsDecoding(true);
        setDecodedMessage('');
        setTimeout(() => {
            // In a real app, this logic would determine if a message exists.
            // For this demo, we'll simulate that no message is found.
            setDecodedMessage("No message encoded/hidden!");
            setIsDecoding(false);
        }, 1500);
    };

    const ImageUploader: React.FC<{ onFileSelect: (file: File | null) => void, image: string | null, id: string }> = ({ onFileSelect, image, id }) => (
        <>
            {image ? (
                <div className="relative group">
                    <img src={image} alt="Preview" className="w-full rounded-lg object-contain max-h-60 bg-gray-900" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <button onClick={() => onFileSelect(null)} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Remove Image</button>
                    </div>
                </div>
            ) : (
                <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, BMP</p>
                    </div>
                    <input id={id} type="file" accept="image/*" className="sr-only" onChange={e => onFileSelect(e.target.files ? e.target.files[0] : null)} />
                </label>
            )}
        </>
    );

    return (
        <Card hoverEffect={false}>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Image Steganography</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Encode */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-2">Encode</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">1. Carrier Image</label>
                            <ImageUploader id="carrier-upload" image={carrierImage} onFileSelect={(file) => handleFileSelect(file, 'carrier')} />
                        </div>
                        <div>
                            <label htmlFor="secret-message" className="block text-sm font-medium text-gray-300 mb-2">2. Secret Message</label>
                            <textarea id="secret-message" value={secretMessage} onChange={e => setSecretMessage(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" rows={3}></textarea>
                        </div>
                        <button onClick={handleEncode} disabled={isEncoding || !carrierImage || !secretMessage} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800 disabled:cursor-not-allowed">
                            {isEncoding ? 'Encoding...' : 'Encode Message'}
                        </button>
                        {encodedImage && (
                            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                                <h4 className="font-semibold mb-2">Encoded Image:</h4>
                                <img src={encodedImage} alt="Encoded" className="w-full rounded-lg" />
                                <a href={encodedImage} download="encoded_image.png" className="mt-3 inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">Download</a>
                            </div>
                        )}
                    </div>
                </div>
                {/* Decode */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 border-b-2 border-gray-500 pb-2">Decode</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">1. Steganographic Image</label>
                            <ImageUploader id="decode-upload" image={imageToDecode} onFileSelect={(file) => handleFileSelect(file, 'decode')} />
                        </div>
                        <button onClick={handleDecode} disabled={isDecoding || !imageToDecode} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800 disabled:cursor-not-allowed">
                            {isDecoding ? 'Decoding...' : 'Decode Image'}
                        </button>
                        {(decodedMessage || isDecoding) && (
                            <div>
                                <label htmlFor="decoded-message" className="block text-sm font-medium text-gray-300 mb-2">Decoded Message:</label>
                                {isDecoding ? (
                                    <textarea id="decoded-message" readOnly value="Extracting message..." className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" rows={3} />
                                ) : decodedMessage === "No message encoded/hidden!" ? (
                                    <div className="w-full bg-yellow-500/20 border border-yellow-600 rounded-lg p-3 text-center text-yellow-300 font-semibold">
                                        No message encoded/hidden!
                                    </div>
                                ) : (
                                    <textarea id="decoded-message" readOnly value={decodedMessage} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" rows={3} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};


const URLSteganographyTool: React.FC = () => {
    const [urlToEncode, setUrlToEncode] = useState('');
    const [urlMessage, setUrlMessage] = useState('');
    const [encodedUrl, setEncodedUrl] = useState('');
    const [urlToDecode, setUrlToDecode] = useState('');
    const [decodedUrlMessage, setDecodedUrlMessage] = useState('');
    const [isUrlEncoding, setIsUrlEncoding] = useState(false);
    const [isUrlDecoding, setIsUrlDecoding] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleUrlEncode = () => {
        if (!urlToEncode.trim() || !urlMessage.trim()) {
            alert("Please provide a URL and a message.");
            return;
        }
        setIsUrlEncoding(true);
        setTimeout(() => {
            const encoded = btoa(urlMessage);
            const newUrl = `${urlToEncode}${urlToEncode.includes('?') ? '&' : '?'}v_data=${encoded}`;
            setEncodedUrl(newUrl);
            setIsUrlEncoding(false);
        }, 1000);
    };

    const handleUrlDecode = () => {
        if (!urlToDecode.trim()) {
            alert("Please enter a URL to decode.");
            return;
        }
        setIsUrlDecoding(true);
        setTimeout(() => {
            try {
                const url = new URL(urlToDecode);
                const data = url.searchParams.get('v_data');
                if (data) {
                    const decoded = atob(data);
                    setDecodedUrlMessage(decoded);
                } else {
                    setDecodedUrlMessage("No message encoded/hidden!");
                }
            } catch (error) {
                 setDecodedUrlMessage("No message encoded/hidden!");
            }
            setIsUrlDecoding(false);
        }, 1000);
    };

    return (
        <Card hoverEffect={false}>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">URL Steganography</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Encode */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-2">Encode</h3>
                    <div className="space-y-4">
                        <div>
                           <label htmlFor="url-encode" className="block text-sm font-medium text-gray-300 mb-2">Enter URL</label>
                           <input id="url-encode" type="text" value={urlToEncode} onChange={e => setUrlToEncode(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com" />
                        </div>
                         <div>
                           <label htmlFor="url-message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                           <textarea id="url-message" value={urlMessage} onChange={e => setUrlMessage(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" rows={2}></textarea>
                        </div>
                        <button onClick={handleUrlEncode} disabled={isUrlEncoding} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800">
                            {isUrlEncoding ? 'Encoding...' : 'Encode'}
                        </button>
                        {encodedUrl && (
                             <div className="relative">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Encoded URL:</label>
                                <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 pr-10 text-white" rows={3} readOnly value={encodedUrl} />
                                <button onClick={() => handleCopy(encodedUrl)} className="absolute top-9 right-2 p-1 text-gray-400 hover:text-white bg-gray-600 rounded">
                                   <CopyIcon />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Decode */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 border-b-2 border-gray-500 pb-2">Decode</h3>
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="url-decode" className="block text-sm font-medium text-gray-300 mb-2">Encoded URL</label>
                            <textarea id="url-decode" value={urlToDecode} onChange={e => setUrlToDecode(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={3}></textarea>
                        </div>
                        <button onClick={handleUrlDecode} disabled={isUrlDecoding} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800">
                             {isUrlDecoding ? 'Decoding...' : 'Decode'}
                        </button>
                         {(decodedUrlMessage || isUrlDecoding) && (
                            <div>
                                <label htmlFor="decoded-url-message" className="block text-sm font-medium text-gray-300 mb-2">Decoded Message:</label>
                                {isUrlDecoding ? (
                                    <textarea id="decoded-url-message" readOnly value="Extracting message..." className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2} />
                                ) : decodedUrlMessage === "No message encoded/hidden!" ? (
                                    <div className="w-full bg-yellow-500/20 border border-yellow-600 rounded-lg p-3 text-center text-yellow-300 font-semibold">
                                        No message encoded/hidden!
                                    </div>
                                ) : (
                                    <textarea id="decoded-url-message" readOnly value={decodedUrlMessage} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

const EmojiSteganographyTool: React.FC = () => {
    const [carrierEmojis, setCarrierEmojis] = useState('😀👍🎉');
    const [emojiSecret, setEmojiSecret] = useState('');
    const [encodedEmojis, setEncodedEmojis] = useState('');
    const [emojisToDecode, setEmojisToDecode] = useState('');
    const [decodedEmojiMessage, setDecodedEmojiMessage] = useState('');
    const [isEmojiEncoding, setIsEmojiEncoding] = useState(false);
    const [isEmojiDecoding, setIsEmojiDecoding] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleEmojiEncode = () => {
        if (!carrierEmojis.trim() || !emojiSecret.trim()) {
            alert("Please provide a carrier emoji sequence and a secret message.");
            return;
        }
        setIsEmojiEncoding(true);
        setTimeout(() => {
            // Mock logic: Intersperse zero-width spaces (U+200B)
            const secretBits = emojiSecret.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
            let result = carrierEmojis.split('');
            for (let i = 0; i < secretBits.length; i++) {
                if(result[i]) {
                    result[i] += '\u200B';
                }
            }
            setEncodedEmojis(result.join(''));
            setIsEmojiEncoding(false);
        }, 1000);
    };
    
    const handleEmojiDecode = () => {
        if (!emojisToDecode.trim()) {
            alert("Please enter an emoji sequence to decode.");
            return;
        }
        setIsEmojiDecoding(true);
        setTimeout(() => {
            if (emojisToDecode.includes('\u200B')) {
                setDecodedEmojiMessage("Secret message found in emojis!");
            } else {
                setDecodedEmojiMessage("No message encoded/hidden!");
            }
            setIsEmojiDecoding(false);
        }, 1000);
    };

    return (
        <Card hoverEffect={false}>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Emoji Steganography</h2>
             <div className="grid md:grid-cols-2 gap-8">
                {/* Encode */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-2">Encode</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="carrier-emojis" className="block text-sm font-medium text-gray-300 mb-2">1. Enter Carrier Emoji Sequence</label>
                            <textarea id="carrier-emojis" value={carrierEmojis} onChange={e => setCarrierEmojis(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2}></textarea>
                        </div>
                        <div>
                            <label htmlFor="emoji-secret" className="block text-sm font-medium text-gray-300 mb-2">2. Enter Message</label>
                            <textarea id="emoji-secret" value={emojiSecret} onChange={e => setEmojiSecret(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2}></textarea>
                        </div>
                        <button onClick={handleEmojiEncode} disabled={isEmojiEncoding} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800">
                            {isEmojiEncoding ? 'Encoding...' : 'Encode'}
                        </button>
                        {encodedEmojis && (
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Encrypted Emoji Sequence:</label>
                                <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 pr-10 text-white" rows={2} readOnly value={encodedEmojis} />
                                <button onClick={() => handleCopy(encodedEmojis)} className="absolute top-9 right-2 p-1 text-gray-400 hover:text-white bg-gray-600 rounded">
                                   <CopyIcon />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Decode */}
                <div>
                     <h3 className="text-xl font-semibold mb-3 border-b-2 border-gray-500 pb-2">Decode</h3>
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="emojis-to-decode" className="block text-sm font-medium text-gray-300 mb-2">Enter Encrypted Emoji Sequence</label>
                            <textarea id="emojis-to-decode" value={emojisToDecode} onChange={e => setEmojisToDecode(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2}></textarea>
                        </div>
                         <button onClick={handleEmojiDecode} disabled={isEmojiDecoding} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800">
                             {isEmojiDecoding ? 'Decoding...' : 'Decode'}
                        </button>
                         {(decodedEmojiMessage || isEmojiDecoding) && (
                            <div>
                                <label htmlFor="decoded-emoji-message" className="block text-sm font-medium text-gray-300 mb-2">Decoded Message:</label>
                                {isEmojiDecoding ? (
                                    <textarea id="decoded-emoji-message" readOnly value="Extracting message..." className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2} />
                                ) : decodedEmojiMessage === "No message encoded/hidden!" ? (
                                    <div className="w-full bg-yellow-500/20 border border-yellow-600 rounded-lg p-3 text-center text-yellow-300 font-semibold">
                                        No message encoded/hidden!
                                    </div>
                                ) : (
                                    <textarea id="decoded-emoji-message" readOnly value={decodedEmojiMessage} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" rows={2} />
                                )}
                            </div>
                        )}
                     </div>
                </div>
            </div>
        </Card>
    );
};

const mockHistory: SteganographyHistoryItem[] = [
    { id: '1', type: 'Image', operation: 'Encode', message: 'Secret meeting details...', carrier: 'vacation_photo.png', date: 'Oct 2, 2023', status: 'Success' },
    { id: '2', type: 'URL', operation: 'Encode', message: 'API_KEY_XYZ', carrier: 'https://example.com/blog', date: 'Sep 28, 2023', status: 'Success' },
    { id: '3', type: 'Emoji', operation: 'Encode', message: 'password123', carrier: '🎉🎈🎂', date: 'Sep 25, 2023', status: 'Success' },
    { id: '4', type: 'Image', operation: 'Decode', message: 'N/A - Decryption failed', carrier: 'chart.png', date: 'Sep 22, 2023', status: 'Failed' },
    { id: '5', type: 'Image', operation: 'Decode', message: 'Project Phoenix details', carrier: 'secret_image.png', date: 'Sep 21, 2023', status: 'Success' },
];


const SteganographyHistory: React.FC = () => {
    return (
        <Card>
             <h2 className="text-2xl font-bold mb-4 text-blue-400">Steganography History</h2>
             <div className="overflow-x-auto">
                <table className="min-w-full bg-slate-800 rounded-lg">
                    <thead className="border-b border-slate-700">
                        <tr>
                            <th className="text-left p-4 font-semibold">Type</th>
                            <th className="text-left p-4 font-semibold">Operation</th>
                            <th className="text-left p-4 font-semibold">Message</th>
                            <th className="text-left p-4 font-semibold">Carrier</th>
                            <th className="text-left p-4 font-semibold">Date</th>
                            <th className="text-left p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockHistory.map((item) => (
                            <tr key={item.id} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                                <td className="p-4">{item.type}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        item.operation === 'Encode' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'
                                    }`}>{item.operation}</span>
                                </td>
                                <td className="p-4 font-mono truncate max-w-xs">{item.message}</td>
                                <td className="p-4 truncate max-w-xs">{item.carrier}</td>
                                <td className="p-4">{item.date}</td>
                                <td className="p-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        item.status === 'Success' ? 'bg-green-500/20 text-green-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>{item.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </Card>
    );
};


interface SteganographyToolsPageProps {
  isLoggedIn: boolean;
  navigateTo: (page: Page) => void;
}

const SteganographyToolsPage: React.FC<SteganographyToolsPageProps> = ({ isLoggedIn, navigateTo }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  useEffect(() => {
    if (!isLoggedIn) {
        // Delay modal appearance slightly for better UX with page transition
        const timer = setTimeout(() => {
            setIsLoginModalOpen(true);
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    navigateTo('login');
  };

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-center">Steganography Tools</h1>
      <ImageSteganographyTool />
      <URLSteganographyTool />
      <EmojiSteganographyTool />
      {isLoggedIn && <SteganographyHistory />}

      <LoginPromptModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginRedirect}
      />
    </div>
  );
};

export default SteganographyToolsPage;