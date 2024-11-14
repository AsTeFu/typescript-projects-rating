import { RequestError } from '@/typings/request-error';

export class Fetcher {
  private baseUrl: string;

  constructor(data: { baseUrl: string }) {
    this.baseUrl = data.baseUrl;
  }

  private buildQueryString(params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : '';
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string>): string {
    const queryString = queryParams ? this.buildQueryString(queryParams) : '';
    return `${this.baseUrl}${endpoint}${queryString}`;
  }

  async get<T>(
    endpoint: string,
    options: { queryParams?: Record<string, string>; signal?: AbortSignal } = {},
  ): Promise<T> {
    try {
      const url = this.buildUrl(endpoint, options.queryParams);
      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'content-type': 'application/json' }),
        signal: options.signal,
      });

      if (!response.ok) {
        throw new RequestError(`HTTP error! status: ${response.status}`, response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}
