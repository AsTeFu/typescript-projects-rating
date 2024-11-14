import type { PropsWithChildren } from 'react';

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="container mx-auto flex w-full flex-1 flex-col pb-12">
      {children}
    </main>
  );
}
