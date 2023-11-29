import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singList: [
    {
      id: "01",
      name: "想你时风起",
      url: "/src/assets/music/01.mp3",
      cover: "/src/assets/images/music/01.jpg",
      lyric: "/src/assets/lyric/01.lrc",
    },
    {
      id: "02",
      name: "多远都要在一起",
      url: "/src/assets/music/02.mp3",
      cover: "/src/assets/images/music/02.jpg",
      lyric: "/src/assets/lyric/02.lrc",
    },
  ],
  value: 10,
  limit: 20,
};

/**
 * @description 音乐库组件
 */

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    updeList(state) {
      console.log(state.singList, "123");
    },
  },
});

export default musicSlice.reducer;
