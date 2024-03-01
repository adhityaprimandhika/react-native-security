import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FIREBASE_AUTH } from "../helpers/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const signInUser = createAsyncThunk(
  "sign-in-user",
  async (payload, thunkApi) => {
    const firebaseAuth = FIREBASE_AUTH;
    try {
      const response = await signInWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      );
      const token = await response.user.getIdToken();
      AsyncStorage.setItem("token", token);
      return thunkApi.fulfillWithValue(token);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
      //   console.log(action.payload);
    });
    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      console.error(action);
      if (action.payload === "Firebase: Error (auth/invalid-credential).") {
        Alert.alert("Invalid Login", "Invalid credential email/password");
      } else {
        Alert.alert("Invalid Login", action.payload);
      }
      state.loading = false;
    });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
