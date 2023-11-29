import React from "react";
import { Outlet } from "react-router-dom";

import LayoutHeader from "@/pages/layout/header";
import PlayerComponent from "@/components/music";

import styles from "./index.module.less";

const LayoutContent: React.FC = () => {
  return (
    <div className={styles.layout_page}>
      <div className={styles.container}>
        <LayoutHeader />
        <div className="content">
          <PlayerComponent />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutContent;
