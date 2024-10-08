import { createFileRoute, Link } from '@tanstack/react-router';

import { useDrinks } from '../../hooks/useDrinks';

export const Route = createFileRoute('/_layout/')({
  component: () => {
    const searchParams = Route.useSearch();
    const { data: drinks, isLoading, error } = useDrinks(searchParams);

    return (
      <>
        <h1>Drinks</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {drinks &&
          drinks.map((drink) => (
            <Link
              to="/$drinkSlug"
              key={drink.slug}
              params={{ drinkSlug: drink.slug }}
            >
              <article>
                <h2>{drink.name}</h2>
                <p>{drink.description}</p>
              </article>
            </Link>
          ))}
      </>
    );
  },

  validateSearch: (searchParams: Record<string, unknown>) => {
    return {
      offset: searchParams.offset
        ? parseInt(searchParams.offset as string)
        : undefined,
      limit: searchParams.limit
        ? parseInt(searchParams.limit as string)
        : undefined,
    };
  },
});
