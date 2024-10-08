import { useQuery } from '@tanstack/react-query';

import type { Drink } from 'shared-types/drinks';

export const useDrinks = ({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
}) =>
  useQuery({
    queryKey: ['getDrinks', offset, limit],
    queryFn: async ({ signal }) => {
      const url = new URL('/drinks', import.meta.env.VITE_BACKEND_ORIGIN);
      if (offset !== undefined) {
        url.searchParams.set('offset', offset.toString());
      }
      if (limit !== undefined) {
        url.searchParams.set('limit', limit.toString());
      }
      const response = await fetch(url, { signal });
      const drinks: Array<Drink> = await response.json();
      return drinks;
    },
  });
