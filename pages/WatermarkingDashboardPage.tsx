import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import { ProcessHistoryItem } from '../types';
import { DownloadIcon, UploadIcon } from '../components/icons/Icons';

type Tab = 'embed' | 'extract' | 'history';

const EmbedTab: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleGenerate = () => {
        setIsProcessing(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload File</label>
                <div className="flex items-center space-x-4">
                    <label htmlFor="file-upload" className="flex-1 cursor-pointer bg-slate-700 hover:bg-slate-600 border-2 border-dashed border-slate-500 rounded-lg p-8 text-center transition">
                        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm font-semibold text-gray-300">Click to upload or drag and drop</span>
                    </label>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    <span className="text-gray-400">OR</span>
                    <select className="flex-1 bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500">
                        <option>Choose uploaded file</option>
                        <option>trial.JPG</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Watermark / Unique Identifier</label>
                <div className="flex items-center space-x-4">
                    <select className="bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500">
                        <option>Image</option>
                        <option>Text</option>
                    </select>
                    <label htmlFor="watermark-upload" className="flex-1 cursor-pointer bg-slate-700 hover:bg-slate-600 border-2 border-dashed border-slate-500 rounded-lg p-4 text-center transition">
                         <span className="text-sm font-semibold text-gray-300">Upload Identifier</span>
                    </label>
                    <input id="watermark-upload" name="watermark-upload" type="file" className="sr-only" />
                    <span className="text-gray-400">OR</span>
                    <select className="flex-1 bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500">
                        <option>Choose watermark file</option>
                        <option>signature.jpg</option>
                        <option>john©2025</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Encryption Key</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500">
                    <option>Select an encryption key</option>
                    <option>key_alpha</option>
                    <option>key_beta_2025</option>
                </select>
            </div>
            
            <button 
                onClick={handleGenerate}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                Generate Watermarked File
            </button>

            {(isProcessing || progress === 100) && (
                <div className="space-y-4">
                    <p>Processing...</p>
                    <div className="w-full bg-slate-700 rounded-full h-4">
                        <div className="bg-blue-500 h-4 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-right">{progress}%</p>
                </div>
            )}
            {progress === 100 && (
                 <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center transform active:scale-95">
                    <DownloadIcon />
                    Download
                </button>
            )}
        </div>
    );
};

const ExtractTab: React.FC = () => {
    // Similar state management as EmbedTab
    return (
        <div className="space-y-6">
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload File</label>
                <label htmlFor="extract-file-upload" className="flex flex-col items-center justify-center w-full cursor-pointer bg-slate-700 hover:bg-slate-600 border-2 border-dashed border-slate-500 rounded-lg p-8 text-center transition">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-semibold text-gray-300">Upload watermarked file</span>
                </label>
                <input id="extract-file-upload" name="extract-file-upload" type="file" className="sr-only" />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Decryption Watermark / Unique Identifier Type</label>
                 <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500">
                    <option>Image</option>
                    <option>Text</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Decryption Key</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500">
                    <option>Select a decryption key</option>
                    <option>key_alpha</option>
                    <option>key_beta_2025</option>
                </select>
            </div>
             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95">
                Extract Data
            </button>
        </div>
    );
};

const HistoryTab: React.FC = () => {
    const historyData: ProcessHistoryItem[] = [
        { id: '1', fileName: 'img1.JPG', watermark: 'john©2026', status: 'Completed', date: '9/18/20' },
        { id: '2', fileName: 'report.docx', watermark: 'signature.png', status: 'Completed', date: '9/17/20' },
        { id: '3', fileName: 'project_alpha.pdf', watermark: 'confidential_v2', status: 'Failed', date: '9/16/20' },
        { id: '4', fileName: 'vacation_pic.png', watermark: 'travel_logo.svg', status: 'Completed', date: '9/15/20' },
    ];
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800 rounded-lg">
                <thead className="border-b border-slate-700">
                    <tr>
                        <th className="text-left p-4 font-semibold">File Name</th>
                        <th className="text-left p-4 font-semibold">Watermark</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Date</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((item) => (
                        <tr key={item.id} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                            <td className="p-4">{item.fileName}</td>
                            <td className="p-4">{item.watermark}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                    item.status === 'Failed' ? 'bg-red-500/20 text-red-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>{item.status}</span>
                            </td>
                            <td className="p-4">{item.date}</td>
                            <td className="p-4">
                                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-3 rounded-lg transition-all transform active:scale-95">
                                    <DownloadIcon />
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             <div className="flex justify-center items-center mt-6 space-x-2 text-gray-400">
                <button className="p-2 rounded hover:bg-slate-700">&lt;</button>
                <button className="p-2 w-8 h-8 rounded bg-blue-600 text-white">1</button>
                <button className="p-2 w-8 h-8 rounded hover:bg-slate-700">2</button>
                <span>...</span>
                <button className="p-2 w-8 h-8 rounded hover:bg-slate-700">10</button>
                <button className="p-2 rounded hover:bg-slate-700">&gt;</button>
            </div>
        </div>
    );
};


const WatermarkingDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('embed');
  const [sliderStyle, setSliderStyle] = useState({});
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabElement = tabsRef.current?.querySelector(`[data-tab="${activeTab}"]`);
    if (activeTabElement) {
        const { offsetLeft, clientWidth } = activeTabElement as HTMLElement;
        setSliderStyle({
            left: `${offsetLeft}px`,
            width: `${clientWidth}px`,
        });
    }
  }, [activeTab]);

  const TabButton = ({ tabName, children }: { tabName: Tab, children: React.ReactNode }) => (
    <button 
      data-tab={tabName}
      onClick={() => setActiveTab(tabName)} 
      className={`relative z-10 px-6 py-3 font-semibold transition-colors duration-300 ${
        activeTab === tabName 
        ? 'text-white' 
        : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Watermarking Dashboard</h1>
      <Card hoverEffect={false}>
        <div ref={tabsRef} className="relative border-b border-slate-700 mb-6 flex space-x-4">
            <TabButton tabName="embed">Embed</TabButton>
            <TabButton tabName="extract">Extract</TabButton>
            <TabButton tabName="history">Processed History</TabButton>
            <div 
              className="absolute bottom-0 h-0.5 bg-blue-500 rounded-t-lg transition-all duration-300 ease-out"
              style={sliderStyle}
            />
        </div>
        <div>
            {activeTab === 'embed' && <EmbedTab />}
            {activeTab === 'extract' && <ExtractTab />}
            {activeTab === 'history' && <HistoryTab />}
        </div>
      </Card>
    </div>
  );
};

export default WatermarkingDashboardPage;