import { useApolloClient } from "@apollo/client";
import { ButtonGroup } from "@material-ui/core";
import { useCallback } from "react";
import { useAppContext } from "../utils/context";
import FilterBtn from "./FilterBtn";

const list = [
  { name: "red", css: "bg-red-600" },
  { name: "orange", css: "bg-orange-400" },
  { name: "yellow", css: "bg-yellow-400" },
  { name: "green", css: "bg-green-400" },
  { name: "blue", css: "bg-blue-500" },
  { name: "purple", css: "bg-purple-400" },
  { name: "pink", css: "bg-pink-400" },
];

const Filter: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const apolloClient = useApolloClient();

  const selected = useCallback(
    (color: string) => {
      return state.pageQuery.tags.includes(color);
    },
    [state.pageQuery]
  );

  const filter = (color: string) => {
    dispatch({
      type: "SET_TAGS",
      payload: { color },
    });

    apolloClient.resetStore();
  };
  return (
    <div className="flex w-max m-auto mt-5 mb-10 ">
      <ButtonGroup
        variant="contained"
        className="bg-transparent shadow-none"
        aria-label="filters"
      >
        {list.map((color) => (
          <FilterBtn
            key={color.name}
            name={color.name}
            twCSS={color.css}
            onClick={() => filter(color.name)}
            selected={selected}
          />
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Filter;
