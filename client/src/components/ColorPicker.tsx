import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ColorPickerType, useAppContext } from "../utils/context";
import { copyToClipboard } from "../utils/copyToClipboard";
import ColorBox from "./ColorBox";
import CopySuccess from "./CopySuccess";

const SketchPicker = dynamic(
  () => import("react-color").then((mod) => mod.SketchPicker),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("@chakra-ui/react").then((mod) => mod.Tooltip),
  { ssr: false }
);
const Slider = dynamic(
  () => import("@material-ui/core").then((mod) => mod.Slider),
  { ssr: false }
);

const DirectionSlider = styled(Slider).attrs<ColorPickerType>(
  ({ direction, color_1, color_2, stop_1, stop_2 }) => ({
    style: {
      backgroundColor: color_1,
      backgroundImage: `linear-gradient(${direction}, ${color_1} ${stop_1}, ${color_2} ${stop_2})`,
    },
  })
)`
  height: 40px !important;
  padding: 0 !important;
  opacity: 1;
  border: #202020 solid 2px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: #f0f0f0 solid 2px;
    border-radius: 3px;
  }
  .MuiSlider-rail {
    height: 40px !important;
    background: inherit;
  }
  .MuiSlider-track {
    display: none !important;
  }
  .MuiSlider-thumb {
    top: 50%;
    margin-top: 0;
    height: 50px;
    width: 18px;
    background-color: #f5f5f5;
    border: 2px solid #202020;
    transform: translateY(-50%);
    border-radius: 5px;
    z-index: 7;
    .MuiSlider-valueLabel {
      span {
        display: none;
      }
    }
  }
`;

const ValueLabelComponent = ({ children, value }) => {
  return (
    <Tooltip
      // @ts-expect-error
      label={value}
      className="bg-green-300 shadow p-1 rounded-md text-sm"
      isOpen
    >
      {children}
    </Tooltip>
  );
};

const ColorPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { color_1, color_2, stop_1, stop_2, direction } = state.colorPicker;
  const [current, setCurrent] = useState(1);
  const [pickerBG, setPickerBG] = useState(color_1);
  const [copied, setCopied] = useState(false);
  const colorPickerRef = useRef(null);
  const [height, setHeight] = useState(0);

  // make sure the color picker (which usually takes longer to load) component is rendered before showing the whole page. uselayouteffect didn't work here :(
  useEffect(() => {
    const checkHeight = setInterval(() => {
      if (colorPickerRef.current.clientHeight > 0) {
        setHeight(colorPickerRef.current.clientHeight);
        dispatch({
          type: "SET_LOAD_STATUS",
          payload: {
            colorPicker: true,
          },
        });
      }
    }, 1000);

    if (height > 0) {
      clearInterval(checkHeight);
    }

    return () => {
      clearInterval(checkHeight);
    };
  }, [dispatch, height]);

  useEffect(() => {
    setPickerBG(current == 1 ? color_1 : color_2);
  }, [current, color_1, color_2]);

  const handleChangeColor = ({ hex }): void => {
    dispatch({
      type: "SET_COLOR_PICKER",
      payload: {
        color_1: current == 1 ? hex : color_1,
        color_2: current == 2 ? hex : color_2,
      },
    });
  };

  const handleChangeDirection = (newVal: number | number[]): void => {
    dispatch({
      type: "SET_COLOR_PICKER",
      payload: {
        direction: newVal + "deg",
      },
    });
  };

  const copyCSS = () => {
    copyToClipboard(state.colorPicker);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 700);
  };

  return (
    <div className=" w-full py-5 flex flex-col md:flex-row md:items-center max-w-5xl ">
      {copied && <CopySuccess />}

      <div className="w-full">
        <div ref={colorPickerRef}>
          <SketchPicker
            // @ts-expect-error
            color={pickerBG}
            disableAlpha={true}
            onChange={handleChangeColor}
            width="88%"
            className="m-auto md:m-0  max-w-sm shadow-md rounded-lg  bg-white"
          />
        </div>
      </div>

      <div className="mt-12 w-full m-auto md:m-0 max-w-md ">
        <div className="px-2 xs:px-0">
          <DirectionSlider
            key="direction-slider"
            {...state.colorPicker}
            // @ts-expect-error
            value={parseInt(direction.substring(0, direction.length - 3))}
            valueLabelDisplay="on"
            valueLabelFormat={(val: number) => `${val}°`}
            min={0}
            max={360}
            onChange={(_e: any, newVal: number) =>
              handleChangeDirection(newVal)
            }
            ValueLabelComponent={ValueLabelComponent}
          />
        </div>
        <div className="grid gap-2 mt-10 p-3 sm:p-4 bg-white shadow-md rounded-lg ">
          <button
            className="justify-self-end font-medium text-green-500 text-sm hover:underline"
            onClick={() => copyCSS()}
          >
            Copy CSS
          </button>
          <ColorBox
            key={1}
            id={1}
            color={color_1}
            stop={stop_1}
            current={current == 1}
            onClick={() => setCurrent(1)}
          />
          <ColorBox
            key={2}
            id={2}
            color={color_2}
            stop={stop_2}
            current={current == 2}
            onClick={() => setCurrent(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
