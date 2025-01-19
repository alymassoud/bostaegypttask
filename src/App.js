import React from 'react';
import TrackingPage from './pages/TrackingPage';
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";


function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <TrackingPage />
    </div>
  );
}

export default App;
