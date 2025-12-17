import { useRef, useState } from "react";
import Editing from "./partials/Editing";
import A4Page from "@/Components/A4";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";

export default function Dave() {
    const user = usePage().props.auth.user;

    const [config, setConfig] = useState({
        sidebar_color: "#aabbcc",
        font_primary_color: "#000000",
        font_secondary_color: "#0c1821",
        link_color: "#e5e5e5",
        font_family: "Arial, sans-serif",
    });

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const printRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Dave_CV",
    });
    return (
        <AuthenticatedLayout>
            <Head title="Dave"></Head>
            <div
                style={{ fontFamily: config.font_family }}
                className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8"
            >
                {/* LEFT – CONFIG PANEL */}
                <div className="lg:w-3/4 lg:h-full bg-white flex justify-center items-center rounded-lg shadow-sm flex flex-col">
                    <Editing config={config} setConig={setConfig} />
                    <button
                        onClick={handlePrint}
                        className="mt-6 w-1/3 bg-blue-600 text-white py-2 mb-2 rounded"
                    >
                        Print Resume
                    </button>
                </div>

                {/* RIGHT – RESUME PREVIEW */}
                <div className="flex justify-center lg:justify-start">
                    <A4Page ref={printRef} className="shadow-lg rounded-sm">
                        {/* Header with Contact Info */}
                        <div
                            className="border-b-2 pb-4 mb-6"
                            style={{ borderColor: config.sidebar_color }}
                        >
                            <h1
                                className="text-3xl font-bold text-center mb-2"
                                style={{
                                    fontFamily: config.font_family,
                                    color: config.font_primary_color,
                                }}
                            >
                                {user.personal_information.first_name}{" "}
                                {user.personal_information.last_name}
                            </h1>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-center">
                                <div className="flex items-center">
                                    <span className="mr-1">📧</span>
                                    <p
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        {user.personal_information.email}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-1">📞</span>
                                    <p
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        {user.personal_information.phone_number}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-1">📍</span>
                                    <p
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        {user.personal_information.country}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Two-column layout */}
                        <div className="grid grid-cols-3 gap-8 mb-8">
                            {/* Left Column - 2/3 width */}
                            <div className="col-span-2 space-y-6">
                                {/* Objective */}
                                {user.objective?.objective && (
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div
                                                className="w-3 h-8 mr-3 rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        config.sidebar_color,
                                                }}
                                            ></div>
                                            <h2
                                                className="text-lg font-bold"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                Objective
                                            </h2>
                                        </div>
                                        <p
                                            className="text-sm leading-relaxed pl-6"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            {user.objective.objective}
                                        </p>
                                    </div>
                                )}

                                {/* Experience */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-3 h-8 mr-3 rounded-sm"
                                            style={{
                                                backgroundColor:
                                                    config.sidebar_color,
                                            }}
                                        ></div>
                                        <h2
                                            className="text-lg font-bold"
                                            style={{
                                                color: config.font_primary_color,
                                            }}
                                        >
                                            Experience
                                        </h2>
                                    </div>
                                    <div className="space-y-4 pl-6">
                                        {user.experiences.map((experience) => (
                                            <div
                                                key={experience.id}
                                                className="border-l-2 pl-4 pb-3"
                                                style={{
                                                    borderColor: `${config.sidebar_color}80`,
                                                }}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3
                                                        className="font-bold text-sm"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        {experience.title}
                                                    </h3>
                                                    <span
                                                        className="text-xs px-2 py-1 rounded-sm whitespace-nowrap"
                                                        style={{
                                                            backgroundColor: `${config.sidebar_color}20`,
                                                            color: config.font_secondary_color,
                                                        }}
                                                    >
                                                        {formatDate(
                                                            experience.start_date
                                                        )}{" "}
                                                        -{" "}
                                                        {experience.end_date
                                                            ? formatDate(
                                                                  experience.end_date
                                                              )
                                                            : "Present"}
                                                    </span>
                                                </div>
                                                <p
                                                    className="text-sm font-medium mb-2"
                                                    style={{
                                                        color: config.sidebar_color,
                                                    }}
                                                >
                                                    {experience.company}
                                                </p>
                                                {experience.description && (
                                                    <p
                                                        className="text-xs leading-relaxed"
                                                        style={{
                                                            color: config.font_secondary_color,
                                                        }}
                                                    >
                                                        {experience.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Education */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-3 h-8 mr-3 rounded-sm"
                                            style={{
                                                backgroundColor:
                                                    config.sidebar_color,
                                            }}
                                        ></div>
                                        <h2
                                            className="text-lg font-bold"
                                            style={{
                                                color: config.font_primary_color,
                                            }}
                                        >
                                            Education
                                        </h2>
                                    </div>
                                    <div className="space-y-3 pl-6">
                                        {user.educations.map((education) => (
                                            <div
                                                key={education.id}
                                                className="pb-3 border-b border-gray-100 last:border-0"
                                            >
                                                <h3
                                                    className="font-bold text-sm mb-1"
                                                    style={{
                                                        color: config.font_primary_color,
                                                    }}
                                                >
                                                    {education.degree}
                                                </h3>
                                                <p
                                                    className="text-xs font-medium mb-1"
                                                    style={{
                                                        color: config.sidebar_color,
                                                    }}
                                                >
                                                    {education.institution}
                                                </p>
                                                <div
                                                    className="flex justify-between text-xs"
                                                    style={{
                                                        color: config.font_secondary_color,
                                                    }}
                                                >
                                                    <span>
                                                        {
                                                            education.field_of_study
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            education.graduation_year
                                                        }
                                                        {education.gpa
                                                            ? ` • GPA: ${education.gpa}`
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - 1/3 width */}
                            <div className="space-y-6">
                                {/* Additional Info (if available) */}
                                {user.personal_information?.date_of_birth && (
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div
                                                className="w-3 h-8 mr-3 rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        config.sidebar_color,
                                                }}
                                            ></div>
                                            <h2
                                                className="text-lg font-bold"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                Personal
                                            </h2>
                                        </div>
                                        <div
                                            className="pl-6 text-xs space-y-1"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            <p>
                                                <span className="font-medium">
                                                    Date of Birth:
                                                </span>{" "}
                                                {formatDate(
                                                    user.personal_information
                                                        .date_of_birth
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Languages (if available) */}
                                {user.languages?.length > 0 && (
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div
                                                className="w-3 h-8 mr-3 rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        config.sidebar_color,
                                                }}
                                            ></div>
                                            <h2
                                                className="text-lg font-bold"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                Languages
                                            </h2>
                                        </div>
                                        <div className="pl-6 space-y-2">
                                            {user.languages.map((language) => (
                                                <div
                                                    key={language.id}
                                                    className="flex justify-between items-center"
                                                >
                                                    <span
                                                        className="text-sm"
                                                        style={{
                                                            color: config.font_secondary_color,
                                                        }}
                                                    >
                                                        {language.name}
                                                    </span>
                                                    <span
                                                        className="text-xs px-2 py-1 rounded-sm"
                                                        style={{
                                                            backgroundColor: `${config.sidebar_color}20`,
                                                            color: config.font_secondary_color,
                                                        }}
                                                    >
                                                        {
                                                            language.proficiency_level
                                                        }
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Certifications (if available) */}
                                {user.certifications?.length > 0 && (
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div
                                                className="w-3 h-8 mr-3 rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        config.sidebar_color,
                                                }}
                                            ></div>
                                            <h2
                                                className="text-lg font-bold"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                Certifications
                                            </h2>
                                        </div>
                                        <div className="pl-6 space-y-2">
                                            {user.certifications.map((cert) => (
                                                <div
                                                    key={cert.id}
                                                    className="text-xs"
                                                    style={{
                                                        color: config.font_secondary_color,
                                                    }}
                                                >
                                                    <p className="font-medium">
                                                        {cert.name}
                                                    </p>
                                                    {cert.issuing_organization && (
                                                        <p className="text-xs opacity-80">
                                                            {
                                                                cert.issuing_organization
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Skills Section at Bottom - Full width */}
                        <div
                            className="border-t-2 pt-6"
                            style={{ borderColor: config.sidebar_color }}
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-3 h-8 mr-3 rounded-sm"
                                    style={{
                                        backgroundColor: config.sidebar_color,
                                    }}
                                ></div>
                                <h2
                                    className="text-lg font-bold"
                                    style={{ color: config.font_primary_color }}
                                >
                                    Skills
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pl-6">
                                {user.skills?.map((skill) => (
                                    <div key={skill.id} className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <p
                                                className="text-sm font-medium"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                {skill.name}
                                            </p>
                                            <span
                                                className="text-xs px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: `${config.sidebar_color}20`,
                                                    color: config.font_secondary_color,
                                                }}
                                            >
                                                {skill.proficiency_level}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="h-1.5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        config.sidebar_color,
                                                    width:
                                                        skill.proficiency_level ===
                                                        "expert"
                                                            ? "95%"
                                                            : skill.proficiency_level ===
                                                              "advanced"
                                                            ? "85%"
                                                            : skill.proficiency_level ===
                                                              "intermediate"
                                                            ? "65%"
                                                            : skill.proficiency_level ===
                                                              "beginner"
                                                            ? "35%"
                                                            : "50%",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </A4Page>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
