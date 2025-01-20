import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';

const ShipmentDetails = ({ shipment }) => {
  const { t, i18n } = useTranslation();

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  if (!shipment) return null;

  const { trackingNumber, status, expectedDelivery, trackingDetails } = shipment;

  const formatDate = (dateStr) => {
    if (!dateStr) return t('UNKNOWN DATE');
    const date = new Date(dateStr);
    if (isNaN(date)) return t('INVALID DATE');
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ar-EG', options);
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return t('UNKNOWN TIME');
    const date = new Date(dateStr);
    if (isNaN(date)) return t('INVALID TIME');
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString(i18n.language === 'en' ? 'en-US' : 'ar-EG', options);
  };

  const statusProgress = status === 'Delivered' ? 100 : status === 'In Transit' ? 50 : 0;

  const stages = ['pickedup', 'processing', 'out_for_delivery', 'delivered'];

  const progressClasses = stages.map((stage, index) => {
    if (statusProgress >= (index + 1) * 25) {
      return 'completed';
    }
    return 'incomplete';
  });

  const groupedTrackingDetails = trackingDetails?.reduce((acc, detail) => {
    const date = formatDate(detail.date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(detail);
    return acc;
  }, {}) || {};

  return (
    <div className={`shipment-details ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="shipment-box">
        <div className="order-info">
          <h2 className="order-number">{t('ORDER')} #{trackingNumber}</h2>
          <p>
            <strong className="arriving-date">{t('ARRIVING_BY')}:</strong>{' '}
            <span className="formatted-date">{formatDate(expectedDelivery)}</span>
          </p>
          <p>
            <strong className="expected-date-message">{t('EXPECTED_DELIVERY')}</strong>
          </p>
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
        {Object.keys(groupedTrackingDetails).length > 0 ? (
          Object.entries(groupedTrackingDetails).map(([date, events], index) => (
            <div key={index} className="tracking-date-group">
              <h4 className={`detail-date ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>{date}</h4>
              <div className="events-box">
                {events.map((detail, eventIndex) => (
                  <div key={eventIndex} className="tracking-event">
                    <p>
                      <strong className="detail-event">{t('')}</strong>{' '}
                      {capitalizeFirstLetter(t(`${detail.event.toLowerCase()}`))}
                    </p>
                    {detail.location && (
                      <p>
                        <strong>{t('')}</strong> {detail.location}
                      </p>
                    )}
                    {detail.reason && (
                      <p>
                        <strong>{t('')}</strong>{' '}
                        {t(`reasons.${detail.reason.toLowerCase()}`)}
                      </p>
                    )}
                    <p>
                      <strong>{t('')}</strong> {formatTime(detail.date)}
                    </p>
                  </div>
                ))}
              </div>
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
