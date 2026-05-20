interface ButtonProps {
    label: string;
    variant?:
    | "primary"
    | "secondary"
    | "danger";
    onClick?: () => void;
}

export function Button({
    label,
    variant = "primary",
    onClick }: ButtonProps) {
    const styles = {
        primary:
            "bg-[#852e4e] text-white",
        secondary:
            "bg-yellow-400 text-black",
        danger:
            "bg-red-500 text-white"
    };
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded ${styles[variant]}`}>
            {label}
        </button>
    );
}
export default Button;