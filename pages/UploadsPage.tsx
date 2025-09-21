

import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { AppFile } from '../types';
import { DownloadIcon, DeleteIcon } from '../components/icons/Icons';
import UploadModal from '../components/ui/UploadModal';

interface FileTableProps {
    title: string;
    data: AppFile[];
    onUploadClick: () => void;
}

const FileTable: React.FC<FileTableProps> = ({ title, data, onUploadClick }) => {
    return (
        <Card hoverEffect={false}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button 
                    onClick={onUploadClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    + Upload
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="text-left p-4 font-semibold">File Name / Message</th>
                            <th className="text-left p-4 font-semibold">Type</th>
                            <th className="text-left p-4 font-semibold">Size</th>
                            <th className="text-left p-4 font-semibold">Uploaded</th>
                            <th className="text-left p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((file) => (
                            <tr key={file.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                <td className="p-4">{file.name}</td>
                                <td className="p-4">{file.type}</td>
                                <td className="p-4">{file.size}</td>
                                <td className="p-4">{file.uploaded}</td>
                                <td className="p-4">
                                    <div className="flex space-x-2">
                                        <button className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded-lg transition">
                                            <DownloadIcon /> Download
                                        </button>
                                        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded-lg transition">
                                            <DeleteIcon /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="flex justify-center items-center mt-6 space-x-2 text-gray-400">
                    <button className="p-2 rounded hover:bg-gray-700">&lt;</button>
                    <button className="p-2 w-8 h-8 rounded bg-blue-600 text-white">1</button>
                    <button className="p-2 w-8 h-8 rounded hover:bg-gray-700">2</button>
                    <span>...</span>
                    <button className="p-2 w-8 h-8 rounded hover:bg-gray-700">10</button>
                    <button className="p-2 rounded hover:bg-gray-700">&gt;</button>
                </div>
            </div>
        </Card>
    );
};

const UploadsPage: React.FC = () => {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string; }>({
        isOpen: false,
        title: '',
    });

    const handleOpenModal = (title: string) => {
        setModalConfig({ isOpen: true, title });
    };

    const handleCloseModal = () => {
        setModalConfig({ isOpen: false, title: '' });
    };

    const fileUploads: AppFile[] = [
        { id: '1', name: 'trial.JPG', type: 'Image', size: '5.0KB', uploaded: 'Sept 12, 25' },
        { id: '2', name: 'annual_report.docx', type: 'Document', size: '1.2MB', uploaded: 'Sept 10, 25' },
        { id: '3', name: 'logo_final.png', type: 'Image', size: '150KB', uploaded: 'Sept 9, 25' },
    ];

    const watermarkUploads: AppFile[] = [
        { id: '1', name: 'john©2025', type: 'Text', size: '2.0KB', uploaded: 'Sept 8, 25' },
        { id: '2', name: 'signature.jpg', type: 'Image', size: '12.0KB', uploaded: 'Sept 2, 25' },
        { id: '3', name: 'confidential_watermark.png', type: 'Image', size: '8.5KB', uploaded: 'Aug 28, 25' },
    ];


    return (
        <div className="space-y-12">
            <h1 className="text-3xl font-bold">File Uploads</h1>
            <FileTable 
                title="Files" 
                data={fileUploads} 
                onUploadClick={() => handleOpenModal('Upload a File')}
            />
            <FileTable 
                title="Watermarks / Unique Identifiers" 
                data={watermarkUploads} 
                onUploadClick={() => handleOpenModal('Upload a Watermark')}
            />
            <UploadModal 
                isOpen={modalConfig.isOpen}
                onClose={handleCloseModal}
                title={modalConfig.title}
            />
        </div>
    );
};

export default UploadsPage;