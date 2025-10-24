import React, { useState } from 'react';
import { Project } from '../types';
import { GlobeIcon, MapPinIcon, MonitorIcon, ProjectIcon, ListIcon } from './Icons';

interface ProjectFormProps {
    onSave: (projectData: Omit<Project, 'id' | 'results'>) => void;
    onClose: () => void;
}

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Vietnam', 'Singapore', 'Mexico', 'Italy', 'Spain', 'South Korea'
];

const ProjectForm: React.FC<ProjectFormProps> = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [keywords, setKeywords] = useState('');
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
    const [country, setCountry] = useState('Vietnam');
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const keywordList = keywords.split('\n').map(k => k.trim()).filter(Boolean);
        if (!name || !domain || keywordList.length === 0) {
            alert('Please fill out all fields and add at least one keyword.');
            return;
        }
        onSave({ name, domain, keywords: keywordList, device, country, city });
    };

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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="project-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                                <ProjectIcon className="w-4 h-4"/>
                            </div>
                            <input type="text" id="project-name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., 'My Coffee Blog'" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="domain-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                                <GlobeIcon />
                            </div>
                            <input type="text" id="domain-input" value={domain} onChange={e => setDomain(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., 'yourwebsite.com'" required />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="keywords-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keywords (one per line)</label>
                        <div className="relative">
                            <div className="absolute top-3.5 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                                <ListIcon />
                            </div>
                            <textarea id="keywords-input" value={keywords} onChange={e => setKeywords(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="best coffee makers&#10;espresso machine reviews&#10;how to froth milk" rows={4} required></textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="device-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                                    <MonitorIcon />
                                </div>
                                <select id="device-select" value={device} onChange={e => setDevice(e.target.value as 'desktop' | 'mobile')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="desktop">Desktop</option>
                                    <option value="mobile">Mobile</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                                    <MapPinIcon />
                                </div>
                                <select id="country-select" value={country} onChange={e => setCountry(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="city-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City (Optional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
                                <MapPinIcon />
                            </div>
                            <input type="text" id="city-input" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., 'Hanoi'" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                        <button type="button" onClick={onClose} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="py-2 px-4 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;