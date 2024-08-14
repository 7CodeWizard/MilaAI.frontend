import React from 'react';
import { Lesson } from '../../services/interface';

interface SectionItemProps {
    sectionName: string;
    lessons: Lesson[];
}

const SectionItem: React.FC<SectionItemProps> = ({ sectionName, lessons }) => {
    return (
        <div className="section-item">
            <h2 className="section-title">{sectionName}</h2>
            <ul className="lessons-list">
                {lessons.map((lesson, index) => (
                    <li key={index} className="lesson-item">
                        <strong>{lesson.lesson_name}:</strong> {lesson.lesson_topic}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionItem;  
