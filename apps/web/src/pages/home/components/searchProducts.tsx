import React, { ChangeEvent } from 'react';
import { ActionIcon, Skeleton, Stack, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

import classes from '../index.module.css';

type SearchProductsProps = {
  search: string;
  isProductListLoading: boolean;
  setSearch: (value: string | ChangeEvent<any> | null | undefined) => void;
};

export const SearchProducts = ({ isProductListLoading, setSearch, search }: SearchProductsProps) => (
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
