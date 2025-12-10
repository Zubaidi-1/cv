import DataInput from "@/Components/DataInput";
import Form from "@/Components/Form";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Skill() {
    const [onSuccessMessage, setOnSuccessMessage] = useState("");
    const { data, setData, processing, post, errors, reset } = useForm({
        proficiency_level: "",
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("skills.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOnSuccessMessage("Skill added successfully.");
            },
            onError: (response) => {
                console.log(response);
            },
        });
    };

    return (
        <div className="min-h-screen flex justify-center lg:justify-around items-center">
            <div className="hidden lg:block lg:w-1/3">
                <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-300 pb-1">
                    Skills
                </h2>
                <p className="text-start">
                    Skills in a CV are essential because they give employers a
                    clear, immediate understanding of what you can do and how
                    well you can contribute to the role. While education and
                    experience show your background, the skills section
                    highlights your practical abilities, both technical and
                    interpersonal, that directly impact job performance. It
                    helps employers quickly assess whether you’re a good fit for
                    their needs. Well-chosen skills can also set you apart by
                    showcasing strengths that align with the role.
                </p>
            </div>

            <div className="lg:w-full max-w-md">
                <Form onSubmit={submit}>
                    <div className="self-start mb-2 lg:mb-4 text-[#0a1128]">
                        <h1 className="self-start lg:text-xl">Skills</h1>
                        <p className="text-xs lg:text-sm">
                            You can add as many
                        </p>
                    </div>

                    {/* SKILL LEVEL */}
                    <select
                        className="bg-white lg:text-lg px-3 py-2 rounded-lg mb-1 w-full"
                        value={data.proficiency_level}
                        onChange={(e) =>
                            setData("proficiency_level", e.target.value)
                        }
                    >
                        <option disabled value="">
                            Skill Level
                        </option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="proficient">Proficient</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    {errors.proficiency_level && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.proficiency_level}
                        </p>
                    )}

                    {/* SKILL NAME */}
                    <DataInput
                        name="name"
                        placeholder="Skill Name"
                        className="bg-white px-3 py-2 rounded-lg w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mb-2">
                            {errors.name}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-2 px-4 py-2 bg-[#0a1128] text-white rounded font-lato self-start"
                    >
                        Add Skill
                    </button>
                    {onSuccessMessage && (
                        <p className="text-green-600 text-sm self-start mt-2">
                            {onSuccessMessage}
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}
