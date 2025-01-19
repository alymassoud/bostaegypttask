import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'; 

const SearchBar = ({ onSearch, languageDirection }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSearch = () => {
    if (trackingNumber.trim()) {
      onSearch(trackingNumber);
    } else {
      alert('Please enter a valid tracking number.');
    }
  };

  return (
    <div className={`search-bar ${languageDirection}`}>
      <input
        type="text"
        placeholder={languageDirection === "rtl" ? "أدخل رقم التتبع" : "Enter Tracking Number"}
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={handleSearch}>
        <SearchIcon className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
