import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Objective() {
    const { data, setData, post, processing, errors, reset } = useForm({
        objective: "",
    });

    const flash = usePage().props.flash; // <-- to get success messages

    const submit = (e) => {
        e.preventDefault();

        post(route("objective.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <section className="flex flex-col justify-around items-center min-h-screen lg:flex-row bg-white">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-1 lg:hidden">
                Objective
            </h2>

            <div className="w-1/3 hidden lg:block">
                <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-300 pb-1">
                    Objective
                </h2>

                <p className="text-start flex-1">
                    A well-written CV objective is important because it gives
                    employers a quick, clear understanding of who you are and
                    what you’re aiming for.
                </p>
            </div>

            <form
                onSubmit={submit}
                className="w-fit-content flex flex-col justify-center items-center"
            >
                {/* SUCCESS MESSAGE */}
                {flash?.success && (
                    <p className="text-green-600 mb-2 self-start">
                        {flash.success}
                    </p>
                )}

                {/* GLOBAL ERROR MESSAGE */}
                {Object.keys(errors).length > 0 && (
                    <p className="text-red-600 mb-2 self-start">
                        Please fix the errors below.
                    </p>
                )}

                <textarea
                    className="border-1 border-[#0a1128] w-full mt-4 p-2 rounded resize-none font-lato
                               focus:outline-none focus:ring-2 focus:ring-[#034078]
                               h-32 lg:h-40 lg:w-[32rem]"
                    placeholder="Enter your career objective here..."
                    value={data.objective}
                    onChange={(e) => setData("objective", e.target.value)}
                />

                {/* FIELD ERROR */}
                {errors.objective && (
                    <span className="text-red-500 text-sm self-start mt-1">
                        {errors.objective}
                    </span>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 px-6 py-2 bg-[#0a1128] text-white rounded font-lato self-start"
                >
                    {processing ? "Saving..." : "Save Objective"}
                </button>
            </form>
        </section>
    );
}
