import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PersonalInformation from "./CV/partials/PersonalInformation";
import Objective from "./CV/partials/Objective";
import Education from "./CV/partials/Education";
import Skill from "./CV/partials/Skill";
import Experinece from "./CV/partials/Experience";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <PersonalInformation />
            <Objective />
            <Education />
            <Experinece />
            <Skill />
        </AuthenticatedLayout>
    );
}
