import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn/pagination';

type Props = {
  page: number;
  onChange: (value: number) => void;
  total: number;
};

export function PagePaginator({ page, onChange, total }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={page === 1} onClick={() => onChange(page - 1)} />
        </PaginationItem>

        {page > 2 && (
          <PaginationItem>
            <PaginationButton onClick={() => onChange(1)}>1</PaginationButton>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => onChange(page - 1)}>
              {page - 1}
            </PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationButton isActive>{page}</PaginationButton>
        </PaginationItem>

        {page < total && (
          <PaginationItem>
            <PaginationButton onClick={() => onChange(page + 1)}>
              {page + 1}
            </PaginationButton>
          </PaginationItem>
        )}

        {page + 2 < total && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < total - 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => onChange(total)}>{total}</PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext disabled={page === total} onClick={() => onChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
