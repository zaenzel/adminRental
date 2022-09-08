import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      state.user = payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = {};
    },
  },
  extraReducers: {},
});

export const { login, logout } = authSlice.actions;
export const getUser = (state) => state.auth.user;
export default authSlice.reducer;
