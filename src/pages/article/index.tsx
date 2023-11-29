import React, { useRef, useEffect } from "react";
import CarouselComponent from "./module/carousel";
import styles from "./index.module.less";

const skillList = [
  {
    src: "/src/assets/image/vue.png",
  },
  {
    src: "/src/assets/image/react.png",
  },
  {
    src: "/src/assets/image/html5.png",
  },
  {
    src: "/src/assets/image/javascript.png",
  },
  {
    src: "/src/assets/image/typescript.png",
  },
  {
    src: "/src/assets/image/python.png",
  },
  {
    src: "/src/assets/image/nodejs.png",
  },
  {
    src: "/src/assets/image/vscode.png",
  },
  {
    src: "/src/assets/image/docker.png",
  },
  {
    src: "/src/assets/image/git.png",
  },
  {
    src: "/src/assets/image/gitlab.png",
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
              <h1>欢迎来到我的小破站。</h1>
              <p className={styles.see_more}>
                Welcome to my little tattered website。
              </p>
            </div>

            <div className={styles.hobby}>
              <img
                className={styles.game}
                src="/src/assets/image/link.png"
                alt=""
              />
              <img
                className={styles.MX432_AV3}
                src="/src/assets/image/pink.png"
                alt=""
              />
              <img
                className={styles.MX432_AV3}
                src="/src/assets/image/pip.png"
                alt=""
              />
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
            <h1>我的图库</h1>
            <div className={styles.banner}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleComponent;
