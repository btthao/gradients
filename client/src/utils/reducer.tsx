import { StateType } from "./context";

type ActionType = {
  type: string;
  payload: any;
};

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_COLOR_PICKER": {
      return {
        ...state,
        colorPicker: { ...state.colorPicker, ...action.payload },
      };
    }
    case "SET_PAGE": {
      return {
        ...state,
        pageQuery: { ...state.pageQuery, ...action.payload },
      };
    }
    case "RESET_CURSORS": {
      return {
        ...state,
        pageQuery: { ...state.pageQuery, ...action.payload },
      };
    }
    case "SET_LOAD_STATUS": {
      return {
        ...state,
        initialLoad: { ...state.initialLoad, ...action.payload },
      };
    }
    case "SET_TAGS": {
      let newTags = state.pageQuery.tags;
      const idx = newTags.indexOf(action.payload.color);

      if (idx > -1) {
        newTags.splice(idx, 1);
      } else {
        newTags.push(action.payload.color);
      }
      return {
        ...state,
        pageQuery: { ...state.pageQuery, page: 0, tags: newTags },
      };
    }
    default:
      return state;
  }
};
