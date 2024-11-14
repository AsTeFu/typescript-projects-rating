import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';

import { ProjectRepository } from './project-repository';
import { Fetcher } from '../utils/fetcher';

const fetcher = new Fetcher({ baseUrl: 'https://api.github.com' });
const repository = new ProjectRepository({ fetcher: fetcher });

interface Params {
  page: number;
  pageSize: number;
}

export function useSearchProjects(params: Params) {
  const { data, isError, isPending, isFetching } = useQuery(
    useSearchProjects.options(params),
  );

  function totalPages() {
    if (!data?.total) {
      return;
    }

    const maxGithubApiPageNumber = Math.ceil(1000 / params.pageSize);
    return Math.min(Math.ceil(data.total / params.pageSize), maxGithubApiPageNumber);
  }

  return {
    projects: data?.projects ?? [],
    totalProjects: data?.total,
    totalPages: totalPages(),
    isError,
    isPending,
    isFetching,
  };
}

useSearchProjects.keys = (params: Params) => ['projects', params.page];

useSearchProjects.options = (params: Params) =>
  queryOptions({
    queryKey: useSearchProjects.keys(params),
    queryFn: ({ signal }) => {
      return repository.searchProjects({
        page: params.page,
        pageSize: params.pageSize,
        query: 'language:typescript',
        sortBy: 'stars',
        signal,
      });
    },
    placeholderData: keepPreviousData,
  });
