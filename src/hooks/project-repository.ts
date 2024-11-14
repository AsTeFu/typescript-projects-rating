import type { SearchProjectsResponse } from '../typings/github-api';
import { Project } from '../typings/project';
import type { Fetcher } from '../utils/fetcher';

export class ProjectRepository {
  private fetcher: Fetcher;

  constructor(data: { fetcher: Fetcher }) {
    this.fetcher = data.fetcher;
  }

  public async searchProjects(
    params: SearchProjectsParams & { signal?: AbortSignal },
  ): Promise<SearchProjectsResult> {
    const response = await this.fetcher.get<SearchProjectsResponse>(
      '/search/repositories',
      {
        queryParams: {
          q: params.query,
          sort: params.sortBy,
          order: params.order ?? 'desc',
          page: params.page?.toString() ?? '1',
          per_page: params.pageSize?.toString() ?? '15',
        },
        signal: params.signal,
      },
    );

    return {
      projects: response.items.map((item) => Project.fromDto(item)),
      total: response.total_count,
    };
  }
}

interface SearchProjectsParams {
  page?: number;
  pageSize?: number;
  query: string;
  sortBy: 'stars';
  order?: 'asc' | 'desc';
}

interface SearchProjectsResult {
  projects: Project[];
  total: number;
}
