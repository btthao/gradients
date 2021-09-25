import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

export type ColorPickerType = {
  direction: string;
  color_1: string;
  stop_1: string;
  color_2: string;
  stop_2: string;
};
export type PageQueryType = {
  page: number;
  limit: number;
  tags: string[];
};
export type InitialLoadType = {
  colorPicker: boolean;
  database: boolean;
};

export type StateType = {
  colorPicker: ColorPickerType;
  pageQuery: PageQueryType;
  initialLoad: InitialLoadType;
};

const initialState: StateType = {
  colorPicker: {
    direction: "120deg",
    color_1: "#ACE0B6",
    stop_1: "15%",
    color_2: "#1C3099",
    stop_2: "100%",
  },
  pageQuery: {
    page: 0,
    limit: 24,
    tags: [],
  },
  initialLoad: {
    colorPicker: false,
    database: false,
  },
};

const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
