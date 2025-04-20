export type SectionType = 'header' | 'summary' | 'experience' | 'education' | 'skills';

interface BaseSection {
    id: string;
    type: SectionType;
    title: string;
}

export interface HeaderSection extends BaseSection {
    type: 'header';
    data: {
        name: string;
        title: string;
        email: string;
        phone: string;
        address: string;
    };
}

export interface SummarySection extends BaseSection {
    type: 'summary';
    data: {
        content: string;
    };
}

export interface ExperienceItem {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface ExperienceSection extends BaseSection {
    type: 'experience';
    data: {
        items: ExperienceItem[];
    };
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    location: string;
    year: string;
}

export interface EducationSection extends BaseSection {
    type: 'education';
    data: {
        items: EducationItem[];
    };
}

export interface SkillsSection extends BaseSection {
    type: 'skills';
    data: {
        items: string[];
    };
}

export type Section =
    | HeaderSection
    | SummarySection
    | ExperienceSection
    | EducationSection
    | SkillsSection;
