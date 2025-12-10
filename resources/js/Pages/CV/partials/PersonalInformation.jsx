import DataInput from "@/Components/DataInput";
import Form from "@/Components/Form";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function PersonalInformation() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        phone_number: "",
        date_of_birth: "",
        profile_picture: null, // NEW FIELD
    });

    const [successMessage, setSuccessMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();

        console.log("Submitting data:", data);

        post(route("personal-information.store"), {
            forceFormData: true, // IMPORTANT for file uploads
            onSuccess: (response) => {
                console.log("Success:", response);
                setSuccessMessage(
                    "Your information has been saved successfully!"
                );
                reset();
            },
            onError: (err) => {
                console.log("Validation errors:", err);
                setSuccessMessage("");
            },
        });
    };

    return (
        <div className="py-12 lg:flex lg:min-h-screen lg:justify-around lg:items-center">
            <div className="hidden md:block">
                <h1 className="font-lado text-3xl mb-2 text-center text-[#0a1128]">
                    Let's start with your personal information.
                </h1>
                <h3 className="font-lado text-lg text-gray-600 text-center text-[#001f54]">
                    This information will help us tailor your CV to your needs.
                </h3>
                <p className="font-lado text-center text-[#1282a2] flex justify-center items-center gap-2 mt-4">
                    Do not worry, you can permantly delete your data. I promise.
                    <a target="_blank" href="https://github.com/Zubaidi-1/cv">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#0a1128"
                            className="bi bi-github"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                    </a>
                </p>
            </div>

            <div className="flex justify-center items-center">
                <Form onSubmit={submit}>
                    <div className="mb-2 self-start">
                        <h1 className="font-lato lg:text-sm text-[#0a1128]">
                            Personal Information
                        </h1>
                    </div>

                    {/* SUCCESS MESSAGE */}
                    {successMessage && (
                        <div className="mb-4 p-2 bg-green-200 text-green-900 rounded">
                            {successMessage}
                        </div>
                    )}

                    {/* FIRST NAME */}
                    <DataInput
                        className={"lg:w-full"}
                        name="first_name"
                        placeholder="John"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                    />
                    {errors.first_name && (
                        <span className="text-red-500 text-sm">
                            {errors.first_name}
                        </span>
                    )}

                    {/* LAST NAME */}
                    <DataInput
                        className={"lg:w-full"}
                        name="last_name"
                        placeholder="Doe"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                    />
                    {errors.last_name && (
                        <span className="text-red-500 text-sm">
                            {errors.last_name}
                        </span>
                    )}

                    {/* EMAIL */}
                    <DataInput
                        className={"lg:w-full"}
                        name="email"
                        placeholder="JohnDoe@example.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email}
                        </span>
                    )}

                    {/* PHONE */}
                    <DataInput
                        className={"lg:w-full"}
                        name="phone_number"
                        placeholder="+962771234567"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                    />
                    {errors.phone_number && (
                        <span className="text-red-500 text-sm">
                            {errors.phone_number}
                        </span>
                    )}

                    {/* COUNTRY */}
                    <DataInput
                        className={"lg:w-full"}
                        name="country"
                        placeholder="Jordan"
                        value={data.country}
                        onChange={(e) => setData("country", e.target.value)}
                    />
                    {errors.country && (
                        <span className="text-red-500 text-sm">
                            {errors.country}
                        </span>
                    )}

                    {/* PROFILE PICTURE */}
                    <label className="ml-2 font-lato text-[#0a1128] self-start lg:text-sm">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profile_picture"
                        className="lg:w-full mt-1 mb-2"
                        onChange={(e) =>
                            setData("profile_picture", e.target.files[0])
                        }
                    />
                    {errors.profile_picture && (
                        <span className="text-red-500 text-sm">
                            {errors.profile_picture}
                        </span>
                    )}

                    {/* DATE OF BIRTH */}
                    <label className="ml-2 font-lato text-[#0a1128] self-start lg:text-sm lg:mt-2">
                        Date of Birth
                    </label>
                    <DataInput
                        name="date_of_birth"
                        type="date"
                        className="lg:w-full text-gray-400"
                        value={data.date_of_birth}
                        onChange={(e) =>
                            setData("date_of_birth", e.target.value)
                        }
                    />
                    {errors.date_of_birth && (
                        <span className="text-red-500 text-sm">
                            {errors.date_of_birth}
                        </span>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 px-4 py-2 bg-[#0a1128] text-white rounded font-lato lg:w-full"
                    >
                        {processing ? "Saving..." : "Save"}
                    </button>
                </Form>
            </div>
        </div>
    );
}
