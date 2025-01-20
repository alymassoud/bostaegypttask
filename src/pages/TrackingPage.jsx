import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../components/SearchBar";
import ShipmentDetails from "../components/ShipmentDetails";
import ErrorMessage from "../components/ErrorMessage";
import { fetchShipmentData, transformTrackingDetails } from "../services/apiService";
import "./TrackingPage.css";
import logoEn from "../assets/bosta.en.png";
import logoAr from "../assets/bosta.ar.png";
import { FaAngleDown } from "react-icons/fa";

const TrackingPage = () => {
  const { t, i18n } = useTranslation();
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const logo = i18n.language === "ar" ? logoAr : logoEn;
  const logoPositionClass = i18n.language === "ar" ? "logo-right" : "logo-left";

  const handleSearch = async (trackingNumber) => {
    setError("");
    setLoading(true);
    setShipment(null);

    try {
      const data = await fetchShipmentData(trackingNumber);
      setShipment({
        trackingNumber: data.TrackingNumber,
        status: data.CurrentStatus.state,
        expectedDelivery: 
          data.CurrentStatus.state === "Delivered" || data.CurrentStatus.state === "Returned"
            ? data.CurrentStatus.state
            : data.PromisedDate,
        trackingDetails: transformTrackingDetails(data),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    document.body.setAttribute("dir", newLanguage === "ar" ? "rtl" : "ltr");
  };

  return (
    <div className="tracking-page">
      <div className="top-section">
        <img src={logo} alt="Logo" className={`logo ${logoPositionClass}`} />
        <div className="pin-icon"></div>
        <h1 className="tracking-title">{t("Track Your Order")}</h1>

        <div className={`language-switcher ${i18n.language === "ar" ? "rtl" : "ltr"}`}>
          <span className="language-text" onClick={toggleLanguage}>
            {i18n.language === "en" ? "عربي" : "English"}
          </span>
          <FaAngleDown className="dropdown-icon" onClick={toggleLanguage} />
        </div>

        <div className="search-bar-wrapper">
          <SearchBar 
            onSearch={handleSearch} 
            languageDirection={i18n.language === "ar" ? "rtl" : "ltr"} 
          />
        </div>
      </div>

      <main className="content-section">
        {loading && <p className="loading-text">{t("Loading...")}</p>}
        <ErrorMessage message={error} />
        {shipment && (
          <ShipmentDetails shipment={shipment} />
        )}
      </main>
    </div>
  );
};

export default TrackingPage;
