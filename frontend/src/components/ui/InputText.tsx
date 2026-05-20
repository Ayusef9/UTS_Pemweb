interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  error?: string;
}

const InputText: React.FC<InputTextProps> = ({ type, name, error, ...props }) => {
  return (
      <input type={type} name={name} 
      {...props} 
      className={`border p-2 rounded-md focus:border-bs-fuchsia-800 outline-none
         ${error ? 'bg-red-100' : 'bg-white' }`} />   
    );
};

export default InputText;