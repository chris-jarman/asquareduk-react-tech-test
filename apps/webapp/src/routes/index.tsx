import { type FC } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

const Index: FC = () => {
  const {
    data: drinks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getDrinks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/drinks');
      const drinks = await response.json();
      return drinks;
    },
  });

  return (
    <>
      <h1>Home</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {drinks &&
        drinks.map((drink: any) => (
          <article key={drink.slug}>
            <h2>{drink.name}</h2>
            <p>{drink.description}</p>
          </article>
        ))}
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
