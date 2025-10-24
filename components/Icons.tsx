import React from 'react';

export const SearchIcon: React.FC<{className?: string}> = ({ className = "w-4 h-4" }) => (
  <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
  </svg>
);

export const GlobeIcon: React.FC<{className?: string}> = ({ className = "w-4 h-4" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z M2.5 10h15"/>
    </svg>
);

export const MonitorIcon: React.FC<{className?: string}> = ({ className = "w-4 h-4" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
    </svg>
);

export const MapPinIcon: React.FC<{className?: string}> = ({ className = "w-4 h-4" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 21s7.5-7.625 7.5-12.5a7.5 7.5 0 1 0-15 0c0 4.875 7.5 12.5 7.5 12.5Z"/>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
    </svg>
);

export const PlusIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"/>
    </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v2H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
    </svg>
);

export const ChevronLeftIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
    </svg>
);

export const ProjectIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6l3 3v-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3Z"/>
    </svg>
);

export const ListIcon: React.FC<{className?: string}> = ({ className = "w-4 h-4" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h12M4 10h12M4 14h12"/>
    </svg>
);

export const KeyIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5" }) => (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14v4m4-4v4m-6 2h8m-8-6a5 5 0 0 1 5-5h1a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-1Zm0 0-2-2m2 2 2-2m0 0-2 2"/>
    </svg>
);