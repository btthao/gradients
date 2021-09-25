import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ButtonHTMLAttributes } from "react";

type NavigateBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  navigateto: string;
  onClick: () => void;
};

const NavigateBtn: React.FC<NavigateBtnProps> = (props) => {
  return (
    <button
      {...props}
      className="bg-green-300 rounded-full w-9 h-9 grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {props.navigateto == "next" ? (
        <NavigateNextIcon />
      ) : (
        <NavigateBeforeIcon />
      )}
    </button>
  );
};

export default NavigateBtn;
