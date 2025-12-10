import DataInput from "@/Components/DataInput";
import Form from "@/Components/Form";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Education() {
    const [successMessage, setSuccessMessage] = useState("");

    const { data, setData, processing, post, errors, reset } = useForm({
        degree: "",
        institution: "",
        graduation_year: "",
        field_of_study: "",
        gpa: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("education.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSuccessMessage("Education information saved successfully.");
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0a1128] flex justify-center lg:justify-around items-center ">
            <div>
                <h2 className="text-2xl hidden lg:block text-[#e0e2db] font-bold mb-2 border-b-2 border-gray-300 pb-1">
                    Education
                </h2>

                <p className="hidden lg:block text-[#e0e2db] text-start max-w-lg px-5">
                    The Education section of your CV should clearly highlight
                    your academic background in a simple and organized way.
                    Start by listing your highest or most recent qualification
                    first, including the degree or certificate name, the
                    institution, and the graduation year. If you’re still
                    studying, write your expected graduation date. You can also
                    include relevant coursework, academic achievements, GPA (if
                    strong), or honors such as “Dean’s List.” Keep this section
                    concise and focused on details that support the job you’re
                    applying for, helping employers quickly understand your
                    educational foundation.
                </p>
            </div>

            <div className="lg:w-full max-w-md">
                <Form onSubmit={submit}>
                    <h1 className="text-[#e0e2db] self-start mb-2">
                        Education
                    </h1>

                    {/* DEGREE */}
                    <select
                        className="bg-white px-3 py-2 rounded-lg mb-1 w-full"
                        value={data.degree}
                        onChange={(e) => setData("degree", e.target.value)}
                    >
                        <option disabled value="">
                            Degree Type
                        </option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                    </select>
                    {errors.degree && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.degree}
                        </p>
                    )}

                    {/* INSTITUTION */}
                    <DataInput
                        name="institution"
                        placeholder="Institution Name"
                        className="bg-white px-3 py-2 rounded-lg w-full"
                        value={data.institution}
                        onChange={(e) => setData("institution", e.target.value)}
                    />
                    {errors.institution && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.institution}
                        </p>
                    )}

                    {/* GRADUATION YEAR */}
                    <DataInput
                        name="graduation_year"
                        type="number"
                        min={1920}
                        max={2040}
                        placeholder="Graduation Year"
                        className="bg-white px-3 py-2 rounded-lg w-full"
                        value={data.graduation_year}
                        onChange={(e) =>
                            setData("graduation_year", e.target.value)
                        }
                    />
                    {errors.graduation_year && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.graduation_year}
                        </p>
                    )}

                    {/* FIELD OF STUDY */}
                    <DataInput
                        name="field_of_study"
                        placeholder="Field of Study"
                        className="bg-white px-3 py-2 rounded-lg w-full"
                        value={data.field_of_study}
                        onChange={(e) =>
                            setData("field_of_study", e.target.value)
                        }
                    />
                    {errors.field_of_study && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.field_of_study}
                        </p>
                    )}

                    {/* GPA */}
                    <DataInput
                        name="gpa"
                        placeholder="GPA (Optional)"
                        className="bg-white px-3 py-2 rounded-lg w-full"
                        value={data.gpa}
                        onChange={(e) => setData("gpa", e.target.value)}
                    />
                    {errors.gpa && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.gpa}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 px-6 py-2 bg-[#fff] text-[#0a1128] rounded font-lato self-start"
                    >
                        Add Education
                    </button>
                    {successMessage && (
                        <p className="text-green-600 text-sm self-start mt-2">
                            {successMessage}
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}
