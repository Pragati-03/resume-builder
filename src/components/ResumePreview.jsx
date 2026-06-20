import React, { useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import Button from './ui/Button';
import { Download, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
    const { resumeData } = useResume();
    const resumeRef = useRef();

    const generatePDF = async () => {
        const element = resumeRef.current;

        // Slight hierarchy adjustment for clean capture
        const canvas = await html2canvas(element, {
            scale: 2, // Improve quality
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Fit image to page width
        const ratio = pdfWidth / imgWidth;
        const height = imgHeight * ratio;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);
        pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    };

    const hasData = resumeData.personalInfo.fullName || resumeData.experience.length > 0 || resumeData.education.length > 0 || resumeData.skills;

    return (
        <div className="sticky top-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Live Preview</h2>
                <Button onClick={generatePDF} className="flex items-center gap-2 shadow-sm">
                    <Download size={18} /> Download PDF
                </Button>
            </div>

            <div className="bg-gray-200 p-2 rounded-lg shadow-inner overflow-hidden">
                {/* Aspect Ratio for A4ish look */}
                <div
                    ref={resumeRef}
                    className="bg-white text-gray-800 shadow-2xl mx-auto min-h-[1123px] w-[794px] origin-top-left transform scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] 2xl:scale-[1] p-10"
                    style={{ fontFamily: 'serif' }} // Standard resume font feel
                >
                    {/* Header */}
                    <header className="border-b-2 border-gray-800 pb-6 mb-6">
                        <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900 mb-2">
                            {resumeData.personalInfo.fullName || "Your Name"}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                            {resumeData.personalInfo.email && (
                                <div className="flex items-center gap-1">
                                    <Mail size={14} /> {resumeData.personalInfo.email}
                                </div>
                            )}
                            {resumeData.personalInfo.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone size={14} /> {resumeData.personalInfo.phone}
                                </div>
                            )}
                            {resumeData.personalInfo.address && (
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} /> {resumeData.personalInfo.address}
                                </div>
                            )}
                            {resumeData.personalInfo.website && (
                                <div className="flex items-center gap-1">
                                    <Globe size={14} /> {resumeData.personalInfo.website}
                                </div>
                            )}
                            {resumeData.personalInfo.linkedin && (
                                <div className="flex items-center gap-1">
                                    <Linkedin size={14} /> {resumeData.personalInfo.linkedin}
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Detailed Content */}
                    <div className="space-y-6">
                        {/* Summary */}
                        {resumeData.summary && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 border-b pb-1">Professional Summary</h3>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {resumeData.summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {resumeData.experience.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-1">Experience</h3>
                                <div className="space-y-5">
                                    {resumeData.experience.map((exp) => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-gray-800">{exp.title}</h4>
                                                <span className="text-sm text-gray-500 italic">{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                                            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {resumeData.education.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-1">Education</h3>
                                <div className="space-y-4">
                                    {resumeData.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-bold text-gray-800">{edu.school}</h4>
                                                <span className="text-sm text-gray-500 italic">{edu.startDate} - {edu.endDate}</span>
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium text-gray-800">{edu.degree}</span>
                                                {edu.description && <span> • {edu.description}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {resumeData.skills && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 border-b pb-1">Skills</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {resumeData.skills}
                                </p>
                            </section>
                        )}
                    </div>

                    {!hasData && (
                        <div className="mt-20 text-center text-gray-400 italic">
                            Start filling out the form to see your resume here...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
