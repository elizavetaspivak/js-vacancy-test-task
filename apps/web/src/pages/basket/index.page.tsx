import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Flex, Title } from '@mantine/core';

import Cart from './cart/index.page';
import History from './history/index.page';

enum Pages {
  CART = 'cart',
  HISTORY = 'history',
}

const Basket: NextPage = () => {
  const [activePage, setActivePage] = useState<Pages>(Pages.CART);

  return (
    <>
      <Head>
        <title>Basket</title>
      </Head>

      <Box w="192px">
        <Flex align="center" justify="space-between">
          <Title c={activePage === Pages.CART ? 'black' : 'gray'} order={3} onClick={() => setActivePage(Pages.CART)}>
            My cart
          </Title>

          <Title
            c={activePage === Pages.HISTORY ? 'black' : 'gray'}
            order={3}
            onClick={() => setActivePage(Pages.HISTORY)}
          >
            History
          </Title>
        </Flex>
      </Box>

      <Box>{activePage === 'cart' ? <Cart /> : <History />}</Box>
    </>
  );
};

export default Basket;
