import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Editing from "./partials/Editing";
import { useRef, useState } from "react";
import A4Page from "@/Components/A4";
import { useReactToPrint } from "react-to-print";

export default function Roxanne() {
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Dave_CV",
    });
    const user = usePage().props.auth.user;
    const [config, setConfig] = useState({
        sidebar_color: "#ff82a9",
        font_primary_color: "#000000",
        font_secondary_color: "#0c1821",
        link_color: "#ffebe7",
        font_family: "Arial, sans-serif",
    });

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Get proficiency level percentage based on words
    const getProficiencyPercentage = (level) => {
        const levels = {
            beginner: 30,
            elementary: 40,
            intermediate: 60,
            "upper-intermediate": 75,
            advanced: 85,
            expert: 95,
            native: 100,
        };
        return levels[level?.toLowerCase()] || 50;
    };

    // Get proficiency text with color
    const getProficiencyText = (level) => {
        const levelLower = level?.toLowerCase();
        const colors = {
            beginner: config.font_primary_color,
            elementary: "text-green-500",
            intermediate: config.font_primary_color,
            "upper-intermediate": "text-orange-500",
            advanced: config.font_primary_color,
            expert: "text-red-500",
            native: "text-pink-500",
        };
        return {
            text:
                level?.charAt(0).toUpperCase() + level?.slice(1) ||
                "Intermediate",
            colorClass: colors[levelLower] || "text-gray-500",
        };
    };

    // Get profile picture URL
    const getProfilePicture = () => {
        const profilePic = user?.personal_information?.profile_picture;

        // If no profile picture, use avatar API
        if (!profilePic) {
            return `https://ui-avatars.com/api/?name=${user?.personal_information?.first_name}+${user?.personal_information?.last_name}&background=ff82a9&color=fff&size=200`;
        }

        // Check if it's already a full URL
        if (profilePic.startsWith("http")) {
            return profilePic;
        }

        // Handle Laravel storage path
        if (profilePic.startsWith("storage/")) {
            return `/${profilePic}`;
        }

        // Default: assume it's in storage
        return `/storage/${profilePic}`;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Roxanne Resume" />
            <div
                style={{ fontFamily: config.font_family }}
                className="min-h-screen bg-gray-50 p-4 md:p-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT – CONFIG PANEL */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
                            <Editing config={config} setConig={setConfig} />
                            <button
                                onClick={handlePrint}
                                className="mt-6 w-1/3 bg-blue-600 text-white py-2 mb-2 rounded"
                            >
                                Print Resume
                            </button>
                        </div>

                        {/* RIGHT – RESUME PREVIEW */}
                        <div className="lg:col-span-2 flex justify-center">
                            <div className="transform scale-90 lg:scale-100 origin-top">
                                <A4Page ref={printRef} className="shadow-2xl">
                                    {/* Main Container */}
                                    <div className="h-full flex">
                                        {/* Sidebar - 30% width */}
                                        <div
                                            className="w-2/5 p-6 flex flex-col"
                                            style={{
                                                backgroundColor:
                                                    config.sidebar_color,
                                            }}
                                        >
                                            {/* Profile Image */}
                                            <div className="mb-8">
                                                <img
                                                    className="rounded-full w-40 h-40 mx-auto object-cover border-4 border-white shadow-lg"
                                                    src={getProfilePicture()}
                                                    alt="Profile"
                                                />
                                            </div>

                                            {/* Contact Info */}
                                            <div className="space-y-4 mb-8">
                                                <h3 className="text-xl font-bold mb-4 text-white">
                                                    Contact
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center">
                                                        <span className="mr-3 text-white">
                                                            📧
                                                        </span>
                                                        <p className="text-sm text-white break-words">
                                                            {
                                                                user
                                                                    ?.personal_information
                                                                    ?.email
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="mr-3 text-white">
                                                            📞
                                                        </span>
                                                        <p className="text-sm text-white">
                                                            {
                                                                user
                                                                    ?.personal_information
                                                                    ?.phone_number
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="mr-3 text-white">
                                                            📍
                                                        </span>
                                                        <p className="text-sm text-white">
                                                            {
                                                                user
                                                                    ?.personal_information
                                                                    ?.country
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="mr-3 text-white">
                                                            🎂
                                                        </span>
                                                        <p className="text-sm text-white">
                                                            {formatDate(
                                                                user
                                                                    ?.personal_information
                                                                    ?.date_of_birth
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Skills Section */}
                                            <div className="mb-8">
                                                <h3 className="text-xl font-bold mb-4 text-white">
                                                    Skills
                                                </h3>
                                                <div className="space-y-4">
                                                    {user.skills?.map(
                                                        (skill, index) => {
                                                            const proficiency =
                                                                getProficiencyPercentage(
                                                                    skill.proficiency_level
                                                                );
                                                            const proficiencyInfo =
                                                                getProficiencyText(
                                                                    skill.proficiency_level
                                                                );

                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="mb-2"
                                                                >
                                                                    <div className="flex justify-between mb-1">
                                                                        <span className="text-sm font-medium text-white">
                                                                            {
                                                                                skill.name
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            className={`text-xs font-medium ${proficiencyInfo.colorClass}`}
                                                                        >
                                                                            {
                                                                                proficiencyInfo.text
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="w-full bg-white/30 rounded-full h-2">
                                                                        <div
                                                                            className="bg-white h-2 rounded-full transition-all duration-300"
                                                                            style={{
                                                                                width: `${proficiency}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>

                                            {/* Languages Section (if exists) */}
                                            {user.languages?.length > 0 && (
                                                <div className="mb-8">
                                                    <h3 className="text-xl font-bold mb-4 text-white">
                                                        Languages
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {user.languages.map(
                                                            (
                                                                language,
                                                                index
                                                            ) => {
                                                                const proficiency =
                                                                    getProficiencyPercentage(
                                                                        language.proficiency_level
                                                                    );
                                                                const proficiencyInfo =
                                                                    getProficiencyText(
                                                                        language.proficiency_level
                                                                    );

                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="mb-2"
                                                                    >
                                                                        <div className="flex justify-between mb-1">
                                                                            <span className="text-sm font-medium text-white">
                                                                                {
                                                                                    language.name
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                className={`text-xs font-medium ${proficiencyInfo.colorClass}`}
                                                                            >
                                                                                {
                                                                                    proficiencyInfo.text
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="w-full bg-white/30 rounded-full h-2">
                                                                            <div
                                                                                className="bg-white h-2 rounded-full"
                                                                                style={{
                                                                                    width: `${proficiency}%`,
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Main Content - 70% width */}
                                        <div className="w-3/5 p-8">
                                            {/* Name and Title */}
                                            <div className="mb-8">
                                                <h1
                                                    className="text-4xl font-bold mb-2"
                                                    style={{
                                                        color: config.font_primary_color,
                                                    }}
                                                >
                                                    {
                                                        user
                                                            ?.personal_information
                                                            ?.first_name
                                                    }{" "}
                                                    {
                                                        user
                                                            ?.personal_information
                                                            ?.last_name
                                                    }
                                                </h1>
                                                <div
                                                    className="w-16 h-1 mb-4"
                                                    style={{
                                                        backgroundColor:
                                                            config.sidebar_color,
                                                    }}
                                                ></div>
                                                {user?.personal_information
                                                    ?.headline && (
                                                    <p
                                                        className="text-lg font-medium"
                                                        style={{
                                                            color: config.font_secondary_color,
                                                        }}
                                                    >
                                                        {
                                                            user
                                                                .personal_information
                                                                .headline
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* About/Bio Section */}
                                            {user?.personal_information
                                                ?.bio && (
                                                <div className="mb-8">
                                                    <h3
                                                        className="text-xl font-bold mb-3 flex items-center"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        <span className="mr-2">
                                                            👤
                                                        </span>{" "}
                                                        About Me
                                                    </h3>
                                                    <p
                                                        className="text-sm leading-relaxed text-justify"
                                                        style={{
                                                            color: config.font_secondary_color,
                                                        }}
                                                    >
                                                        {
                                                            user
                                                                .personal_information
                                                                .bio
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {/* Experience Section */}
                                            <div className="mb-8">
                                                <h3
                                                    className="text-xl font-bold mb-4 flex items-center"
                                                    style={{
                                                        color: config.font_primary_color,
                                                    }}
                                                >
                                                    <span className="mr-2">
                                                        💼
                                                    </span>{" "}
                                                    Work Experience
                                                </h3>
                                                <div className="space-y-6">
                                                    {user.experiences?.map(
                                                        (exp, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative pl-6"
                                                            >
                                                                {/* Timeline dot */}
                                                                <div
                                                                    className="absolute left-0 top-0 w-3 h-3 rounded-full transform -translate-x-1/2"
                                                                    style={{
                                                                        backgroundColor:
                                                                            config.sidebar_color,
                                                                    }}
                                                                ></div>
                                                                {/* Vertical line */}
                                                                {index !==
                                                                    user
                                                                        .experiences
                                                                        .length -
                                                                        1 && (
                                                                    <div
                                                                        className="absolute left-0 top-3 w-0.5 h-full -translate-x-1/2"
                                                                        style={{
                                                                            backgroundColor: `${config.sidebar_color}50`,
                                                                        }}
                                                                    ></div>
                                                                )}

                                                                <div className="mb-2">
                                                                    <div className="flex justify-between items-start mb-1">
                                                                        <h4
                                                                            className="font-bold text-lg"
                                                                            style={{
                                                                                color: config.font_primary_color,
                                                                            }}
                                                                        >
                                                                            {
                                                                                exp.title
                                                                            }
                                                                        </h4>
                                                                        <span
                                                                            className="text-sm px-2 py-1 rounded whitespace-nowrap"
                                                                            style={{
                                                                                backgroundColor: `${config.sidebar_color}20`,
                                                                                color: config.font_secondary_color,
                                                                            }}
                                                                        >
                                                                            {formatDate(
                                                                                exp.start_date
                                                                            )}{" "}
                                                                            -{" "}
                                                                            {exp.end_date
                                                                                ? formatDate(
                                                                                      exp.end_date
                                                                                  )
                                                                                : "Present"}
                                                                        </span>
                                                                    </div>
                                                                    <p
                                                                        className="text-sm mb-2 font-medium"
                                                                        style={{
                                                                            color: config.sidebar_color,
                                                                        }}
                                                                    >
                                                                        {
                                                                            exp.company
                                                                        }{" "}
                                                                        •{" "}
                                                                        {
                                                                            exp.location
                                                                        }
                                                                    </p>
                                                                    {exp.description && (
                                                                        <p
                                                                            className="text-sm mt-2"
                                                                            style={{
                                                                                color: config.font_secondary_color,
                                                                            }}
                                                                        >
                                                                            {
                                                                                exp.description
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Education Section */}
                                            <div className="mb-8">
                                                <h3
                                                    className="text-xl font-bold mb-4 flex items-center"
                                                    style={{
                                                        color: config.font_primary_color,
                                                    }}
                                                >
                                                    <span className="mr-2">
                                                        🎓
                                                    </span>{" "}
                                                    Education
                                                </h3>
                                                <div className="space-y-6">
                                                    {user.educations?.map(
                                                        (edu, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-start"
                                                            >
                                                                <div
                                                                    className="mr-4 w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                                                    style={{
                                                                        backgroundColor:
                                                                            config.sidebar_color,
                                                                    }}
                                                                >
                                                                    <span className="text-lg">
                                                                        🎓
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4
                                                                        className="font-bold"
                                                                        style={{
                                                                            color: config.font_primary_color,
                                                                        }}
                                                                    >
                                                                        {
                                                                            edu.degree
                                                                        }
                                                                    </h4>
                                                                    <p
                                                                        className="text-sm font-medium mb-1"
                                                                        style={{
                                                                            color: config.sidebar_color,
                                                                        }}
                                                                    >
                                                                        {
                                                                            edu.institution
                                                                        }
                                                                    </p>
                                                                    <div className="flex justify-between items-center mt-1">
                                                                        <span
                                                                            className="text-xs px-2 py-1 rounded"
                                                                            style={{
                                                                                backgroundColor: `${config.sidebar_color}20`,
                                                                                color: config.font_secondary_color,
                                                                            }}
                                                                        >
                                                                            Graduated:{" "}
                                                                            {
                                                                                edu.graduation_year
                                                                            }
                                                                        </span>
                                                                        {edu.gpa && (
                                                                            <span
                                                                                className="text-sm font-bold"
                                                                                style={{
                                                                                    color: config.font_secondary_color,
                                                                                }}
                                                                            >
                                                                                GPA:{" "}
                                                                                {
                                                                                    edu.gpa
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {edu.field_of_study && (
                                                                        <p
                                                                            className="text-sm mt-1"
                                                                            style={{
                                                                                color: config.font_secondary_color,
                                                                            }}
                                                                        >
                                                                            <span className="font-medium">
                                                                                Field:
                                                                            </span>{" "}
                                                                            {
                                                                                edu.field_of_study
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Certifications Section */}
                                            {user.certifications?.length >
                                                0 && (
                                                <div>
                                                    <h3
                                                        className="text-xl font-bold mb-4 flex items-center"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        <span className="mr-2">
                                                            🏆
                                                        </span>{" "}
                                                        Certifications
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {user.certifications.map(
                                                            (cert, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="px-3 py-2 rounded-lg flex items-center"
                                                                    style={{
                                                                        backgroundColor: `${config.sidebar_color}15`,
                                                                        border: `1px solid ${config.sidebar_color}30`,
                                                                    }}
                                                                >
                                                                    <span
                                                                        className="mr-2"
                                                                        style={{
                                                                            color: config.sidebar_color,
                                                                        }}
                                                                    >
                                                                        📜
                                                                    </span>
                                                                    <span
                                                                        className="text-sm font-medium"
                                                                        style={{
                                                                            color: config.font_secondary_color,
                                                                        }}
                                                                    >
                                                                        {
                                                                            cert.name
                                                                        }
                                                                    </span>
                                                                    {cert.issuing_organization && (
                                                                        <span
                                                                            className="text-xs ml-2 px-1"
                                                                            style={{
                                                                                color: config.sidebar_color,
                                                                            }}
                                                                        >
                                                                            (
                                                                            {
                                                                                cert.issuing_organization
                                                                            }
                                                                            )
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </A4Page>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
