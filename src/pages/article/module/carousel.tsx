import React, { useEffect, useRef, memo } from "react";
import { SlackOutlined } from "@ant-design/icons";
import { infiniteScroll } from "@/utils";
import styles from "./carousel.module.less";

const CarouselComponent: React.FC = memo(() => {
  const ulElement = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let timer = infiniteScroll(ulElement.current, 5000);

    // 窗口切换 定时器清除
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        clearInterval(timer);
      } else {
        timer = infiniteScroll(ulElement.current, 5000);
      }
    });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const textList = [
    {
      id: "1001",
      value: "风起于青萍之末，浪成于微澜之间。跌谷底也要开花，沉海底也要望月。",
    },
    {
      id: "1002",
      value:
        "宇宙以其不息的欲望将一个歌舞炼为永恒。这欲望有怎样一个人间的姓名，大可忽略不计。",
    },
    {
      id: "1003",
      value: "面对变化，接受无常，放过自己。",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.icon}>
          <SlackOutlined />
        </div>
        <div className={styles.banner}>
          <ul ref={ulElement} className={styles.adv}>
            {textList.map((item) => {
              return <li key={item.id}>{item.value}</li>;
            })}
          </ul>
        </div>
        <div className={styles.placeholder}></div>
      </div>
    </>
  );
});

export default CarouselComponent;
