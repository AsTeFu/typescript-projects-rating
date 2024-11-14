import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { StarIcon } from 'lucide-react';

import type { Project } from '../typings/project';

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img
            src={project.owner.avatar}
            alt="Изображение проекта"
            width="20px"
            height="20px"
            className="rounded-sm"
          />

          <a
            className="text-blue-700 transition-colors hover:text-blue-500"
            href={project.repoLink}
          >
            {project.name}
          </a>
        </CardTitle>
        <CardDescription>
          <p className="text-start">{project.description}</p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="flex items-center gap-2">
          <li className="flex shrink-0 items-center gap-1 text-start text-sm text-muted-foreground">
            <StarIcon className="size-5" /> {project.formatRating()}
          </li>
          <span aria-hidden="true" className="text-sm text-muted-foreground">
            ·
          </span>
          <li className="text-sm text-muted-foreground">
            Обновлено {project.formatUpdateAt()}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
