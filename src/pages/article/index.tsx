import React, { useRef, useEffect } from "react";
import CarouselComponent from "./module/carousel";
import styles from "./index.module.less";
import { Button } from "antd";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

const skillList = [
  {
    src: "/image/vue.png",
  },
  {
    src: "/image/react.png",
  },
  {
    src: "/image/html5.png",
  },
  {
    src: "/image/javascript.png",
  },
  {
    src: "/image/typescript.png",
  },
  {
    src: "/image/python.png",
  },
  {
    src: "/image/nodejs.png",
  },
  {
    src: "/image/vscode.png",
  },
  {
    src: "/image/docker.png",
  },
  {
    src: "/image/git.png",
  },
  {
    src: "/image/gitlab.png",
  },
];

const ArticleComponent: React.FC = () => {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const { current } = ulRef;

    let requestAnimationId: number = 0;

    if (!current) return;
    current.innerHTML += current.innerHTML;
    const move = () => {
      if (current.offsetLeft < -current.offsetWidth / 2) {
        current.style.left = 0 + "px";
      } else if (current.offsetLeft > 0) {
        current.style.left = -current.offsetWidth / 2 + "px";
      }
      current.style.left = current.offsetLeft - 1 + "px";
      requestAnimationId = window.requestAnimationFrame(move);
    };

    requestAnimationId = window.requestAnimationFrame(move);

    return () => {
      window.cancelAnimationFrame(requestAnimationId);
    };
  }, []);

  return (
    <>
      <CarouselComponent />
      <div className={styles.container}>
        <div className={styles.recommend_box}>
          <div className={styles.recommend_one}>
            <div className={styles.description}>
              <h1>日月既往，不可复追。</h1>
              <p className={styles.translate}>
                Welcome to my little tattered website。😁😍😛😄
              </p>
            </div>

            <div className={styles.pulse}>
              <img className={styles.item} src="/image/link.png" alt="" />
              <img className={styles.item} src="/image/pink.png" alt="" />
              <img className={styles.item} src="/image/pip.png" alt="" />
              <img className={styles.item} src="/image/ash.png" alt="" />
            </div>
            <div className={styles.display_skill}>
              <ul ref={ulRef} className={styles.skill_box}>
                {skillList.map((item) => {
                  return (
                    <li className={styles.item} key={item.src}>
                      <img src={item.src} alt="" />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.recommend_two}>
            <div className={styles.two_text}>
              <h2>AI 图册。</h2>
              <p className={styles.hobby}>图片分享。</p>
              <Button
                type="primary"
                style={{ background: "#005cbb" }}
                className={styles.btn}
              >
                Get Started
              </Button>
            </div>
            <div className={styles.banner}>
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className={styles.my_swiper}
              >
                <SwiperSlide
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img src="/image/girl_5.png" alt="" />
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img src="/image/girl_2.png" alt="" />
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img src="/image/girl_3.png" alt="" />
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img src="/image/girl_4.png" alt="" />
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img src="/image/girl_1.png" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleComponent;
