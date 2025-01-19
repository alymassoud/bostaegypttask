import React from 'react';
import { useTranslation } from "react-i18next"; // Importing i18n for translations

const Delivery = ({ currentStage, timestamps }) => {
  const { t } = useTranslation(); // Get the translation function

  const stages = ['pickup', 'processing', 'out_for_delivery', 'delivered']; // Key names in the JSON

  return (
    <div className="delivery">
      <div className="timeline">
        <div className="timeline-bar" style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}></div>
      </div>
      <ul className="timeline-stages">
        {stages.map((stage, index) => (
          <li key={index} className={index <= currentStage ? 'completed' : 'incomplete'}>
            <div className={`circle ${index <= currentStage ? 'completed' : ''}`}></div>
            <span>{t(`stages.${stage}`)}</span> {/* Translate the stage name dynamically */}
            {timestamps[index] && <span className="timestamp">{timestamps[index]}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delivery;
