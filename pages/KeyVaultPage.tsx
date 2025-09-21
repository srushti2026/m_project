import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { CryptoKey } from '../types';
import GenerateKeyModal from '../components/ui/GenerateKeyModal';

const initialKeys: CryptoKey[] = [
    { id: '1', label: 'key_alpha', type: 'AES-256', dateCreated: '9/18/25' },
    { id: '2', label: 'project_secret', type: 'RSA-2048', dateCreated: '9/15/25' },
    { id: '3', label: 'personal_docs_key', type: 'AES-256', dateCreated: '9/01/25' },
];

const KeyVaultPage: React.FC = () => {
    const [keys, setKeys] = useState<CryptoKey[]>(initialKeys);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleKeyGenerated = (newKeyData: Omit<CryptoKey, 'id' | 'dateCreated'>) => {
        const newKey: CryptoKey = {
            ...newKeyData,
            id: (keys.length + 1).toString(), // Simple ID generation for demo
            dateCreated: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
        };
        setKeys(prevKeys => [newKey, ...prevKeys]);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Cryptographic Key Vault</h1>

            <Card hoverEffect={false}>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold">Your Keys</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition whitespace-nowrap"
                    >
                        Generate New Key
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-slate-800 rounded-lg">
                        <thead className="border-b border-slate-700">
                            <tr>
                                <th className="text-left p-4 font-semibold">Label</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Date Created</th>
                                <th className="text-left p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keys.map((key) => (
                                <tr key={key.id} className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                                    <td className="p-4 font-mono">{key.label}</td>
                                    <td className="p-4">{key.type}</td>
                                    <td className="p-4">{key.dateCreated}</td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition">
                                                Export
                                            </button>
                                            <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            
            <GenerateKeyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onKeyGenerated={handleKeyGenerated}
            />
        </div>
    );
};

export default KeyVaultPage;
