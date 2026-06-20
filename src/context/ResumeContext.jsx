import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            website: '',
            linkedin: '',
        },
        experience: [],
        education: [],
        skills: '',
        summary: '',
    });

    const updatePersonalInfo = (e) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value,
            },
        }));
    };

    const addExperience = () => {
        setResumeData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                { id: Date.now(), title: '', company: '', startDate: '', endDate: '', description: '' },
            ],
        }));
    };

    const updateExperience = (id, e) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.map((exp) =>
                exp.id === id ? { ...exp, [name]: value } : exp
            ),
        }));
    };

    const removeExperience = (id) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.filter((exp) => exp.id !== id),
        }));
    };

    const addEducation = () => {
        setResumeData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { id: Date.now(), degree: '', school: '', startDate: '', endDate: '', description: '' },
            ],
        }));
    };

    const updateEducation = (id, e) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.map((edu) =>
                edu.id === id ? { ...edu, [name]: value } : edu
            ),
        }));
    };

    const removeEducation = (id) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }));
    };

    const updateSkills = (value) => {
        setResumeData((prev) => ({
            ...prev,
            skills: value,
        }));
    };

    const updateSummary = (value) => {
        setResumeData((prev) => ({
            ...prev,
            summary: value,
        }));
    };

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                updatePersonalInfo,
                addExperience,
                updateExperience,
                removeExperience,
                addEducation,
                updateEducation,
                removeEducation,
                updateSkills,
                updateSummary,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};
