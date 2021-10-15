import React from "react";

function Social(props) {
  return (
    <div>
      <div className="row noMargin noPadding card profile_card">
        <div className="row noMargin noPadding">
          <div className="col-6 noPadding noMargin text-left">
            <span
              className="select_interest_head noPadding"
              style={{
                color: "#03CBC9",
                fontSize: "1.4vw",
                marginLeft: "0.6vw",
              }}
            >
              Connect a Social Network
            </span>
          </div>
        </div>
        <br></br>
        <div className="row noMargin noPadding">
          <p style={{ color: "#98989c", fontSize: "1vw", fontWeight: "700" }}>
            These social media profiles will be visible publicly to other users
            under your public profile.
          </p>
          <p
            style={{
              color: "#98989c",
              fontSize: "1vw",
              marginTop: "-1.5vw",
              fontWeight: "700",
            }}
          >
            Click the buttons below to begin connecting your accounts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Social;
