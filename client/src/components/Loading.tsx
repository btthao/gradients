import ClipLoader from "react-spinners/ClipLoader";

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-100 bg-gray-200 grid place-items-center">
      <ClipLoader color="rgb(110, 231, 183)" size={150} />
    </div>
  );
};

export default Loading;
