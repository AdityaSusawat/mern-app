import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //the state stored in the global state ; data accessible globally everywhere
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //functions that involve modifying the global state
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      //action includes all the arguments
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      try {
        state.posts = action.payload.posts;
      } catch (error) {
        console.error("Error setting posts:", error);
      }
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setFriends: (state, action) => {
      //will set the friends in the local state
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("No friends found");
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
