import React, { memo } from "react";
import { Switch } from "antd";
import { useTheme } from "@/hooks/useTheme";

const ThemeSwitch: React.FC = memo(() => {
  const { theme, handleToggle } = useTheme();

  return (
    <>
      <Switch
        checkedChildren="☀"
        unCheckedChildren="☽"
        defaultChecked={theme === "light" ? true : false}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        onChange={(e) => handleToggle(e)}
      />
    </>
  );
});

export default ThemeSwitch;
