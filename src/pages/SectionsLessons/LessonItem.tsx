import React from 'react';
import { Lesson, StudyMode } from '../../services/interface';
import { useNavigate } from 'react-router'
import { useChatStore, useSectionsStore } from '../../state'
import { ConversationLogo } from '../../components/Icons'
import { appLinks } from '../../utils/constant'

interface SectionItemProps {
    sectionName: string;
    lessons: Lesson[];
}

const SectionItem: React.FC<SectionItemProps> = ({ sectionName, lessons }) => {
    const [setStudyMode] = useChatStore((state) => [state.setStudyMode]);
    const navigate = useNavigate();

    const onStartClick = async (lesson: Lesson) => {
        setStudyMode(StudyMode.START);
        navigate(`${appLinks.interactive_lesson}/${encodeURIComponent(lesson.lesson_topic)}`);
    };

    return (
        <div className="section-item mb-8">
            <h2 className="section-title text-xl font-bold mb-4">{sectionName}</h2>
            <div className="lessons-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons.map((lesson, index) => (
                    <div key={index} className="lesson-card border p-4 rounded-lg shadow-md flex flex-col items-center">
                        <div className="min-w-[60px] opacity-40"><ConversationLogo /></div>
                        <h3 className="lesson-name text-lg font-semibold mb-2 text-center">{lesson.lesson_name}</h3>
                        <p className="lesson-topic text-sm text-center mb-4">{lesson.lesson_topic}</p>
                        <button
                            className="start-button bg-blue-600 text-white rounded-lg px-4 py-2"
                            onClick={() => onStartClick(lesson)}
                            disabled={lesson.lesson_name === 'Flashcards'}
                        >
                            Start
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionItem; 
