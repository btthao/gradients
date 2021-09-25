interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className=" text-sm sm:text-base h-12 w-36 sm:w-40 text-gray-800 font-medium  relative border-2 border-green-300 rounded-full  xs:hover:border-blue-700 transition duration-500 ease-in-out z-0  "
      onClick={onClick}
    >
      <span className="absolute top-0 left-0 w-32 sm:w-36 h-12  rounded-full bg-gradient-to-r to-blue-500 from-green-300 -z-10 shadow "></span>
      <span className="z-10">{children}</span>
    </button>
  );
};

export default Button;
