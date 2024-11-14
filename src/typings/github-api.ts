export interface ProjectOwnerDto {
  avatar_url: string;
}

export interface ProjectDto {
  id: number;
  full_name: string;
  stargazers_count: number;
  description: string;
  open_issues_count: number;
  html_url: string;
  owner: ProjectOwnerDto;
  updated_at: string;
}

export interface SearchProjectsResponse {
  items: ProjectDto[];
  total_count: number;
}
