import { useState } from "react";
import styled from "styled-components";
import { generateColor } from "../utils/color";
import { ColorPickerType, useAppContext } from "../utils/context";
import AddGradient from "./AddGradient";
import Button from "./Button";
import ColorPicker from "./ColorPicker";

const Background__main = styled.div.attrs<ColorPickerType>(
  ({ direction, color_1, color_2, stop_1, stop_2 }) => ({
    style: {
      backgroundColor: color_1,
      backgroundImage: `linear-gradient(${direction}, ${color_1} ${stop_1}, ${color_2} ${stop_2})`,
    },
  })
)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 66vh;
  min-height: 30rem;
  max-height: 55rem;
  z-index: -1;
`;

const Background: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [addToDBModal, setAddToDBModal] = useState(false);

  const randomColors = (): void => {
    const random_1 = generateColor();
    let random_2 = generateColor();
    while (random_1 == random_2) {
      random_2 = generateColor();
    }
    dispatch({
      type: "SET_COLOR_PICKER",
      payload: {
        color_1: random_1,
        color_2: random_2,
      },
    });
  };

  return (
    <section className="relative">
      <Background__main key="background" {...state.colorPicker} />
      <div className="w-full max-w-7xl m-auto p-6 grid place-items-center">
        <div className="text-gray-100 py-8 ml-2 sm:ml-0   ">
          <h1 className=" font-bold text-3xl sm:text-5xl mb-3 bg-gray-600 bg-opacity-50 w-max px-1 rounded-sm ">
            #GRADIENT
          </h1>
          <p className="font-medium xs:text-2xl bg-gray-600 bg-opacity-50 px-1 rounded-sm ">
            Mix and match background colors.
          </p>
        </div>
        <ColorPicker />
        <div className=" my-10 grid grid-cols-2 gap-5 sm:gap-14">
          <Button key="button-1" onClick={() => randomColors()}>
            Random colors
          </Button>
          <Button key="button-2" onClick={() => setAddToDBModal(true)}>
            Add to database
          </Button>
        </div>
        {addToDBModal && <AddGradient onClick={() => setAddToDBModal(false)} />}
      </div>
    </section>
  );
};

export default Background;
