import { useState } from "react";
import styled from "styled-components";
import { Gradient } from "../generated/graphql";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import dynamic from "next/dynamic";
import { useAppContext } from "../utils/context";
import { animateScroll as scroll } from "react-scroll";
import { copyToClipboard } from "../utils/copyToClipboard";
import CopySuccess from "./CopySuccess";
import { capitalize } from "../utils/capitalize";

const Tooltip = dynamic(
  () => import("@chakra-ui/react").then((mod) => mod.Tooltip),
  { ssr: false }
);

type GradientBoxProps = Gradient & {
  idx: number;
  isLoading: boolean;
};

const GradientBox__color = styled.div<Gradient>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${({ colors }) => colors[0]};
  background: linear-gradient(
    ${({ direction }) => direction},
    ${({ colors, stops }) =>
      colors[0] + " " + stops[0] + ", " + colors[1] + " " + stops[1]}
  );
  opacity: 0.9;
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  @media screen and (min-width: 500px) {
    width: 160px;
    height: 160px;
  }
`;

const GradientBox: React.FC<GradientBoxProps> = (props) => {
  const { colors, name, idx, direction, stops, isLoading } = props;
  const { dispatch } = useAppContext();
  const [copied, setCopied] = useState(false);

  const options = {
    direction,
    color_1: colors[0],
    stop_1: stops[0],
    color_2: colors[1],
    stop_2: stops[1],
  };

  const experiment = () => {
    dispatch({
      type: "SET_COLOR_PICKER",
      payload: options,
    });
    scroll.scrollToTop({ duration: 500 });
  };

  const copyCSS = () => {
    copyToClipboard(options);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 700);
  };

  return (
    <div className=" w-9/12 sm:w-11/12 max-w-xs h-80 shadow-md bg-gray-100 pt-6 px-6 relative rounded-lg  text-sm text-gray-800 overflow-hidden">
      {copied && <CopySuccess />}

      <div className="flex justify-between items-center text-gray-500">
        <span className="text-base">0{isLoading ? 0 : idx}</span>
        {!isLoading && (
          <Tooltip
            // @ts-expect-error
            label="Try gradient!"
            aria-label="tooltip"
            className="-mt-2 font-medium text-gray-700 text-xs bg-green-300 p-1 rounded-md"
          >
            <PlayArrowIcon
              onClick={() => experiment()}
              className="cursor-pointer xs:hover:text-green-300"
            />
          </Tooltip>
        )}
      </div>

      <GradientBox__color {...props} className="shadow-2xl" />

      <span className="block text-center mt-44 ">{capitalize(name)}</span>
      {!isLoading && (
        <div className=" flex justify-between  mt-6 ">
          <span>
            {colors[0]}
            <span> - </span>
            {colors[1]}
          </span>
          <button
            className="xs:hover:text-green-500 xs:hover:underline"
            onClick={() => copyCSS()}
          >
            Copy CSS
          </button>
        </div>
      )}
    </div>
  );
};

export default GradientBox;
