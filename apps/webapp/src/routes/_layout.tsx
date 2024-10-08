import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: () => (
    <>
      <h2>Layout</h2>
      <main>
        <Outlet />
      </main>
    </>
  ),
});
