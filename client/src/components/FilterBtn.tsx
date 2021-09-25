import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

interface FilterBtnProps {
  name: string;
  twCSS: string;
  selected: (color: string) => boolean;
  onClick: () => void;
}

const FilterBtn: React.FC<FilterBtnProps> = ({
  name,
  twCSS,
  onClick,
  selected,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected(name));
  }, [selected, name]);

  return (
    <Button
      className={`${twCSS} ${
        isSelected ? "scale-95" : "opacity-50 scale-50  "
      }  mx-0.5 border-none p-0 min-w-0 w-6 h-6 rounded-full hover:opacity-100 transition duration-200  `}
      onClick={onClick}
    />
  );
};

export default FilterBtn;
