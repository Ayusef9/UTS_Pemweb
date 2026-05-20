import InputText from "./ui/InputText";
import LabelInput from "./ui/LabelInput";

interface FormInputProps {
    text: string;
    type: string;
    name: string;
    register?: any;
    error?: string;
    
}

const FormInput: React.FC<FormInputProps> = ({ text, type, name, register, error }) => {
    return (
        <div className="flex flex-col gap-1 mb-3">
            <LabelInput text={text} title={name} />
            <InputText type={type} name={name} error={error}
             {...register(name)} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default FormInput;