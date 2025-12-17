import { Link } from "@inertiajs/react";

export default function Layouts() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#0a1128]">
            <div className="p-2 flex flex-col justify-center items-center max-w-md">
                <p className="text-center text-[#e0e2db] lg:text-xl">
                    Explore various CV layouts to find the perfect fit for your
                    professional story.
                </p>
                <Link
                    href={route("layouts.index")}
                    className="bg-[#e0e2db] text-[#0a1128] mt-2 text-sm p-2 rounded lg:text-lg "
                >
                    Explore Layouts
                </Link>
            </div>
        </div>
    );
}
