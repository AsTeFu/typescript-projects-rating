import type { ProjectDto } from './github-api';
import { ProjectOwner } from './project-owner';

const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  // hour: '2-digit',
  // minute: '2-digit',
  // second: '2-digit',
});

export class Project {
  public id: number;
  public name: string;
  public rating: number;
  public description: string;
  public repoLink: string;
  public owner: ProjectOwner;
  public updatedAt: string;

  constructor(data: {
    id: number;
    name: string;
    rating: number;
    description: string;
    repoLink: string;
    owner: ProjectOwner;
    updatedAt: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.rating = data.rating;
    this.description = data.description;
    this.repoLink = data.repoLink;
    this.owner = data.owner;
    this.updatedAt = data.updatedAt;
  }

  static fromDto(dto: ProjectDto) {
    return new Project({
      id: dto.id,
      name: dto.full_name,
      rating: dto.stargazers_count,
      description: dto.description,
      repoLink: dto.html_url,
      owner: ProjectOwner.fromDto(dto.owner),
      updatedAt: dto.updated_at,
    });
  }

  formatUpdateAt() {
    return formatter.format(new Date(this.updatedAt));
  }

  formatRating(): string {
    if (this.rating >= 1000) {
      return (this.rating / 1000).toFixed(1) + 'K';
    }
    return this.rating.toString();
  }
}
