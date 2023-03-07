import React from 'react';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { usei18nAntd } from './core/hooks/usei18nAntd';
import { initTranslation } from './core/helpers/i18nHelper';
import Login from './modules/security/components/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Theme from './core/theme/theme';
import GlobalStyles from './core/theme/global';
import MainLayout from './layout/components/MainLayout';
import ErrorPage from './modules/common/components/ErrorPage';
import GatewayList from './modules/gateways/components/GatewayList';
import i18n from './core/config/i18n/i18n';
import PeripheralList from './modules/peripherals/components/PeripheralList';
import Dashboard from './modules/security/pages/Dashboard';
import Register from './modules/security/components/Register';

const App: React.FunctionComponent = () => {
  const { locale } = usei18nAntd();
  initTranslation(useTranslation);
  return (
    <I18nextProvider {...{ i18n }}>
      <ConfigProvider
        {...{ locale }}
        theme={{
          token: {
            colorPrimary: '#18181b',
            colorIcon: '#18181b',
            colorLink: '#393939',
            colorLinkHover: '#0D5C3F',
            colorPrimaryHover: '#3a3a3d',
          },
        }}
      >
        <Theme>
          <GlobalStyles />
          <>
            <Router>
              <Routes>
                <Route path="" element={<MainLayout />}>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/gateways"
                    element={
                      <ProtectedRoute>
                        <GatewayList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/peripherals"
                    element={
                      <ProtectedRoute>
                        <PeripheralList />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Router>
          </>
        </Theme>
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;
