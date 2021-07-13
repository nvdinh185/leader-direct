import React from "react";

export default () => {
  return (
    <div className="isoLogoWrapper">
      <img
        style={{ zIndex: "2", width: "65%", marginTop: "-0.25rem" }}
        src={`${process.env.PUBLIC_URL}/assets/logo/logo-xanh.png`}
      ></img>
    </div>
  );
};
