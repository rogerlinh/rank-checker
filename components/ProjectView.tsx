import React, { useState } from 'react';
import { Project, KeywordResult } from '../types';
import { fetchKeywordRank } from '../services/geminiService';
import Spinner from './Spinner';
import { ChevronLeftIcon, GlobeIcon, ListIcon, MonitorIcon, MapPinIcon } from './Icons';

interface ProjectViewProps {
    project: Project;
    onUpdateProject: (updatedProject: Project) => void;
    onBack: () => void;
    apiKeys: string[];
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, onUpdateProject, onBack, apiKeys }) => {
    const [isChecking, setIsChecking] = useState(false);

    const handleCheckRankings = async () => {
        if (apiKeys.length === 0) {
            alert('Please add at least one API key in the "Manage API Keys" section before checking ranks.');
            return;
        }

        setIsChecking(true);

        const updatedResults: KeywordResult[] = [...project.results];
        let keyIndex = 0; // Start with the first key

        for (let i = 0; i < project.keywords.length; i++) {
            const keyword = project.keywords[i];
            
            // Set status to loading
            updatedResults[i] = { ...updatedResults[i], status: 'loading' };
            onUpdateProject({ ...project, results: [...updatedResults] });

            let success = false;
            let lastError: Error | null = null;

            // Try each key until one succeeds
            for (let attempt = 0; attempt < apiKeys.length; attempt++) {
                const currentKey = apiKeys[keyIndex];
                try {
                    const result = await fetchKeywordRank(keyword, project.domain, project.device, project.country, project.city, currentKey);
                    updatedResults[i] = { ...updatedResults[i], status: 'success', result };
                    success = true;
                    // Key worked, keep this keyIndex for the next keyword
                    break; 
                } catch (error) {
                    console.warn(`API key at index ${keyIndex} failed for keyword "${keyword}". Trying next key.`);
                    lastError = error instanceof Error ? error : new Error('Unknown error during API call');
                    // Rotate to the next key for the next attempt
                    keyIndex = (keyIndex + 1) % apiKeys.length;
                }
            }

            if (!success) {
                updatedResults[i] = { ...updatedResults[i], status: 'error', error: lastError?.message || 'All available API keys failed.' };
            }
            
            onUpdateProject({ ...project, results: [...updatedResults] });
        }

        setIsChecking(false);
    };

    const parseRank = (text: string | undefined): string => {
        if (!text) return 'N/A';
        const match = text.match(/Rank: (\d+)|Not found in top 50 results/i);
        if (match) {
            return match[1] || 'Not Found';
        }
        return 'N/A';
    }
    
    const parseUrl = (text: string | undefined): string => {
        if (!text) return 'N/A';
        const urlMatch = text.match(/https?:\/\/[^\s]+/);
        return urlMatch ? urlMatch[0] : 'N/A';
    }

    const locationDisplay = project.city ? `${project.city}, ${project.country}` : project.country;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in">
            <div className="flex items-start justify-between mb-2">
                <div>
                     <button onClick={onBack} className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4">
                        <ChevronLeftIcon />
                        Back to Projects
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-2">
                         <span className="flex items-center gap-1.5"><GlobeIcon className="w-4 h-4" /> {project.domain}</span>
                         <span className="flex items-center gap-1.5"><ListIcon className="w-4 h-4" /> {project.keywords.length} keywords</span>
                         <span className="flex items-center gap-1.5 capitalize"><MonitorIcon className="w-4 h-4" /> {project.device}</span>
                         <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" /> {locationDisplay}</span>
                    </div>
                </div>
                 <button
                    onClick={handleCheckRankings}
                    disabled={isChecking}
                    className="inline-flex items-center gap-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isChecking ? 'Checking...' : 'Check All Rankings'}
                </button>
            </div>

             <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Keyword</th>
                            <th scope="col" className="px-6 py-3 text-center">Rank</th>
                            <th scope="col" className="px-6 py-3">Ranking URL</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.results.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.keyword}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-bold ${parseRank(item.result?.rankingText) === 'Not Found' ? 'text-yellow-500' : 'text-primary-600 dark:text-primary-400'}`}>
                                        {parseRank(item.result?.rankingText)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={parseUrl(item.result?.rankingText)} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-xs">
                                        {parseUrl(item.result?.rankingText) === 'N/A' ? 'N/A' : parseUrl(item.result?.rankingText)}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {item.status === 'loading' && <Spinner />}
                                    {item.status === 'pending' && <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Pending</span>}
                                    {item.status === 'success' && <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Success</span>}
                                    {item.status === 'error' && <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" title={item.error}>Error</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectView;