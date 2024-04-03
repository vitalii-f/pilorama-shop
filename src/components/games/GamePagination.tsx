'use client';

import { Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const GamePagination = ({
  currentPage,
  count,
}: {
  currentPage: number;
  count: number;
}) => {
  const itemsPerPage = 8;
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(count / itemsPerPage);

  return (
    <Pagination
      defaultPage={currentPage}
      shape='rounded'
      count={pageCount}
      color='primary'
      sx={{ alignSelf: 'center' }}
      renderItem={(item) => {
        const params = new URLSearchParams(searchParams.toString());
        if (item.page) {
          params.set('page', item.page.toString());
          if (item.page === 1) params.delete('page');
        } else {
          params.delete('page');
        }
        if (item.page! > pageCount || item.page! < 1) return <PaginationItem {...item} />;
        return (
          <Link href={`games?${params}`}>
            <PaginationItem {...item} />
          </Link>
        );
      }}
    />
  );
};

export default GamePagination;
