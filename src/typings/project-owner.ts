import type { ProjectOwnerDto } from './github-api';

export class ProjectOwner {
  public avatar: string;

  constructor(data: { avatar: string }) {
    this.avatar = data.avatar;
  }

  static fromDto(dto: ProjectOwnerDto) {
    return new ProjectOwner({
      avatar: dto.avatar_url as string,
    });
  }
}
