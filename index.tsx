import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Long2 from './Long2';

// 1.vlad4you.ru → App (вариант 1), 2.vlad4you.ru → Long2 (вариант 2)
function getPageVariant(): '1' | '2' {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  if (host === '1.vlad4you.ru') return '1';
  if (host === '2.vlad4you.ru') return '2';
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  if (params?.get('v') === '2') return '2';
  return '1';
}

const Page = getPageVariant() === '2' ? Long2 : App;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);