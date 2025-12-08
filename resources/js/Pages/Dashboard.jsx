import DataInput from "@/Components/DataInput";
import Form from "@/Components/Form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12 lg:flex lg:min-h-screen  lg:justify-around lg:items-center">
                <div>
                    <h1 className="font-lado text-3xl mb-2 text-center text-[#0a1128]">
                        Let's start with your personal information.
                    </h1>
                    <h3 className="font-lado text-lg text-gray-600 text-center text-[#001f54]">
                        This information will help us tailor your CV to your
                        needs.
                    </h3>
                    <p className="font-lado text-center text-[#1282a2] flex justify-center items-center gap-2 mt-4">
                        Do not worry, you can permantly delete your data. I
                        promise.
                        <Link
                            target="_blank"
                            href="https://zubaidi-1.github.io"
                        >
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
                        </Link>
                    </p>
                </div>
                <div className="flex justify-center items-center ">
                    <Form>
                        <div className="mb-2 self-start">
                            <h1 className="font-lato ">Personal Information</h1>
                        </div>
                        <DataInput name={"first_name"} placeholder={"John"} />
                        <DataInput name={"last_name"} placeholder={"Doe"} />
                        <DataInput
                            name={"email"}
                            placeholder={"JohnDoe@example.com"}
                        />
                        <DataInput
                            name={"phone_number"}
                            placeholder={"+962771234567"}
                        />
                        <label className="ml-2 font-lato text-gray-600 self-start">
                            Date of Birth
                        </label>
                        <DataInput
                            name={"date_of_birth"}
                            placeholder={"09-01-1999"}
                            type={"date"}
                            className={"w-full text-gray-400 "}
                        />
                    </Form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
