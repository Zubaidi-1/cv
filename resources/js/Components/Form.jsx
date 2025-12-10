export default function Form({ children, onSubmit, className }) {
    return (
        <form
            onSubmit={onSubmit}
            className={`${className} flex flex-col justify-center items-center  lg:p-6 lg:rounded-lg lg:shadow-lg w-full`}
        >
            {children}
        </form>
    );
}
