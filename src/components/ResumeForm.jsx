import React from 'react';
import { useResume } from '../context/ResumeContext';
import Input from './ui/Input';
import Button from './ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = () => {
    const {
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
    } = useResume();

    return (
        <div className="space-y-8 p-6 bg-white shadow-lg rounded-xl">
            <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" name="fullName" value={resumeData.personalInfo.fullName} onChange={updatePersonalInfo} placeholder="John Doe" />
                    <Input label="Email" name="email" value={resumeData.personalInfo.email} onChange={updatePersonalInfo} placeholder="john@example.com" />
                    <Input label="Phone" name="phone" value={resumeData.personalInfo.phone} onChange={updatePersonalInfo} placeholder="(555) 123-4567" />
                    <Input label="Address" name="address" value={resumeData.personalInfo.address} onChange={updatePersonalInfo} placeholder="City, State" />
                    <Input label="Website" name="website" value={resumeData.personalInfo.website} onChange={updatePersonalInfo} placeholder="www.johndoe.com" />
                    <Input label="LinkedIn" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={updatePersonalInfo} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div className="mt-4">
                    <label className="mb-1 text-sm font-medium text-gray-700 block">Professional Summary</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24"
                        placeholder="Briefly describe your professional background..."
                        value={resumeData.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                    />
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-gray-800">Experience</h2>
                    <Button onClick={addExperience} variant="outline" className="flex items-center gap-2 text-sm">
                        <Plus size={16} /> Add Position
                    </Button>
                </div>
                <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative group">
                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <Input label="Job Title" name="title" value={exp.title} onChange={(e) => updateExperience(exp.id, e)} placeholder="Software Engineer" />
                                <Input label="Company" name="company" value={exp.company} onChange={(e) => updateExperience(exp.id, e)} placeholder="Tech Corp" />
                                <Input label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => updateExperience(exp.id, e)} placeholder="Jan 2020" />
                                <Input label="End Date" name="endDate" value={exp.endDate} onChange={(e) => updateExperience(exp.id, e)} placeholder="Present" />
                            </div>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm h-20"
                                placeholder="Job description and achievements..."
                                name="description"
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, e)}
                            />
                        </div>
                    ))}
                    {resumeData.experience.length === 0 && (
                        <p className="text-gray-500 text-sm italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            Add your work experience here.
                        </p>
                    )}
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-gray-800">Education</h2>
                    <Button onClick={addEducation} variant="outline" className="flex items-center gap-2 text-sm">
                        <Plus size={16} /> Add Education
                    </Button>
                </div>
                <div className="space-y-6">
                    {resumeData.education.map((edu) => (
                        <div key={edu.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative group">
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <Input label="Degree / Major" name="degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, e)} placeholder="BS Computer Science" />
                                <Input label="School / University" name="school" value={edu.school} onChange={(e) => updateEducation(edu.id, e)} placeholder="University of Technology" />
                                <Input label="Start Date" name="startDate" value={edu.startDate} onChange={(e) => updateEducation(edu.id, e)} placeholder="2016" />
                                <Input label="End Date" name="endDate" value={edu.endDate} onChange={(e) => updateEducation(edu.id, e)} placeholder="2020" />
                            </div>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm h-20"
                                placeholder="Additional info (honors, thesis, etc)..."
                                name="description"
                                value={edu.description}
                                onChange={(e) => updateEducation(edu.id, e)}
                            />
                        </div>
                    ))}
                    {resumeData.education.length === 0 && (
                        <p className="text-gray-500 text-sm italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            Add your education here.
                        </p>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Skills</h2>
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24"
                    placeholder="List your skills (e.g. React, JavaScript, Python, Team Leadership)..."
                    value={resumeData.skills}
                    onChange={(e) => updateSkills(e.target.value)}
                />
            </section>
        </div>
    );
};

export default ResumeForm;
