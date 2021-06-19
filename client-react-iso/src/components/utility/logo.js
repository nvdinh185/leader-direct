import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "@config/site.config";

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        // <h3>
        //   <Link to="/dashboard">{siteConfig.siteName}</Link>
        // </h3>
        <img
          style={{ zIndex: "2", width: "65%", marginTop: "-0.25rem" }}
          src={`${process.env.PUBLIC_URL}/assets/logo/logo-vang.png`}
        ></img>
      )}
    </div>
  );
};
