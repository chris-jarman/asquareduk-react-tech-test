import { type FC } from 'react';

import { createFileRoute } from '@tanstack/react-router';

const Index: FC = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
