/**
 * @description 创建音频对象
 * @returns 返回 audio 音频对象
 */

const createAudio = () => {
  const audio = new Audio();
  audio.src = "/src/assets/music/01.mp3";
  audio.loop = true;
  return audio;
};

export default createAudio;
