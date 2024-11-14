import { PageLayout } from '@/components/page-layout';
import { PagePaginator } from '@/components/page-paginator';
import { parseAsInteger, useQueryState } from 'nuqs';

import { ProjectCard } from './components/project-card';
import {
  ProjectListLoader,
  ProjectsList,
  ProjectsListSkeleton,
} from './components/projects-list';
import { useSearchProjects } from './hooks/use-search-project';

const pageSize = 10;

export function App() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const { projects, totalPages, isPending, isError, isFetching } = useSearchProjects({
    page: page,
    pageSize: pageSize,
  });

  return (
    <PageLayout>
      <h1 className="text-start text-xl">Список TypeScript репозиториев</h1>

      {isPending ? (
        <ProjectsListSkeleton pageSize={pageSize} />
      ) : isError ? (
        <div>Ошибка загрузки репозиториев, обновите страницу</div>
      ) : (
        <>
          <ProjectsList>
            {projects.map((project) => (
              <ProjectCard key={project.id.toString()} project={project} />
            ))}

            {isFetching ? <ProjectListLoader /> : null}
          </ProjectsList>
        </>
      )}

      {totalPages ? (
        <PagePaginator page={page} total={totalPages} onChange={setPage} />
      ) : null}
    </PageLayout>
  );
}
