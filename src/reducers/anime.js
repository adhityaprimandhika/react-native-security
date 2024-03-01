import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

export const getAnime = createAsyncThunk(
  "get-anime",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/top/anime");
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getAnimeById = createAsyncThunk(
  "get-anime-by-id",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${payload}`
      );
      console.log(response);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    data: [],
    detail: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnime.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAnime.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAnime.rejected, (state, action) => {
      console.error(action);
      state.loading = false;
    });
    builder.addCase(getAnimeById.fulfilled, (state, action) => {
      state.detail = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAnimeById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAnimeById.rejected, (state, action) => {
      console.error(action);
      state.loading = false;
    });
  },
});

const animeReducer = animeSlice.reducer;
export default animeReducer;
