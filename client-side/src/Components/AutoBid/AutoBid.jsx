import React, { useState, useContext, useEffect } from "react";
import { saveAutoBids } from "../../Api-Calls/AutoBid";
import "./AutoBid.css";
import { autoBidContext } from "./../../Context-Api/Autobids/Context";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function AutoBid() {
  const user = JSON.parse(localStorage.getItem("user")); //get user credentials from localStorage
  const [autoBid, setAutoBid] = useState({
    fullname: user?.fullname,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorr, setErrorr] = useState(false);

  const location = useLocation();
  const redirectPath = location.state;

  //auto bid context

  const { dispatch, error } = useContext(autoBidContext);

  // get configuration values

  const handleChange = (e) => {
    const value = e.target.value;
    setAutoBid({ ...autoBid, [e.target.name]: value });
  };

  useEffect(() => {
    const value = autoBid?.amount * (autoBid?.threshold / 100);
    setAutoBid((prev) => ({ ...prev, deductible: value }));
  }, [autoBid?.amount, autoBid?.threshold]);

  //save auto bids in our database
  const validateForm = (e) => {
    e.preventDefault();
    setLoading(true);
    saveAutoBids(dispatch, autoBid); //Configure a new autobid
    if (!error) {
      setTimeout(() => {
        setSuccess(true);
        setErrorr(false);
        setLoading(false);
        navigate("/product-details/" + redirectPath, { state: "checked" }); // redirect back to product details page after 1 second
      }, 2000);
    } else {
      setSuccess(false);
      setErrorr(true);
      setLoading(false);
    }
  };

  return (
    <div className="auto-bid-container">
      <div className="auto-bid-wrapper">
        <div className="auto-bid-config-titles">
          <span className="auto-bid-settings">SETTINGS</span>
          <h1 className="configure-auto-bid">Configure Auto-bidding</h1>
        </div>
        <form className="bid-config-form" onSubmit={validateForm}>
          <div className="bid-amount-wrapper">
            <h4 className="maximum-bid-subtitle">Maximum bid amount</h4>
            <p className="maximum-bid-warning">
              The maximum amount will be split between all activated items
            </p>
            <div className="auto-bid-input">
              <span className="currency">$</span>
              <input
                type="number"
                className="auto-bid-input-amt"
                placeholder="Set max amount"
                name="amount"
                id="amount"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bid-alert-wrapper">
            <h4 className="bid-alert-notification">Bid Alert Notification</h4>
            <span className="get-notification">
              Get the notification about your reserved bids
            </span>
            <div className="notification-input">
              <span className="percentage">%</span>
              <input
                type="number"
                className="notification-reserved-bids"
                placeholder="Set percentage of max amount reserved for bid"
                name="threshold"
                id="threshold"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="save-configuration" type="submit">
            {loading ? (
              <CircularProgress
                color="success"
                style={{ backgroundColor: "transparent" }}
              />
            ) : (
              "Save"
            )}
          </button>
        </form>
        {success && (
          <span className="successconfig">Configuration Successful</span>
        )}

        {errorr && <span className="errorconfig">Configuration failed</span>}
      </div>
    </div>
  );
}

export default AutoBid;
