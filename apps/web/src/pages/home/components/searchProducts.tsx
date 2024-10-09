import React, { useLayoutEffect } from 'react';
import { ActionIcon, Skeleton, TextInput } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';

import classes from '../index.module.css';

type SearchProductsProps = {
  search: string;
  isProductListLoading: boolean;
  setSearch: (value: string) => void;
};

export const SearchProducts = ({ isProductListLoading, setSearch, search }: SearchProductsProps) => {
  const [searchProduct, setSearchProduct] = useInputState('');

  const [debouncedSearch] = useDebouncedValue(searchProduct, 500);

  useLayoutEffect(() => {
    setSearch(searchProduct);
  }, [debouncedSearch]);

  return (
    <Skeleton className={classes.inputSkeleton} height={42} radius="sm" visible={isProductListLoading} width="auto">
      <TextInput
        w="100%"
        size="md"
        value={search}
        onChange={setSearchProduct}
        placeholder="Type to search"
        leftSection={<IconSearch size={16} />}
        rightSection={
          search && (
            <ActionIcon variant="transparent" onClick={() => setSearchProduct('')}>
              <IconX color="gray" stroke={1} />
            </ActionIcon>
          )
        }
      />
    </Skeleton>
  );
};
