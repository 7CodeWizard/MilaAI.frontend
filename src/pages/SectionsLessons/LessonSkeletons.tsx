import React from 'react';
import './SectionSkeletons.css';

const SectionSkeleton: React.FC = () => {
    return (
        <div className="skeleton-section mb-8">
            <div className="skeleton-title"></div>
            <div className="skeleton-lessons-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="skeleton-lesson-card border p-4 rounded-lg shadow-md flex flex-col items-center">
                        <div className="skeleton-lesson-icon bg-slate-200 rounded-full p-4 mb-4"></div>
                        <div className="skeleton-lesson-name bg-slate-200 h-4 w-3/4 mb-2"></div>
                        <div className="skeleton-lesson-topic bg-slate-200 h-4 w-2/3 mb-4"></div>
                        <div className="skeleton-start-button bg-slate-200 h-8 w-24 rounded-lg"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SectionSkeletons: React.FC = () => {
    return (
        <div className="skeleton-container">
            {Array.from({ length: 5 }).map((_, index) => (
                <SectionSkeleton key={index} />
            ))}
        </div>
    );
};

export default SectionSkeletons;  
