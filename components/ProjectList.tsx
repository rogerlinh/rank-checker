import React from 'react';
import { Project } from '../types';
import { PlusIcon, TrashIcon, ProjectIcon, GlobeIcon, ListIcon } from './Icons';

interface ProjectListProps {
    projects: Project[];
    onSelectProject: (projectId: string) => void;
    onDeleteProject: (projectId: string) => void;
    onStartCreate: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject, onDeleteProject, onStartCreate }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
                <button
                    onClick={onStartCreate}
                    className="inline-flex items-center gap-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-colors"
                >
                    <PlusIcon />
                    New Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-10 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <ProjectIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No projects</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                             <button onClick={() => onSelectProject(project.id)} className="flex-grow text-left flex items-center gap-4">
                                <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg">
                                     <ProjectIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg text-gray-900 dark:text-white">{project.name}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        <span className="flex items-center gap-1.5"><GlobeIcon className="w-3.5 h-3.5" /> {project.domain}</span>
                                        <span className="flex items-center gap-1.5"><ListIcon className="w-3.5 h-3.5" /> {project.keywords.length} keywords</span>
                                    </div>
                                </div>
                            </button>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteProject(project.id); }}
                                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                                    aria-label={`Delete project ${project.name}`}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectList;
