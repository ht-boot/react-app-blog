import React, { useState, useRef, useMemo, memo } from "react";
import {
  PlaySquareOutlined,
  FastForwardOutlined,
  FastBackwardOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { createAudio, createLrcObj } from "@/utils";
import { useSelector } from "react-redux";

import { TRootState } from "@/store";
import styles from "./index.module.less";

/**
 * @description 音乐播放器
 */

// lrc文件 解析

let requestAnimationId = 0;

const PlayerComponent = memo(() => {
  // 获取仓库 状态
  const singList = useSelector(
    (state: TRootState) => state.musicReducer.singList
  );

  const lyricArr = createLrcObj(`
[ti:想你时风起]
[ar:单依纯]
[al:想你时风起]
[by:v_wandeng]
[offset:0]
[00:00.00]想你时风起 (《我的人间烟火》电视剧回忆主题曲) - 单依纯
[00:01.52]词Lyricist：赵大白
[00:01.83]曲Composer：刘涛/李浩瑞/林晨阳
[00:02.56]编曲Arranger：张宗炜
[00:02.92]制作人Producer：刘涛
[00:03.29]监制Executive Producer：陶诗
[00:03.66]吉他/贝斯Guitar&Bass：吴余涛
[00:04.20]人声编辑Vocal Editing：刘涛
[00:04.69]和声Backing Vocals：夏初安
[00:05.12]和声编写Backing Vocals Design：夏初安
[00:05.73]配唱制作人Vocal Producer：刘涛/李浩瑞
[00:06.52]人声录音师Recording Engineer：杨惠琳@Studio 21A
[00:07.25]人声录音室Recording Studio：Studio 21A
[00:07.80]弦乐演奏String Orchestra：国际首席爱乐乐团
[00:08.66]混音师Mixing Engineer：袁中仁
[00:09.15]混音棚Mixing Studio：@CheerMusic Studio
[00:09.57]母带工程师Mastering Engineer：袁中仁
[00:10.18]视觉设计Visual Design：阿璇
[00:10.67]策划总监Planging Diretor：左三好
[00:11.22]营销推广Marketing Promotion：祝鑫/郭琛
[00:11.89]制作统筹Production Coordination：李奇思/王晶
[00:12.62]出品公司Publishing Company：上海无悦不欢文化有限公司
[00:13.72]出品人Publisher：陶诗/贾士凯
[00:14.33]OP：好乐无荒
[00:14.64]SP：好乐无荒
[00:14.99]如果离别是为了能再见一面
[00:21.40]爱是想念后的抛物线
[00:26.80]离开始 渐行渐远 和我们 总是擦肩
[00:37.85]这次再见如果是最后的一面
[00:43.99]也是失眠后的分割线
[00:49.59]春天已 开始落叶 七月里 也会下雪
[00:58.97]刚刚我错过的大雨 握不住的盛夏
[01:05.34]飘过的云是你吗 一圈又一圈
[01:10.98]我多想是路过你的风
[01:14.97]忍不住落回你眼中
[01:21.76]凭什么绕不开 翻不过的盛夏
[01:28.05]有些远方 让风代替我们抵达
[01:33.86]没勇气说完的那句话
[01:37.78]希望有人听过它
[02:09.17]这次再见如果是最后的一面
[02:15.71]也是失眠后的分割线
[02:20.97]春天已 开始落叶 七月里 也会下雪
[02:30.33]刚刚我错过的大雨 握不住的盛夏
[02:36.61]飘过的云是你吗 一圈又一圈
[02:42.37]我多想是路过你的风
[02:46.40]忍不住落回你眼中
[02:53.06]凭什么 绕不开翻不过的盛夏
[02:59.57]有些远方 让风代替我们抵达
[03:05.25]没勇气说完的那句话
[03:09.21]希望有 人听过它
[03:16.19]让你听见风缓缓地 缓缓摇曳
[03:22.68]时光卷起了回忆慢慢翩翩
[03:27.75]让风替我说 说那句告别
[03:33.74]在这个落叶像雪的季节
[03:38.72]刚刚我错过的大雨 握不住的盛夏
[03:45.28]飘过的云是你吗 一圈又一圈
[03:51.22]我多想是路过你的风
[03:54.90]忍不住落回你眼中
[04:01.65]凭什么绕不开 翻不过的盛夏
[04:08.09]有些远方 让风代替我们抵达
[04:13.80]没勇气说完的那句话
[04:17.76]希望有人听过它
`);

  // 创建 Audio 对象, 进行函数缓存， 避免组件更新重复创建audio
  const audio = useMemo(() => createAudio(), []);

  const [currentPlaySing, setcurrentPlaySing] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlayer, setIsPlayer] = useState(false);

  const handleToggle = () => {
    setIsPlayer(!isPlayer);
    handlePlayer();
  };

  // 播放/暂停
  const handlePlayer = () => {
    handleProgress();
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      // 停止动画
      window.cancelAnimationFrame(requestAnimationId);
    }
  };

  // 进度条绘制
  const handleProgress = () => {
    // 停止动画
    if (requestAnimationId) window.cancelAnimationFrame(requestAnimationId);
    const progress = () => {
      // 动态绘制进度条
      const percentage = (audio.currentTime / audio.duration).toFixed(2);
      const progressWidth = +percentage * 100 + "%";

      (progressRef.current as HTMLDivElement).style.width = progressWidth;

      // 动画停止条件
      if (+percentage >= 1) {
        // setIsPlayer(false);
        // audio.pause();
        (progressRef.current as HTMLDivElement).style.width = "0%";
        handleProgress();
        return;
      }
      lyricArr.forEach((item: { t: number }, index: number) => {
        if (audio.currentTime > item.t) {
          setCurrentIndex(index);
        }
      });

      requestAnimationId = window.requestAnimationFrame(progress);
    };

    requestAnimationId = window.requestAnimationFrame(progress);
  };

  // 进度条拖拽或点击快进
  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetParent } = progressRef.current
      ?.parentNode as HTMLDivElement;

    // 进度条 progressRef 偏移量
    const offsetLeft =
      (offsetParent as HTMLDivElement).offsetLeft +
      (offsetParent?.parentNode as HTMLDivElement).offsetLeft;

    const { pageX } = e;

    // 当前进度
    const currentProgress =
      ((pageX - offsetLeft) / offsetWidth) * audio.duration;

    audio.currentTime = +currentProgress.toFixed(2);
    // 动态绘制进度条
    const percentage = (audio.currentTime / audio.duration).toFixed(2);
    const progressWidth = +percentage * 100 + "%";

    (progressRef.current as HTMLDivElement).style.width = progressWidth;

    lyricArr.forEach((item: { t: number }, index: number) => {
      if (audio.currentTime > item.t) {
        setCurrentIndex(index);
      }
    });
  };

  // 下一首
  const handleNext = () => {
    setcurrentPlaySing(currentPlaySing + 1);
    if (currentPlaySing >= singList.length - 1) {
      setcurrentPlaySing(0);
    }

    audio.src = singList[currentPlaySing].url;
    setIsPlayer(true);
    audio.play();
    handleProgress();
  };

  // 上一首
  const handlePrevious = () => {
    setcurrentPlaySing(currentPlaySing - 1);

    if (currentPlaySing <= 0) {
      setcurrentPlaySing(singList.length - 1);
    }
    audio.src = singList[currentPlaySing].url;
    audio.play();
    setIsPlayer(true);
    handleProgress();
  };

  return (
    <React.Fragment>
      <div className={styles.player_box}>
        <div className={styles.player_content}>
          {/* 封面 */}
          <div
            className={
              isPlayer
                ? `${styles.player_cover} ${styles.player_cover_active}`
                : `${styles.player_cover}`
            }
          >
            <img src="/src/assets/image/01.jpg" alt="" />
          </div>
          {/* 播放控制器 */}
          <div className={styles.player_controls}>
            <div className={styles.control} onClick={() => handlePrevious()}>
              <div className="button play-prev">
                <FastBackwardOutlined />
              </div>
            </div>
            <div className={styles.control}>
              <div className="button play-pause" onClick={() => handleToggle()}>
                {isPlayer ? <PauseCircleOutlined /> : <PlaySquareOutlined />}
              </div>
            </div>
            <div className={styles.control} onClick={() => handleNext()}>
              <div className="button play-next">
                <FastForwardOutlined />
              </div>
            </div>
          </div>
          {/* 歌词 */}
          <div className={styles.song_info}>
            <div className={styles.song_lyric}>{lyricArr[currentIndex].c}</div>
          </div>
          {/* 播放进度条 */}
          <div
            className={styles.player_progress_box}
            onMouseDown={(e) => handleProgressDrag(e)}
          >
            <div ref={progressRef} className={styles.progress}></div>

            <div className={styles.load}></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default PlayerComponent;
