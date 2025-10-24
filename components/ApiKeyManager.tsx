import React, { useState } from 'react';
import { KeyIcon, PlusIcon, TrashIcon } from './Icons';

interface ApiKeyManagerProps {
    apiKeys: string[];
    setApiKeys: (keys: string[]) => void;
    onClose: () => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ apiKeys, setApiKeys, onClose }) => {
    const [newKey, setNewKey] = useState('');

    const handleAddKey = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedKey = newKey.trim();
        if (trimmedKey && !apiKeys.includes(trimmedKey)) {
            setApiKeys([...apiKeys, trimmedKey]);
            setNewKey('');
        } else if (apiKeys.includes(trimmedKey)) {
            alert('This API key has already been added.');
        }
    };

    const handleDeleteKey = (keyToDelete: string) => {
        setApiKeys(apiKeys.filter(key => key !== keyToDelete));
    };
    
    const maskKey = (key: string) => {
        if (key.length < 8) return '***';
        return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
    }

    return (
        <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Gemini API Keys</h2>
                
                <form onSubmit={handleAddKey} className="flex items-center gap-3 mb-6">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                            <KeyIcon className="w-4 h-4"/>
                        </div>
                        <input 
                            type="password" 
                            value={newKey} 
                            onChange={e => setNewKey(e.target.value)} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                            placeholder="Enter new API key" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="p-2.5 text-white bg-primary-600 hover:bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
                        aria-label="Add API Key"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </form>

                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Keys</h3>
                    {apiKeys.length === 0 ? (
                         <p className="text-center text-gray-500 dark:text-gray-400 py-4">No API keys added yet.</p>
                    ) : (
                        <ul className="max-h-60 overflow-y-auto pr-2">
                            {apiKeys.map((key, index) => (
                                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <span className="font-mono text-sm text-gray-700 dark:text-gray-200">{maskKey(key)}</span>
                                    <button
                                        onClick={() => handleDeleteKey(key)}
                                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                                        aria-label={`Delete key ending in ${key.substring(key.length - 4)}`}
                                    >
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button type="button" onClick={onClose} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyManager;