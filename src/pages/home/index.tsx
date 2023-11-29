import React from "react";
import {
  MailOutlined,
  WechatOutlined,
  GithubOutlined,
} from "@ant-design/icons";

import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "@/components/theme";
import styles from "./home.module.less";

const Home: React.FC = () => {
  const naviation = useNavigate();
  const handleEntry = () => {
    naviation("/home");
  };

  return (
    <>
      <div className={styles.home_page}>
        {/* 头部 */}
        <div className={styles.head}>
          <ul className={styles.nav}>
            <li>
              <ThemeSwitch />
            </li>
            <li>
              <a target="_black" href="https://github.com/ht-boot">
                <GithubOutlined style={{ fontSize: "24px" }} />
              </a>
            </li>
          </ul>
        </div>
        {/* 内容 */}

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <img src="/src/assets/image/link.png" alt="header" />
            </div>
            <div className={styles.info}>
              <h1 className="name">胡 涛 · Hu Tao </h1>
              <div className={styles.descript}>
                <p>🏕️ 这是一个自己积累知识、兴趣的地方。</p>
                <p>
                  <b>目标：</b>致力成为一名前端小佬， ctrl + c、ctrl + v 高级 cv
                  工程师 💻, 大自然的搬运工 🚶‍♂️。
                  本人也精通HTML、CSS、JavaScript、Vue、React、TypeScript、Antd等单词的拼写。
                </p>
              </div>
              <div className={styles.link}>
                <Popover content="hutao116500" placement="bottomLeft">
                  <WechatOutlined style={{ fontSize: "18px" }} />
                </Popover>
                <Popover content="1165006789@qq.com" placement="bottomLeft">
                  <MailOutlined style={{ fontSize: "18px" }} />
                </Popover>
              </div>
            </div>
          </div>
          <div className={styles.originality_box}>
            <p className={styles.entry} onClick={() => handleEntry()}>
              🛸 随便逛逛 👉 ~~
            </p>
          </div>
        </div>

        {/* 尾部 */}
        <div className={styles.footer}>
          <p>© 2021 HuQ Tao</p>
        </div>
      </div>
    </>
  );
};

export default Home;
