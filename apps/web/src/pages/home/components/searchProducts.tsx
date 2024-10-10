import React, { useLayoutEffect } from 'react';
import { ActionIcon, Skeleton, TextInput } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';

import { ProductsListParams } from 'types';

import classes from '../index.module.css';

type SearchProductsProps = {
  params: ProductsListParams;
  setParams: (params: ProductsListParams) => void;
  isProductListLoading: boolean;
};

export const SearchProducts = ({ isProductListLoading, setParams, params }: SearchProductsProps) => {
  const [search, setSearch] = useInputState('');

  const [debouncedSearch] = useDebouncedValue(search, 500);

  useLayoutEffect(() => {
    setParams({ ...params, searchValue: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <Skeleton className={classes.inputSkeleton} height={42} radius="sm" visible={isProductListLoading} width="auto">
      <TextInput
        w="100%"
        size="md"
        value={search}
        onChange={setSearch}
        placeholder="Type to search"
        leftSection={<IconSearch size={16} />}
        rightSection={
          search && (
            <ActionIcon variant="transparent" onClick={() => setSearch('')}>
              <IconX color="gray" stroke={1} />
            </ActionIcon>
          )
        }
      />
    </Skeleton>
  );
};
