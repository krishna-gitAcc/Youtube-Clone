import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoFetchStart: (state) => {
      state.loading = true;
    },
    videoFetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    videoFetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    likeVideo: (state, action) => {
      if (!state.currentVideo.videoLikes?.includes(action.payload)) {
        state.currentVideo.videoLikes.push(action.payload);
        state.currentVideo.videoDislikes.splice(
          state.currentVideo.videoDislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislikeVideo: (state, action) => {
      if (!state.currentVideo.videoDislikes?.includes(action.payload)) {
        state.currentVideo.videoDislikes.push(action.payload);
        state.currentVideo.videoLikes.splice(
          state.currentVideo.videoLikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const {
  videoFetchStart,
  videoFetchSuccess,
  videoFetchFailure,
  dislikeVideo,
  likeVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
