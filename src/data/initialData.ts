// export const initialSections = [
//     {
//         id: 'header',
//         type: 'header',
//         title: 'Header',
//         data: {
//             name: 'John Doe',
//             title: 'Software Engineer',
//             email: 'john@example.com',
//             phone: '(123) 456-7890',
//             address: 'San Francisco, CA',
//         },
//     },
//     {
//         id: 'summary',
//         type: 'summary',
//         title: 'Summary',
//         data: {
//             content: 'Experienced software engineer with 5+ years of experience in building web applications.',
//         },
//     },
//     {
//         id: 'experience',
//         type: 'experience',
//         title: 'Experience',
//         data: {
//             items: [
//                 {
//                     id: 'exp1',
//                     jobTitle: 'Senior Developer',
//                     company: 'Tech Corp',
//                     location: 'San Francisco, CA',
//                     startDate: '2020-01',
//                     endDate: 'Present',
//                     description: 'Lead a team of developers to build scalable web applications.',
//                 },
//             ],
//         },
//     },
//     {
//         id: 'education',
//         type: 'education',
//         title: 'Education',
//         data: {
//             items: [
//                 {
//                     id: 'edu1',
//                     degree: 'B.S. Computer Science',
//                     institution: 'University of California',
//                     location: 'Berkeley, CA',
//                     year: '2018',
//                 },
//             ],
//         },
//     },
//     {
//         id: 'skills',
//         type: 'skills',
//         title: 'Skills',
//         data: {
//             items: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
//         },
//     },
// ];


// src/data/initialData.ts
import { Section } from '../types/Section';

export const initialSections: Section[] = [
    {
        id: 'header',
        type: 'header',
        title: 'Header',
        data: {
            name: 'John Doe',
            title: 'Software Engineer',
            email: 'john@example.com',
            phone: '(123) 456-7890',
            address: 'San Francisco, CA',
        },
    },
    {
        id: 'summary',
        type: 'summary',
        title: 'Summary',
        data: {
            content: 'Experienced software engineer with 5+ years of experience in building web applications.',
        },
    },
    {
        id: 'experience',
        type: 'experience',
        title: 'Experience',
        data: {
            items: [
                {
                    id: 'exp1',
                    jobTitle: 'Senior Developer',
                    company: 'Tech Corp',
                    location: 'San Francisco, CA',
                    startDate: '2020-01',
                    endDate: 'Present',
                    description: 'Lead a team of developers to build scalable web applications.',
                },
            ],
        },
    },
    {
        id: 'education',
        type: 'education',
        title: 'Education',
        data: {
            items: [
                {
                    id: 'edu1',
                    degree: 'B.S. Computer Science',
                    institution: 'University of California',
                    location: 'Berkeley, CA',
                    year: '2018',
                },
            ],
        },
    },
    {
        id: 'skills',
        type: 'skills',
        title: 'Skills',
        data: {
            items: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
        },
    },
];
