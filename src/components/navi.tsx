import React from "react";
import { Link } from "react-router-dom";

const style: React.CSSProperties = {
  width: "200px",
  border: "solid 1px #ccc",
  marginRight: "10px",
  borderRadius: "4px",
};

interface Props {}
const SideBar = (props: Props) => {
  return (
    <div style={style}>
      <h1
        style={{
          padding: "0 10px",
        }}
      >
        사이드 바
      </h1>
      <aside>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/chart">차트</Link>
          </li>
          <li>
            <Link to="/canvas">차트 캔버스</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
