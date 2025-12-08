export default function Form({ children }) {
    return (
        <form className="flex flex-col justify-center items-center">
            {children}
        </form>
    );
}
