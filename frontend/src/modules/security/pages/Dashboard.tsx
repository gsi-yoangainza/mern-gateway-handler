import React from 'react';

import { useAppSelector } from '../../../app/hooks';
import { intl } from '../../../core/helpers/i18nHelper';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <section className="heading">
        <h1>{`${intl('welcome')} ${user && user.name}`}</h1>
        <p>{intl('gatewayDashboard')}</p>
      </section>
    </div>
  );
};

export default Dashboard;
