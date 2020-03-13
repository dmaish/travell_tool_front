import React from 'react';
import ContentLoader from 'react-content-loader';

const AnalyticsCardPlaceholder = props => (
  <div className="analytics-card">
    <ContentLoader
      height={350}
      width={400}
      speed={1.5}
      primaryColor="#dfdfdf"
      secondaryColor="#ffffff"
      {...props}
    >
      <rect x="-0.49" y="33.69" rx="3" ry="3" width="294.49" height="14.58" />
      <rect x="3.63" y="78.61" rx="0" ry="0" width="386.85" height="192.31" />
      <rect x="205.72" y="17.61" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  </div>
);

export default AnalyticsCardPlaceholder;
