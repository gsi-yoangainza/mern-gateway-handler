import React from 'react';
import { isEmpty } from 'lodash';
import { Navigate, useLocation } from 'react-router-dom';

import gatewayService from '../modules/users/services/authService';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const session = gatewayService.getSession();
  let location = useLocation();

  if (isEmpty(session)) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
