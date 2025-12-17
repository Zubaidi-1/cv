import { useRef, useState } from "react";
import Editing from "./partials/Editing";
import A4Page from "@/Components/A4";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";

export default function Albert() {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Albert_CV",
    });
    const user = usePage().props.auth.user;

    const [config, setConfig] = useState({
        font_primary_color: "#1a365d", // Deep professional blue
        primary_color: "#000000",
        secondary_color: "#4a5568",
        font_family: "Georgia, serif",
        section_spacing: "1.5rem",
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

    return (
        <AuthenticatedLayout>
            <Head title="Albert Resume" />
            <div
                style={{ fontFamily: config.font_family }}
                className="min-h-screen bg-gray-50 p-4 md:p-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT – CONFIG PANEL */}
                        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                                Resume Customization
                            </h2>
                            <Editing config={config} setConig={setConfig} />
                            <button
                                onClick={handlePrint}
                                className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
                            >
                                Print Resume
                            </button>
                        </div>

                        {/* RIGHT – RESUME PREVIEW */}
                        <div className="lg:col-span-2 flex justify-center">
                            <div className="w-full max-w-3xl">
                                <A4Page
                                    ref={printRef}
                                    className="shadow-lg bg-white"
                                >
                                    {/* Professional Header */}
                                    <div className="p-8">
                                        {/* Name and Title */}
                                        <div className="text-center mb-6 border-b pb-6 border-gray-300">
                                            <h1
                                                className="text-3xl font-bold tracking-tight mb-2"
                                                style={{
                                                    color: config.primary_color,
                                                }}
                                            >
                                                {
                                                    user.personal_information
                                                        .first_name
                                                }{" "}
                                                <span
                                                    style={{
                                                        color: config.font_primary_color,
                                                    }}
                                                >
                                                    {
                                                        user
                                                            .personal_information
                                                            .last_name
                                                    }
                                                </span>
                                            </h1>
                                            {user.personal_information
                                                .headline && (
                                                <p
                                                    className="text-lg font-medium"
                                                    style={{
                                                        color: config.font_family,
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

                                        {/* Contact Information */}
                                        <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
                                            {user.personal_information
                                                .email && (
                                                <div className="flex items-center">
                                                    <span
                                                        className="mr-1"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        ✉️
                                                    </span>
                                                    <a
                                                        href={`mailto:${user.personal_information.email}`}
                                                        className="hover:underline"
                                                        style={{
                                                            color: config.secondary_color,
                                                        }}
                                                    >
                                                        {
                                                            user
                                                                .personal_information
                                                                .email
                                                        }
                                                    </a>
                                                </div>
                                            )}
                                            {user.personal_information
                                                .phone_number && (
                                                <div className="flex items-center">
                                                    <span
                                                        className="mr-1"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        📱
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: config.secondary_color,
                                                        }}
                                                    >
                                                        {
                                                            user
                                                                .personal_information
                                                                .phone_number
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                            {user.personal_information
                                                .country && (
                                                <div className="flex items-center">
                                                    <span
                                                        className="mr-1"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        📍
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: config.secondary_color,
                                                        }}
                                                    >
                                                        {
                                                            user
                                                                .personal_information
                                                                .country
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Main Content - Two Columns */}
                                        <div className="grid grid-cols-3 gap-8">
                                            {/* Left Column - Main Content */}
                                            <div className="col-span-2 space-y-4">
                                                {/* Professional Summary */}
                                                {user.objective?.objective && (
                                                    <div>
                                                        <div className="flex items-center mb-3">
                                                            <div
                                                                className="w-8 h-0.5 mr-3"
                                                                style={{
                                                                    backgroundColor:
                                                                        config.font_primary_color,
                                                                }}
                                                            ></div>
                                                            <h2
                                                                className="text-lg font-bold uppercase tracking-wider"
                                                                style={{
                                                                    color: config.font_primary_color,
                                                                }}
                                                            >
                                                                Summary
                                                            </h2>
                                                        </div>
                                                        <p
                                                            className="text-sm leading-relaxed text-gray-700"
                                                            style={{
                                                                color: config.secondary_color,
                                                            }}
                                                        >
                                                            {
                                                                user.objective
                                                                    .objective
                                                            }
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Professional Experience */}
                                                <div>
                                                    <div className="flex items-center mb-">
                                                        <div
                                                            className="w-8 h-0.5 mr-3"
                                                            style={{
                                                                backgroundColor:
                                                                    config.font_primary_color,
                                                            }}
                                                        ></div>
                                                        <h2
                                                            className="text-lg font-bold uppercase tracking-wider"
                                                            style={{
                                                                color: config.font_primary_color,
                                                            }}
                                                        >
                                                            Professional
                                                            Experience
                                                        </h2>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {user.experiences.map(
                                                            (experience) => (
                                                                <div
                                                                    key={
                                                                        experience.id
                                                                    }
                                                                >
                                                                    <div className="mb-1">
                                                                        <div className="flex justify-between items-start">
                                                                            <h3
                                                                                className="font-bold text-base"
                                                                                style={{
                                                                                    color: config.primary_color,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    experience.title
                                                                                }
                                                                            </h3>
                                                                            <p
                                                                                className="text-sm whitespace-nowrap"
                                                                                style={{
                                                                                    color: config.secondary_color,
                                                                                }}
                                                                            >
                                                                                {formatDate(
                                                                                    experience.start_date
                                                                                )}{" "}
                                                                                –{" "}
                                                                                {experience.end_date
                                                                                    ? formatDate(
                                                                                          experience.end_date
                                                                                      )
                                                                                    : "Present"}
                                                                            </p>
                                                                        </div>
                                                                        <p
                                                                            className="text-sm font-medium italic"
                                                                            style={{
                                                                                color: config.font_primary_color,
                                                                            }}
                                                                        >
                                                                            {
                                                                                experience.company
                                                                            }{" "}
                                                                            •{" "}
                                                                            {
                                                                                experience.location
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    {experience.description && (
                                                                        <ul className="list-none mt-2">
                                                                            {experience.description
                                                                                .split(
                                                                                    "\n"
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className="text-sm leading-relaxed mb-1 flex items-start"
                                                                                            style={{
                                                                                                color: config.secondary_color,
                                                                                            }}
                                                                                        >
                                                                                            <span
                                                                                                className="mr-2 mt-1 text-xs"
                                                                                                style={{
                                                                                                    color: config.font_primary_color,
                                                                                                }}
                                                                                            >
                                                                                                ▸
                                                                                            </span>
                                                                                            {item.trim()}
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Education */}
                                                <div>
                                                    <div className="flex items-center mt-2 mb-2">
                                                        <div
                                                            className="w-8 h-0.5 mr-3 "
                                                            style={{
                                                                backgroundColor:
                                                                    config.font_primary_color,
                                                            }}
                                                        ></div>
                                                        <h2
                                                            className="text-lg font-bold uppercase tracking-wider"
                                                            style={{
                                                                color: config.font_primary_color,
                                                            }}
                                                        >
                                                            Education
                                                        </h2>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {user.educations.map(
                                                            (education) => (
                                                                <div
                                                                    key={
                                                                        education.id
                                                                    }
                                                                >
                                                                    <div className="flex justify-between items-start mb-1">
                                                                        <div>
                                                                            <h3
                                                                                className="font-bold text-base"
                                                                                style={{
                                                                                    color: config.primary_color,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    education.degree
                                                                                }
                                                                            </h3>
                                                                            <p
                                                                                className="text-sm font-medium"
                                                                                style={{
                                                                                    color: config.font_primary_color,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    education.institution
                                                                                }
                                                                            </p>
                                                                            {education.field_of_study && (
                                                                                <p
                                                                                    className="text-sm"
                                                                                    style={{
                                                                                        color: config.secondary_color,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        education.field_of_study
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <p
                                                                            className="text-sm whitespace-nowrap"
                                                                            style={{
                                                                                color: config.secondary_color,
                                                                            }}
                                                                        >
                                                                            {
                                                                                education.graduation_year
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column - Side Information */}
                                            <div className="space-y-8">
                                                {/* Certifications */}
                                                {user.certifications?.length >
                                                    0 && (
                                                    <div>
                                                        <div className="flex items-center mb-3">
                                                            <div
                                                                className="w-8 h-0.5 "
                                                                style={{
                                                                    backgroundColor:
                                                                        config.font_primary_color,
                                                                }}
                                                            ></div>
                                                            <h2
                                                                className="text-lg font-bold uppercase tracking-wider"
                                                                style={{
                                                                    color: config.font_primary_color,
                                                                }}
                                                            >
                                                                Certifications
                                                            </h2>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {user.certifications.map(
                                                                (cert) => (
                                                                    <div
                                                                        key={
                                                                            cert.id
                                                                        }
                                                                        className="text-sm"
                                                                    >
                                                                        <p
                                                                            className="font-medium"
                                                                            style={{
                                                                                color: config.primary_color,
                                                                            }}
                                                                        >
                                                                            {
                                                                                cert.name
                                                                            }
                                                                        </p>
                                                                        {cert.issuing_organization && (
                                                                            <p
                                                                                className="text-xs italic"
                                                                                style={{
                                                                                    color: config.secondary_color,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    cert.issuing_organization
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Languages */}
                                                {user.languages?.length > 0 && (
                                                    <div>
                                                        <div className="flex items-center mb-3">
                                                            <div
                                                                className="w-8 h-0.5 "
                                                                style={{
                                                                    backgroundColor:
                                                                        config.font_primary_color,
                                                                }}
                                                            ></div>
                                                            <h2
                                                                className="text-lg font-bold uppercase tracking-wider"
                                                                style={{
                                                                    color: config.font_primary_color,
                                                                }}
                                                            >
                                                                Languages
                                                            </h2>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {user.languages.map(
                                                                (language) => (
                                                                    <div
                                                                        key={
                                                                            language.id
                                                                        }
                                                                        className="text-sm"
                                                                    >
                                                                        <div className="flex justify-between">
                                                                            <span
                                                                                style={{
                                                                                    color: config.primary_color,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    language.name
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                className="text-xs"
                                                                                style={{
                                                                                    color: config.secondary_color,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    language.proficiency_level
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="w-full bg-gray-200 h-1 mt-1">
                                                                            <div
                                                                                className="h-1"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        config.font_primary_color,
                                                                                    width:
                                                                                        language.proficiency_level ===
                                                                                        "Native"
                                                                                            ? "100%"
                                                                                            : language.proficiency_level ===
                                                                                              "Fluent"
                                                                                            ? "90%"
                                                                                            : language.proficiency_level ===
                                                                                              "Advanced"
                                                                                            ? "80%"
                                                                                            : language.proficiency_level ===
                                                                                              "Intermediate"
                                                                                            ? "60%"
                                                                                            : "40%",
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Technical Skills Section */}
                                        {user.skills?.length > 0 && (
                                            <div className="mt-2 pt-2 border-t border-gray-300">
                                                <div className="flex items-center mb-6">
                                                    <div
                                                        className="w-8 h-0.5 "
                                                        style={{
                                                            backgroundColor:
                                                                config.font_primary_color,
                                                        }}
                                                    ></div>
                                                    <h2
                                                        className="text-lg font-bold uppercase tracking-wider"
                                                        style={{
                                                            color: config.font_primary_color,
                                                        }}
                                                    >
                                                        Technical Expertise
                                                    </h2>
                                                </div>

                                                {/* Skills Grid */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    {user.skills.map(
                                                        (skill, index) => (
                                                            <div
                                                                key={
                                                                    skill.id ||
                                                                    index
                                                                }
                                                                className="border border-gray-200 rounded p-3 hover:shadow-sm transition-shadow duration-200"
                                                                style={{
                                                                    backgroundColor: `${config.font_primary_color}03`,
                                                                    borderColor: `${config.font_primary_color}20`,
                                                                }}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h4
                                                                        className="font-medium text-sm"
                                                                        style={{
                                                                            color: config.primary_color,
                                                                        }}
                                                                    >
                                                                        {
                                                                            skill.name
                                                                        }
                                                                    </h4>
                                                                    <span
                                                                        className="text-xs px-2 py-1 rounded"
                                                                        style={{
                                                                            backgroundColor: `${config.font_primary_color}10`,
                                                                            color: config.font_primary_color,
                                                                            fontWeight:
                                                                                "500",
                                                                        }}
                                                                    >
                                                                        {
                                                                            skill.proficiency_level
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="w-full bg-gray-100 h-1.5 rounded-full">
                                                                    <div
                                                                        className="h-1.5 rounded-full"
                                                                        style={{
                                                                            backgroundColor:
                                                                                config.font_primary_color,
                                                                            width:
                                                                                skill.proficiency_level ===
                                                                                "Expert"
                                                                                    ? "95%"
                                                                                    : skill.proficiency_level ===
                                                                                      "Advanced"
                                                                                    ? "85%"
                                                                                    : skill.proficiency_level ===
                                                                                      "Intermediate"
                                                                                    ? "70%"
                                                                                    : skill.proficiency_level ===
                                                                                      "Beginner"
                                                                                    ? "45%"
                                                                                    : skill.proficiency_level ===
                                                                                      "Proficient"
                                                                                    ? "80%"
                                                                                    : "60%",
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
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
