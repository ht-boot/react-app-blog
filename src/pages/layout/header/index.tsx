import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const menus = [
  {
    id: "101",
    name: "文章",
  },
  {
    id: "102",
    name: "生活",
  },
  {
    id: "103",
    name: "关于",
  },
];

const LayoutHeader = () => {
  const naviation = useNavigate();
  const handleGoHome = () => {
    naviation("/");
  };
  return (
    <div className={styles.header}>
      <div className={styles.go_home} onClick={() => handleGoHome()}>
        <h1>Hu Tao</h1>
      </div>
      <nav className={styles.menus}>
        {menus.map((item) => {
          return (
            <p key={item.id} className={styles.item}>
              {item.name}
            </p>
          );
        })}
      </nav>
    </div>
  );
};

export default LayoutHeader;
