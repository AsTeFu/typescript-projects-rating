import type { PropsWithChildren } from 'react';

import { RequestError } from '@/typings/request-error';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry(count, error) {
        if (count > 3) return false;

        if (error instanceof RequestError && error.statusCode === 403) {
          return true;
        }

        return false;
      },
      retryDelay(count, error) {
        if (count > 3) return 0;

        if (error instanceof RequestError && error.statusCode === 403) {
          return 1000 * 30;
        }

        return 0;
      },
      staleTime: 60 * 10,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppQueryClientProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
