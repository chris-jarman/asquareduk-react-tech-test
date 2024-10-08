import { useQuery } from '@tanstack/react-query';

import type { Drink } from 'shared-types/drinks';

export const useDrink = (slug: Drink['slug']) =>
  useQuery({
    queryKey: ['getDrink', slug],
    queryFn: async ({ signal }) => {
      const url = new URL(
        `/drinks/${slug}`,
        import.meta.env.VITE_BACKEND_ORIGIN,
      );
      const response = await fetch(url, { signal });
      const drink: Drink = await response.json();
      return drink;
    },
  });
