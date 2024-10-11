import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Group, Skeleton, Stack, Title } from '@mantine/core';

import { productApi } from 'resources/product';

import { CreateNewProduct } from './components/createNewProduct';
import { PrivateProduct } from './components/privateProduct';

const Products: NextPage = () => {
  const { data: products, isLoading } = productApi.useGetMyProducts();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Stack gap={20} mt={10}>
        <Title order={2}>Your Products</Title>
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
            ))}
          </>
        ) : (
          <Group gap={20}>
            <CreateNewProduct />

            {products?.results?.map((p) => <PrivateProduct key={p._id} product={p} />)}
          </Group>
        )}
      </Stack>
    </>
  );
};

export default Products;
