import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    font-weight: 400;
  }
  body {
    font-family: 'Karla', 'Open Sans', sans-serif;
  }

  .primary-text {
    color: ${theme.colors.primary} !important;
  }

  #admin-layout > div {
    border-right: 1px solid #f0f0f0;
  }

  #admin-layout .trigger {
    padding: 0 12px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #admin-layout .trigger:hover {
    color: ${theme.colors.primary};
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .ant-layout-header {
    box-shadow: 2px 1px 4px 0 rgba(0, 0, 0, 0.05);
    z-index: 1000;
    padding: 0 12px;
    background: #fff;
  }

  .ant-layout {
    background: #fff;
  }

  .ant-image-preview-operations {
    line-height: 41px !important;
    background: rgba(0, 0, 0, 0.5) !important;
  }

  .ant-image-preview-mask {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }

  .mb-1 {
    margin-bottom: 8px !important;
  }

  .mb-2 {
    margin-bottom: 12px !important;
  }

  .mr-1 {
    margin-right: 8px !important;
  }

  .text-bold {
    font-weight: 500;
  }

  .font-16 {
    font-size: 16px !important;
  }

  button:not(.ant-btn-primary):hover {
    color: #0D5C3F !important;
    border-color: #009688;
  }

  .loadingSpinnerContainer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loadingSpinner {
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #000 transparent #555 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ant-modal-confirm-body-wrapper button.ant-btn-primary {
  background-color: ${theme.colors.primary};

  &:hover {
    background-color: #3a3a3d;
  }
}

/* 
  .table-selectable {
    tr > td {
      cursor: pointer;
    }
  }
  .ant-table-wrapper {
    tr th.ant-table-cell {
      font-weight: bold;
    }
  } */

  .ant-modal-confirm-title {
    font-weight: 300 !important;
  }

  .bg--gray {
    background-color: #f9f9f9;
  }

  .bb--gray {
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-input::placeholder {
    color: #757575;
    opacity: 0.8;
  }

  .ant-typography.ant-typography-secondary {
    color: #18181b;
  }

  a:focus-visible,
  .ant-btn-link:focus-visible,
  .ant-pagination-item:focus-visible {
    outline: 0;
    border: 1px solid #cac8c8 !important;
  }
  .ant-col.form-list:focus-visible .ant-card.ant-card-bordered.ant-card-hoverable {
    outline: 0;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }
  .ant-col.form-list {
    outline: 0;
  }
  .ant-table-tbody > tr.ant-table-row:focus-visible > td {
    background: #eee;
  }
`;

export default GlobalStyles;
