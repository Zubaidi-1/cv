export default function DataInput({
    name,
    type,
    register,
    value,
    onChange,
    placeholder,
    className,
    min,
    max,
}) {
    return (
        <input
            {...register?.(name)}
            value={value}
            onChange={onChange}
            className={`rounded  border-1 border-[#0a1128]  font-lado placeholder:italic placeholder:text-gray-400 focus:border-[#034078] focus:ring-2 focus:ring-[#034078] md:text-lg p-2 m-2 lg:text-md ${className}`}
            placeholder={placeholder ?? "Some text here..."}
            name={name}
            type={type ?? "text"}
            min={min}
            max={max}
        ></input>
    );
}
