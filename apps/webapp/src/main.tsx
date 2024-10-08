import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
