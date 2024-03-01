import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import styleReducer from "./style";

export default configureStore({
  reducer: {
    counter: counterReducer,
    style: styleReducer,
  },
});
