interface LabelInputProps {
  text: string;
  title: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ text, title }) => {
  return (
    <div>
      <label htmlFor={text} className="font-semibold text-sm">
        {title}
      </label>
    </div>
  );
};

export default LabelInput;