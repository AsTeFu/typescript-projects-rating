import { createRoot } from 'react-dom/client';

import { AppQueryClientProvider } from '@/lib/query-client-provider.tsx';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { App } from '@/app';

import './index.css';

const root = document.querySelector('#root');

if (root) {
  createRoot(root).render(
    <NuqsAdapter>
      <AppQueryClientProvider>
        <App />
      </AppQueryClientProvider>
    </NuqsAdapter>,
  );
}
