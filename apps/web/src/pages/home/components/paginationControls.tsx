import React from 'react';
import { Box, Pagination } from '@mantine/core';

type PaginationControlsProps = {
  pagesCount: number | undefined;
  page: number;
  setPage: (page: number) => void;
};

export const PaginationControls = ({ pagesCount, page, setPage }: PaginationControlsProps) => {
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box mt="20px" mb="20px">
      {pagesCount && pagesCount > 1 && (
        <Pagination
          style={{ width: '10em', marginLeft: 'auto', marginRight: 'auto' }}
          color="blue"
          total={pagesCount}
          value={page}
          onChange={handleChangePage}
          mt="sm"
        />
      )}
    </Box>
  );
};
