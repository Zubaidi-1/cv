import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import Editing from "./partials/Editing";
import A4Page from "@/Components/A4";
import { useReactToPrint } from "react-to-print";

/* =======================
   Helpers
======================= */

// Experiences: latest first (Present on top)
const orderExperiencesDesc = (experiences = []) => {
    return [...experiences].sort((a, b) => {
        const endA = a.end_date ? new Date(a.end_date) : new Date();
        const endB = b.end_date ? new Date(b.end_date) : new Date();
        return endB - endA;
    });
};

// Educations: latest graduation first (Present on top)
const orderEducationsDesc = (educations = []) => {
    return [...educations].sort((a, b) => {
        const gradA = a.graduation_year
            ? new Date(a.graduation_year)
            : new Date();
        const gradB = b.graduation_year
            ? new Date(b.graduation_year)
            : new Date();
        return gradB - gradA;
    });
};

// Format date (DOB)
const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export default function Vero() {
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Dave_CV",
    });
    const [config, setConig] = useState({
        sidebar_color: "#aabbcc",
        font_primary_color: "#112233",
        font_secondary_color: "#445566",
        link_color: "#334455",
        font_family: "Arial, sans-serif",
    });

    const user = usePage().props.auth.user;

    const orderedExperiences = orderExperiencesDesc(user?.experiences);
    const orderedEducations = orderEducationsDesc(user?.educations);

    return (
        <AuthenticatedLayout>
            <Head title="Vero Layout" />

            <div className="min-h-screen grid grid-cols-2 justify-center items-center">
                {/* LEFT – CONFIG PANEL */}
                <div className="w-1/3 h-full bg-white flex flex-col justify-center items-center">
                    <Editing config={config} setConig={setConig} />
                    <button
                        onClick={handlePrint}
                        className="mt-6 w-1/2 mb-4 bg-blue-600 text-white py-2 rounded"
                    >
                        Print Resume
                    </button>
                </div>

                {/* RIGHT – A4 PREVIEW */}
                <div className="self-start justify-self-start">
                    <A4Page ref={printRef}>
                        <div className="grid grid-cols-[240px_1fr]">
                            {/* SIDEBAR */}
                            <div
                                className="h-[1123px] flex flex-col items-center"
                                style={{
                                    backgroundColor: config.sidebar_color,
                                }}
                            >
                                <img
                                    className="rounded-full w-32 h-32 my-14 object-fit mb-8"
                                    src={`/storage/${user?.personal_information?.profile_picture}`}
                                    alt="Profile"
                                />

                                <h1
                                    className="font-bold text-xl mb-4"
                                    style={{
                                        fontFamily: config.font_family,
                                        color: config.font_primary_color,
                                    }}
                                >
                                    {user.personal_information.first_name}{" "}
                                    {user.personal_information.last_name}
                                </h1>

                                {/* PERSONAL INFORMATION */}
                                <div
                                    className="self-start ml-4 mt-4 flex flex-col gap-2"
                                    style={{ fontFamily: config.font_family }}
                                >
                                    <p
                                        className="text-sm font-bold"
                                        style={{
                                            color: config.font_primary_color,
                                            textDecoration: "underline",
                                            textDecorationColor:
                                                config.link_color,
                                            textUnderlineOffset: "2px",
                                        }}
                                    >
                                        Personal information
                                    </p>

                                    <p
                                        className="text-sm"
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        📧 {user.personal_information.email}
                                    </p>

                                    <p
                                        className="text-sm"
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        📞{" "}
                                        {user.personal_information.phone_number}
                                    </p>

                                    {user.personal_information
                                        .date_of_birth && (
                                        <p
                                            className="text-sm"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            🎂{" "}
                                            {formatDate(
                                                user.personal_information
                                                    .date_of_birth
                                            )}
                                        </p>
                                    )}

                                    <p
                                        className="text-sm"
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        🌏{" "}
                                        {user.personal_information.city
                                            ? `${user.personal_information.city}, `
                                            : ""}
                                        {user.personal_information.country}
                                    </p>

                                    {user.personal_information.address && (
                                        <p
                                            className="text-sm"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            🏠{" "}
                                            {user.personal_information.address}
                                        </p>
                                    )}
                                </div>

                                {/* SKILLS */}
                                <div
                                    className="self-start ml-4 mt-4 flex flex-col gap-2"
                                    style={{ fontFamily: config.font_family }}
                                >
                                    <p
                                        className="text-sm font-bold"
                                        style={{
                                            color: config.font_primary_color,
                                            textDecoration: "underline",
                                            textDecorationColor:
                                                config.link_color,
                                            textUnderlineOffset: "2px",
                                        }}
                                    >
                                        Skills
                                    </p>

                                    {user?.skills?.map((skill) => (
                                        <p
                                            key={skill.id}
                                            className="text-sm"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            {skill.name}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* MAIN CONTENT */}
                            <div className="flex flex-col">
                                {/* OBJECTIVE */}
                                <div
                                    className="px-8 pt-10"
                                    style={{ fontFamily: config.font_family }}
                                >
                                    <h2
                                        className="text-sm font-bold uppercase tracking-wide"
                                        style={{
                                            color: config.font_primary_color,
                                            borderBottom: `2px solid ${config.link_color}`,
                                            width: "fit-content",
                                        }}
                                    >
                                        Objective
                                    </h2>

                                    <p
                                        className="mt-4 text-sm leading-relaxed text-justify"
                                        style={{
                                            color: config.font_secondary_color,
                                        }}
                                    >
                                        {user?.objective?.objective}
                                    </p>
                                </div>

                                {/* EDUCATION */}
                                <div
                                    className="px-8 pt-10 self-start"
                                    style={{ fontFamily: config.font_family }}
                                >
                                    <h2
                                        className="text-sm font-bold uppercase tracking-wide"
                                        style={{
                                            color: config.font_primary_color,
                                            borderBottom: `2px solid ${config.link_color}`,
                                            width: "fit-content",
                                        }}
                                    >
                                        Education
                                    </h2>

                                    {orderedEducations?.map((edu, i) => (
                                        <div
                                            key={i}
                                            className="mt-4 text-sm"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            <p
                                                className="font-semibold"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                {edu.degree} —{" "}
                                                {edu.field_of_study}
                                            </p>

                                            <p className="italic text-xs mt-1">
                                                {edu.institution}
                                            </p>

                                            <div className="flex justify-between mt-2 text-xs">
                                                <span>
                                                    {edu.start_date} –{" "}
                                                    {edu.graduation_year ||
                                                        "Present"}
                                                </span>

                                                {edu.gpa && (
                                                    <span>
                                                        GPA:{" "}
                                                        <strong
                                                            style={{
                                                                color: config.font_primary_color,
                                                            }}
                                                        >
                                                            {edu.gpa}
                                                        </strong>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* EXPERIENCE */}
                                <div
                                    className="px-8 pt-10 self-start"
                                    style={{ fontFamily: config.font_family }}
                                >
                                    <h2
                                        className="text-sm font-bold uppercase tracking-wide"
                                        style={{
                                            color: config.font_primary_color,
                                            borderBottom: `2px solid ${config.link_color}`,
                                            width: "fit-content",
                                        }}
                                    >
                                        Experience
                                    </h2>

                                    {orderedExperiences?.map((exp, i) => (
                                        <div
                                            key={i}
                                            className="mt-4 text-sm"
                                            style={{
                                                color: config.font_secondary_color,
                                            }}
                                        >
                                            <p
                                                className="font-semibold"
                                                style={{
                                                    color: config.font_primary_color,
                                                }}
                                            >
                                                {exp.title}
                                            </p>

                                            <p className="italic text-xs">
                                                {exp.company}
                                            </p>

                                            <p className="text-xs mt-1">
                                                {exp.start_date} –{" "}
                                                {exp.end_date || "Present"}
                                            </p>

                                            {exp.description && (
                                                <p className="mt-2 text-xs leading-relaxed text-justify">
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </A4Page>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
