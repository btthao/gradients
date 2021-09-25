import { ColorPickerType } from "./context";

export const copyToClipboard = (options: ColorPickerType): void => {
  const { direction, color_1, color_2, stop_1, stop_2 } = options;
  const css = `background-color: ${color_1};
    background-image: linear-gradient(
      ${direction},
      ${color_1 + " " + stop_1},
      ${color_2 + " " + stop_2}
    );`;
  navigator.clipboard.writeText(css);
};
