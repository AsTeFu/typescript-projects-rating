import type { PropsWithChildren } from 'react';

import { Skeleton } from '@/components/shadcn/skeleton';
import { Loader } from 'lucide-react';

export function ProjectsList({ children }: PropsWithChildren) {
  return <div className="relative grid flex-1 gap-4 py-8">{children}</div>;
}

export function ProjectListLoader() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-white/70 backdrop-blur-sm">
      <Loader className="mx-auto animate-spin" />
    </div>
  );
}

export function ProjectsListSkeleton(props: { pageSize: number }) {
  return (
    <ProjectsList>
      {Array.from({ length: props.pageSize }, (_, i) => i + 1).map((id) => (
        <Skeleton key={id} className="container h-[138px] rounded-xl" />
      ))}
    </ProjectsList>
  );
}
