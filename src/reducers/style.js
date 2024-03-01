import { StyleSheet } from "react-native";
import { createSlice } from "@reduxjs/toolkit";

const styleSlice = createSlice({
  name: "global-style",
  initialState: {
    globalStyle: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#a3cef1",
      },
    }),
  },
  reducers: {},
});

const styleReducer = styleSlice.reducer;
export default styleReducer;
