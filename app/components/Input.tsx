interface InputProps {
    id: string
    onChange: any
    value: string
    label: string
    type?: string
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                id={id}
                onChange={onChange}
                className="block rounded px-5 pt-6 pb-1 w-full placeholder-[gray] bg-[#333] appearance-none focus:bg-[#454545] focus:outline-none focus:ring-0 peer"
                placeholder=""
            />
            <label
                className="absolute text-zinc-400 transform -translate-y-3 scale-75 left-5 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                htmlFor={id}
            >{label}</label>
        </div>
    )
}

export default Input