import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Group, Stack, Title } from '@mantine/core';

import { productApi } from 'resources/product';

import { CreateNewProduct } from './components/createNewProduct';
import { PrivateProduct } from './components/privateProduct';

const Products: NextPage = () => {
  const { data: products } = productApi.useGetMyProducts();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Stack gap={20} mt={10}>
        <Title order={2}>Your Products</Title>

        <Group gap={20}>
          <CreateNewProduct />
          {products?.results?.map((p) => <PrivateProduct key={p._id} product={p} />)}
        </Group>
      </Stack>
    </>
  );
};

export default Products;
