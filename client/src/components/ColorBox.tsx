import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { validateColor } from "../utils/color";
import { useAppContext } from "../utils/context";

const Slider = dynamic(
  () => import("@material-ui/core").then((mod) => mod.Slider),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("@chakra-ui/react").then((mod) => mod.Tooltip),
  { ssr: false }
);

interface ColorBoxProps {
  id: number;
  color: string;
  stop: string;
  current: boolean;
  onClick: () => void;
}

type ColorSliderProps = {
  bgcolor: string;
};

const ValueLabelComponent = ({ children, value }) => {
  return (
    <Tooltip
      // @ts-expect-error
      label={value}
      className=" text-xs font-medium sm:text-sm -mb-0.5  "
      isOpen
      placement="top"
    >
      {children}
    </Tooltip>
  );
};

const ColorBox__box = styled.div.attrs<ColorBoxProps>(
  ({ color, current, stop }) => ({
    style: {
      backgroundColor: color,
    },
  })
)`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 10px;
  border: 2px solid #202020;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #f0f0f0;
    border-radius: 8px;
  }
  @media screen and (min-width: 400px) {
    width: 50px;
    height: 50px;
  }
`;

const ColorBox__slider = styled(Slider).attrs<ColorSliderProps>(
  ({ bgcolor }) => ({
    style: {
      backgroundColor: bgcolor,
    },
  })
)`
  width: 90% !important;
  margin-top: 9px;
  position: relative;
  height: 3px !important;
  padding: 0 !important;
  border-radius: 5px !important;
  .MuiSlider-rail {
    background: #aaa8a8;
    opacity: 1;
    z-index: 3;
    height: 3px;
    border-radius: 5px !important;
  }
  .MuiSlider-thumb {
    background: inherit;
    border: 1px solid #e9e7e7;
    z-index: 5;
  }
  .MuiSlider-track {
    background: inherit;
    z-index: 4;
    height: 3px;
    border-radius: 5px !important;
  }
  @media screen and (min-width: 450px) {
    margin-top: 16px;
  }
`;

const ColorBox: React.FC<ColorBoxProps> = ({
  id,
  color,
  stop,
  current,
  onClick,
}) => {
  const { dispatch } = useAppContext();
  const [hex, setHex] = useState(color);
  useEffect(() => {
    setHex(color);
  }, [color]);
  const handleChangeStop = (newVal: number | number[]): void => {
    if (id == 1) {
      dispatch({
        type: "SET_COLOR_PICKER",
        payload: {
          stop_1: newVal + "%",
        },
      });
    } else {
      dispatch({
        type: "SET_COLOR_PICKER",
        payload: {
          stop_2: newVal + "%",
        },
      });
    }
  };
  const handleChangeHex = (val: string): void => {
    if (validateColor(val)) {
      if (id == 1) {
        dispatch({
          type: "SET_COLOR_PICKER",
          payload: {
            color_1: val,
          },
        });
      } else {
        dispatch({
          type: "SET_COLOR_PICKER",
          payload: {
            color_2: val,
          },
        });
      }
    } else {
      setHex(color);
    }
  };
  return (
    <div
      className={`${
        current ? "bg-gray-200 " : ""
      } px-3 py-4 rounded-md flex items-center`}
      onClick={onClick}
    >
      <ColorBox__box color={color} />
      <div className=" flex-1 grid grid-cols-2 gap-0.5 ">
        <div className="grid justify-items-center gap-3 ">
          <p className="text-sm sm:text-base font-medium text-gray-600">HEX</p>
          <input
            className=" h-7 sm:p-1 w-20 border border-gray-400 bg-gray-100 rounded-md  "
            value={hex.toUpperCase()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHex(e.target.value)
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              handleChangeHex(e.target.value)
            }
          />
        </div>
        <div className="grid justify-items-center gap-3 ">
          <p className=" text-sm sm:text-base font-medium text-gray-600">
            STOP
          </p>
          <ColorBox__slider
            key={`color-slider-${id}`}
            // @ts-expect-error
            bgcolor={color}
            value={parseInt(stop.substring(0, stop.length - 1))}
            valueLabelDisplay="on"
            valueLabelFormat={(val: number) => `${val}%`}
            onChange={(_e: any, newVal: number) => handleChangeStop(newVal)}
            ValueLabelComponent={ValueLabelComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
