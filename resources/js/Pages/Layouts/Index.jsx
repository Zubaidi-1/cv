import Github from "@/Components/Github";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Dashboard({ layouts }) {
    const MotionLink = motion(Link);
    console.log(layouts);
    const user = usePage().props.auth.user;

    const [warning, setWarning] = useState("");

    return (
        <AuthenticatedLayout>
            <Head title="Layouts" />
            <div className="min-h-screen flex flex-col  justify-center items-center ">
                <h1 className="lg:text-3xl font-bold text-indie lg:mb-8">
                    Our Layouts
                </h1>
                <div className="flex justify-around items-center">
                    <div className="grid grid-cols-2 lg:w-1/3">
                        {layouts?.map((layout) => (
                            <MotionLink
                                href={route("layouts.show", layout.id)}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "#0a1128",
                                    borderRadius: "10px",
                                }}
                                whileTap={{ scale: 0.9 }}
                                key={layout.id}
                                className="m-4 p-4 border bg-[#c3dee5] shadow shadow-lg text-[#0a1128] rounded"
                            >
                                <h2 className="text-xl font-bold mb-2">
                                    {layout.name}
                                </h2>
                                <p className="mb-2">{layout.description}</p>
                                {layout.thumbnail_path && (
                                    <img
                                        src={layout.thumbnail_path}
                                        alt={`${layout.name} Thumbnail`}
                                        className="w-48 h-auto hidden lg:block"
                                    />
                                )}
                                <div className="mt-3 p-3 bg-[#e8f3f7] rounded shadow-inner">
                                    <p className="text-sm font-semibold text-[#0a1128] mb-2">
                                        This layout includes:
                                    </p>

                                    <ul className="space-y-1 text-sm">
                                        <li className="flex items-center gap-2">
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full ${
                                                    layout.default_config
                                                        .profile_picture
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                }`}
                                            />
                                            {layout.default_config
                                                .profile_picture
                                                ? "Profile picture section"
                                                : "No profile picture section"}
                                        </li>

                                        <li className="flex items-center gap-2">
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full ${
                                                    layout.default_config
                                                        .objective
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                }`}
                                            />
                                            {layout.default_config.objective
                                                ? "Objective section"
                                                : "No objective section"}
                                        </li>
                                    </ul>
                                </div>
                            </MotionLink>
                        ))}
                        <div className="ml-4 mt-4">
                            <MotionLink
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-[#0a1128] text-white px-4 py-2 rounded mt-4"
                            >
                                Load More Layouts
                            </MotionLink>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:w-1/3">
                        <p className="lg:text-xl text-[#0a1128] flex flex-col">
                            You can customize these layouts further in the
                            layout settings after selection. You can contribute
                            your own layout thru the github repository! Laravel
                            is used for the backend and React for the frontend.
                            Be sure to make the layout jsx named as the layout
                            name in the database.{" "}
                            <motion.a
                                href="https://github.com/Zubaidi-1/cv"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ borderRadius: "50px" }}
                                class="bg-[#0a1128] py-2 px-4 text-white text-center w-1/3 self-center rounded mt-4 flex justify-between"
                            >
                                Github repository <Github />
                            </motion.a>
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
