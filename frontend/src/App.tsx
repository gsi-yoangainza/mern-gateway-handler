import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './modules/common/components/MenuItems';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import 'antd/dist/reset.css';
import Theme from './core/theme/theme';
import GlobalStyles from './core/theme/global';
import { ConfigProvider } from 'antd';
import MainLayout from './layout/components/MainLayout';
import ErrorPage from './modules/common/components/ErrorPage';
import GatewayList from './modules/gateways/components/GatewayList';
import { usei18nAntd } from './core/hooks/usei18nAntd';
import { initTranslation } from './core/helpers/i18nHelper';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './core/config/i18n/i18n';
import PeripheralList from './modules/peripherals/components/PeripheralList';

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
            <ToastContainer />
          </>
        </Theme>
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;
