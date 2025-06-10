type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="flex flex-col items-center mt-20 group">
      <span className="font-bold">{text}</span>
      <div className="w-[30px] group-hover:w-[70px] duration-300 h-0.5 bg-(--color-blue)"></div>
    </button>
  );
}
