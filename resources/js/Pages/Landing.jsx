import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
export default function Landing() {
    const MotionLink = motion.create(Link);
    return (
        <motion.div
            initial={{ opacity: 0.1 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-[#e0e2db] text-[#0a1128] flex justify-center items-center flex-col gap-2 md:gap-8"
        >
            <div>
                <h1 className="font-indie text-5xl font-bold md:text-8xl">
                    CVCrafted
                </h1>
                <h3 className="text-center text-lg md:text-3xl text-[#034078] font-lato">
                    Do your CV like a pro
                </h3>
            </div>
            <div>
                <MotionLink
                    href={route("register")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#0a1128] text-[#fefcfb] text-md rounded p-2 md:text-3xl md:rounded-md md:p-3 lg:text-xl"
                >
                    Start Free
                </MotionLink>
            </div>
        </motion.div>
    );
}
