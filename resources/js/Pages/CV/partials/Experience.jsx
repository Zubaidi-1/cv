import DataInput from "@/Components/DataInput";
import Form from "@/Components/Form";
import { useForm } from "@inertiajs/react";

export default function Experinece() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("experiences.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="min-h-screen bg-white flex justify-around items-center">
            <div className="hidden lg:block lg:w-1/3">
                <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-300 pb-1">
                    Experience
                </h2>
                <p className="text-start ">
                    The Experience section of a CV highlights your professional
                    background and shows employers the roles you’ve held, the
                    responsibilities you managed, and the impact you made in
                    previous positions. It should clearly outline your job
                    titles, the companies you worked for, and the dates of
                    employment, followed by brief, results-focused descriptions
                    of your key achievements. This section helps employers
                    quickly understand how your past work aligns with the role
                    you’re applying for and demonstrates the skills, growth, and
                    value you can bring to their organization.
                </p>
            </div>

            <div className="w-1/3">
                <Form onSubmit={submit}>
                    <h2 className="text-sm self-start">Experience</h2>

                    <DataInput
                        className={"w-full"}
                        name={"title"}
                        placeholder={"Backend Developer"}
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />

                    <DataInput
                        className={"w-full"}
                        name={"company"}
                        placeholder={"Company"}
                        value={data.company}
                        onChange={(e) => setData("company", e.target.value)}
                    />

                    <DataInput
                        className={"w-full"}
                        name={"location"}
                        placeholder={"Location"}
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />

                    <span className="self-start text-[#0a1128] text-sm mt-2">
                        Start Date
                    </span>
                    <DataInput
                        className={"w-full text-[#0a1128]"}
                        name={"start_date"}
                        type={"date"}
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                    />

                    <span className="self-start text-[#0a1128] text-sm mt-2">
                        End Date – leave blank if ongoing
                    </span>
                    <DataInput
                        className={"w-full text-[#0a1128]"}
                        name={"end_date"}
                        type={"date"}
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                    />

                    <span className="self-start text-[#0a1128] text-sm mt-2">
                        Description – full stops will be considered bullet
                        points in some layouts.
                    </span>
                    <DataInput
                        name={"description"}
                        className={"w-full h-32 bg-[#f0f0f0]"}
                        type={"textarea"}
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 px-4 py-2 bg-[#0a1128] text-white rounded font-lato self-start"
                    >
                        Add Experience
                    </button>
                </Form>
            </div>
        </div>
    );
}
