type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="flex flex-col items-center mt-20 group">
      <span className="font-bold">{text}</span>
      <div className="w-7.5 group-hover:w-17.5 duration-300 h-0.5 bg-blue"></div>
    </button>
  );
}
