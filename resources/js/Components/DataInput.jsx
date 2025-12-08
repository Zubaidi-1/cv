export default function DataInput({ name,type, value, onChange, placeholder , className}) {
    return (
        <input
            className={`rounded  border-1 border-[#0a1128]  font-lado placeholder:italic placeholder:text-gray-400 focus:border-[#034078] focus:ring-2 focus:ring-[#034078] md:text-lg p-2 m-2 lg:text-2xl ${className}`}
            placeholder={placeholder ?? "Some text here..."}
            name={name}
            type={type ?? "text"}
        ></input>
    );
}
