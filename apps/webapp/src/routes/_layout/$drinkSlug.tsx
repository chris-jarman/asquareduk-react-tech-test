import { createFileRoute } from '@tanstack/react-router';

import { useDrink } from '../../hooks/useDrink';

export const Route = createFileRoute('/_layout/$drinkSlug')({
  component: () => {
    const { drinkSlug } = Route.useParams();
    const { data: drink, isLoading, error } = useDrink(drinkSlug);

    return (
      <>
        <h1>Drink</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {drink && (
          <article>
            <h2>{drink.name}</h2>
            <p>{drink.description}</p>
          </article>
        )}
      </>
    );
  },
});
