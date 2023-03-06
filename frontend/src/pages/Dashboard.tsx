import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getAll } from '../modules/gateways/store/gatewaySlice';
import GatewayForm from '../modules/gateways/components/gatewayForm/GatewayForm';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { gateways } = useAppSelector((state) => state.gateway);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Gateways Dashboard</p>
      </section>
      {/* <ol>
        {gateways.map((e, i) => (
          <li key={`${e.name}${i}`}>{e.name}</li>
        ))}
      </ol> */}
    </>
  );
};

export default Dashboard;
