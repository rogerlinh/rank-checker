import React, { useState, useEffect } from 'react';
import { Project } from './types';
import ProjectList from './components/ProjectList';
import ProjectView from './components/ProjectView';
import ProjectForm from './components/ProjectForm';
import ApiKeyManager from './components/ApiKeyManager';
import { KeyIcon } from './components/Icons';

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};


const App: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('keyword-checker-projects', []);
  const [apiKeys, setApiKeys] = useLocalStorage<string[]>('gemini-api-keys', []);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [isApiKeyManagerOpen, setIsApiKeyManagerOpen] = useState<boolean>(false);


  const handleCreateProject = (projectData: Omit<Project, 'id' | 'results'>) => {
    const newProject: Project = {
      ...projectData,
      id: new Date().toISOString(),
      results: projectData.keywords.map(kw => ({ keyword: kw, status: 'pending' })),
    };
    setProjects(prev => [...prev, newProject]);
    setIsCreatingProject(false);
  };
  
  const handleDeleteProject = (projectId: string) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
        if (activeProjectId === projectId) {
            setActiveProjectId(null);
        }
    }
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="relative text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 dark:text-primary-400 tracking-tight">
            Keyword Rank Projects
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Manage keyword groups and track your Google rankings.
          </p>
          <button
            onClick={() => setIsApiKeyManagerOpen(true)}
            className="absolute top-0 right-0 inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title="Manage API Keys"
          >
            <KeyIcon className="w-5 h-5" />
            <span>Manage API Keys</span>
          </button>
        </header>

        <main>
          {activeProject ? (
            <ProjectView 
              project={activeProject}
              onUpdateProject={handleUpdateProject}
              onBack={() => setActiveProjectId(null)}
              apiKeys={apiKeys}
            />
          ) : (
            <ProjectList
              projects={projects}
              onSelectProject={(projectId) => setActiveProjectId(projectId)}
              onDeleteProject={handleDeleteProject}
              onStartCreate={() => setIsCreatingProject(true)}
            />
          )}
        </main>

        {isCreatingProject && (
          <ProjectForm 
            onSave={handleCreateProject}
            onClose={() => setIsCreatingProject(false)}
          />
        )}
        
        {isApiKeyManagerOpen && (
          <ApiKeyManager
            apiKeys={apiKeys}
            setApiKeys={setApiKeys}
            onClose={() => setIsApiKeyManagerOpen(false)}
          />
        )}
        
        <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
            <p>Powered by Gemini & Google Search</p>
        </footer>
      </div>
    </div>
  );
};

export default App;