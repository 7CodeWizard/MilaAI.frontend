import { FC, useEffect, useState } from 'react';
import { NewSection, Lesson } from '../../services/interface';
import api from '../../services/restApi';
import LessonSkeletons from './LessonSkeletons';
import LessonItem from './LessonItem';
import SectionsButtons from '../../components/Button/SectionsButtons';


const SectionsLessons: FC = () => {
    const [sections, setSections] = useState<NewSection>({});
    const [isSectionLoading, setSectionLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setSectionLoading(true);
            try {
                const response = await api.users.sectionsLessons();
                const responseSections = response[0]; // Adjusted for the provided structure  
                setSections(responseSections);
                setSectionLoading(false);
            } catch (err) {
                setSectionLoading(false);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="px-4 lg:py-14 flex justify-center max-lg:pt-4 max-lg:pb-20">
            <div className="bg-white dark:bg-mila-gray-25 rounded-xl p-2 w-[1000px] max-sm:w-full">
                <SectionsButtons />
                <div className="mt-2">
                    {isSectionLoading ? (
                        <LessonSkeletons />
                    ) : (
                        Object.keys(sections).map((sectionName, index) => (
                            <LessonItem
                                key={index}
                                sectionName={sectionName}
                                lessons={sections[sectionName]}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};


export default SectionsLessons;


