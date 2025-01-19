import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';

const ShipmentDetails = ({ shipment }) => {
  const { t, i18n } = useTranslation();

  if (!shipment) return null;

  const { trackingNumber, status, expectedDelivery, trackingDetails } = shipment;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ar-EG', options);
  };

  const statusProgress = status === 'Delivered' ? 100 : status === 'In Transit' ? 50 : 0;

  const stages = ['pickedup', 'processing', 'out_for_delivery', 'delivered'];

  const progressClasses = stages.map((stage, index) => {
    if (statusProgress >= (index + 1) * 25) {
      return 'completed';
    }
    return 'incomplete';
  });

  return (
    <div className={`shipment-details ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="shipment-box">
        <div className="order-info">
          <h2 className="order-number">{t('ORDER')} #{trackingNumber}</h2>
          <p><strong className="arriving-date">{t('ARRIVING_BY')}:</strong> <span className="formatted-date">{formatDate(expectedDelivery)}</span></p>
          <p><strong className="expected-date-message">{t('EXPECTED_DELIVERY')}</strong></p>
        </div>
        <div className="divider"></div>

        <div className="timeline-section">
          <div className="timeline">
            <div className="timeline-bar" style={{ width: `${statusProgress}%` }}></div>
          </div>
          <div className="progress-stages">
            {stages.map((stage, index) => (
              <li key={index} className={progressClasses[index]}>
                <div className="circle">
                  {progressClasses[index] === 'completed' ? (
                    <FaCheckCircle className="verify-icon" />
                  ) : (
                    <div className="empty-circle"></div>
                  )}
                </div>
              </li>
            ))}
          </div>
          <div className="progress-labels">
            {stages.map((stage, index) => (
              <span key={index}>{t(`stages.${stage}`)}</span>
            ))}
          </div>
        </div>
      </div>


      <h3 className={`tracking-details ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
  {t('TRACKING_DETAILS')}
</h3>
<div className={`tracking-details-box ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
  {trackingDetails && trackingDetails.length > 0 ? (
    trackingDetails.map((detail, index) => (
      <div key={index} className="tracking-event">
        <p><strong>{detail.date}</strong></p>
        <p>{detail.event}</p>
        <p><em>{detail.location}</em></p>
      </div>
    ))
  ) : (
    <p>{t('NO_TRACKING_DETAILS')}</p>
  )}
</div>


    </div>
  );
};

export default ShipmentDetails;
