import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <h1>Root</h1>
      <Outlet />
    </>
  ),
});
