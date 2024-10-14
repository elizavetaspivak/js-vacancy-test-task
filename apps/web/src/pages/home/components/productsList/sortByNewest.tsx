import React, { useState } from 'react';
import { ActionIcon, Box, Flex, Pill, Stack } from '@mantine/core';
import { SortDirection } from '@tanstack/react-table';

import { ProductResponce } from 'resources/product/product.api';

import { SortArrowIcon } from 'components/icons/sortArrowIcon';
import { SortArrowUpIcon } from 'components/icons/sortArrowUpIcon';
import { SortIcon } from 'components/icons/sortIcon';

import { ListResult } from 'types';

import s from './sortByNewest.module.css';

type SortByNewestProps = {
  products: ListResult<ProductResponce> | undefined;
  filterPriceFrom: string;
  filterPriceTo: string;
  setFilterPriceFrom: React.Dispatch<React.SetStateAction<string>>;
  setFilterPriceTo: React.Dispatch<React.SetStateAction<string>>;
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<SortDirection>>;
};

export const SortByNewest = ({
  products,
  filterPriceFrom,
  filterPriceTo,
  setFilterPriceFrom,
  setFilterPriceTo,
  sorting,
  setSorting,
}: SortByNewestProps) => {
  const [sort, setSort] = useState('asc');
  const handleSort = () => {
    setSorting(sorting === 'asc' ? 'desc' : 'asc');
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Box fw="bold">{products?.count} results</Box>

        <Stack>
          <Flex justify="start">
            <Box w="20px" mr="5px" mt="2px">
              <SortIcon />
            </Box>
            <Box>Sort by newest</Box>
            <ActionIcon variant="transparent" color="gray" aria-label="Settings" onClick={handleSort}>
              <Box w="16px">{sort === 'asc' ? <SortArrowIcon /> : <SortArrowUpIcon />}</Box>
            </ActionIcon>
          </Flex>
        </Stack>
      </Flex>
      <Box mt="15px">
        {filterPriceFrom && filterPriceTo && (
          <Box mb="20px">
            <Pill
              size="lg"
              classNames={{
                root: s.root,
                remove: s.remove,
              }}
              withRemoveButton
              onRemove={() => {
                setFilterPriceFrom('');
                setFilterPriceTo('');
              }}
            >
              ${filterPriceFrom}-${filterPriceTo}
            </Pill>
          </Box>
        )}
      </Box>
    </Box>
  );
};
