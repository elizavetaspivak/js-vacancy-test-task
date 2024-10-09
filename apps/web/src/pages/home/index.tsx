import React, { useLayoutEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Group, Stack } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { SortDirection } from '@tanstack/react-table';

import { productApi } from 'resources/product';

import { ListParams, SortOrder } from 'types';

import { FilterCard } from './components/filterCard';
import { PaginationControls } from './components/paginationControls';
import { ProductsList } from './components/productsList/productsList';
import { SearchProducts } from './components/searchProducts';
import { PER_PAGE } from './constants';

type FilterParams = {
  price?: {
    from: number;
    to: number;
  };
};

type SortParams = {
  createdOn?: SortOrder;
};

export type ProductsListParams = ListParams<FilterParams, SortParams>;

const Marketplace: NextPage = () => {
  const [search, setSearch] = useInputState<string>('');
  const [page, setPage] = useState<number>(1);
  const [filterPriceFrom, setFilterPriceFrom] = useState<string>('');
  const [filterPriceTo, setFilterPriceTo] = useState<string>('');

  const [params, setParams] = useState<ProductsListParams>({
    page: 1,
    perPage: 5,
  });

  const [sorting, setSorting] = useState<SortDirection>('asc');

  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: products, isLoading: isProductListLoading } = productApi.useGetProducts({ ...params });

  useLayoutEffect(() => {
    if (!filterPriceFrom) {
      setParams((prev) => ({
        ...prev,
        filter: {},
      }));
    }

    if (filterPriceTo) {
      setParams((prev) => ({
        ...prev,
        filter: { price: { from: +filterPriceFrom, to: +filterPriceTo } },
      }));
    }
  }, [filterPriceFrom, filterPriceTo]);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page, perPage: PER_PAGE }));
  }, [page]);

  useLayoutEffect(() => {
    setParams((prev) => ({
      ...prev,
      sort: sorting === 'asc' ? { createdOn: 'asc' } : { createdOn: 'desc' },
    }));
  }, [sorting]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>

      <Group gap={28} align="flex-start" wrap="nowrap">
        <FilterCard
          setSearch={setSearch}
          filterPriceTo={filterPriceTo}
          filterPriceFrom={filterPriceFrom}
          setFilterPriceFrom={setFilterPriceFrom}
          setFilterPriceTo={setFilterPriceTo}
        />
        <Stack gap={20} flex={1}>
          <SearchProducts setSearch={setSearch} search={search} isProductListLoading={isProductListLoading} />
          <ProductsList
            sorting={sorting}
            setSorting={setSorting}
            products={products}
            filterPriceFrom={filterPriceFrom}
            filterPriceTo={filterPriceTo}
            isProductListLoading={isProductListLoading}
            setFilterPriceTo={setFilterPriceTo}
            setFilterPriceFrom={setFilterPriceFrom}
          />
          <PaginationControls page={page} pagesCount={products?.pagesCount} setPage={setPage} />
        </Stack>
      </Group>
    </>
  );
};

export default Marketplace;
