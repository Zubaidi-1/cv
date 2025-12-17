import { forwardRef } from "react";

const A4Page = forwardRef(({ children }, ref) => {
    return (
        <div className="flex justify-center  py-10">
            <div
                ref={ref}
                className="
                    w-[794px]
                    h-[1123px]
                    bg-white
                    shadow-lg
                    overflow-hidden
                "
            >
                {children}
            </div>
        </div>
    );
});

export default A4Page;
