import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Card, Flex, Group, Skeleton, Table, Text } from '@mantine/core';
import { loadStripe } from '@stripe/stripe-js';

import { CardResponce, useCheckoutCart, useGetCart } from 'resources/cart/cart.api';

import { BasicButton } from 'components/basic-button/basicButton';

import config from 'config';

import { SaleStatus } from 'schemas';

import CartRow from '../components/cartRow/cartRow';
import EmptyPage from '../components/emptyPage/emptyPage';

import classes from './cart.module.css';

const ths = (
  <Table.Tr c="#767676">
    <Table.Th>Item</Table.Th>
    <Table.Th>Unit Price</Table.Th>
    <Table.Th>Quantity</Table.Th>
    <Table.Th />
  </Table.Tr>
);

const Cart: NextPage = () => {
  const { data: carts, isFetched, isLoading } = useGetCart();
  const { mutateAsync: checkoutCart } = useCheckoutCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = carts?.reduce((acc, el) => acc + (el.product?.price ?? 0) * el.quantity, 0);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    price && setTotalPrice(price);
  }, [carts]);

  const makePayment = async () => {
    if (config.STRIPE_PK) {
      const stripe = await loadStripe(config.STRIPE_PK);

      const session = await checkoutCart();

      await stripe?.redirectToCheckout({ sessionId: session.id });
    }
  };

  if (isFetched && carts && !carts.length) {
    return <EmptyPage />;
  }

  const rows = carts?.map((element: CardResponce) => <CartRow key={element._id} cart={element} />);

  const isSomethingSold = carts?.some((cart) => cart.product.saleStatus === SaleStatus.SOLD);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Flex justify="space-between" mt="30px">
        <Box w="70%">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={`sklton-${String(item)}`} height={50} radius="sm" mb="sm" />
              ))}
            </>
          ) : (
            <Table captionSide="bottom">
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Box>
        <Box>
          <Card w="100%" shadow="sm" padding="xs" radius="md" withBorder>
            <Group justify="space-between" mt="xs" mb="xs">
              <Text className={classes.summary} fw={700}>
                Summary
              </Text>
            </Group>

            <Group justify="space-between" mt="xs" mb="xs">
              <Text fw={500} className={classes.totalPrice} size="sm" c="dimmed">
                Total price
              </Text>
              <Text className={classes.summary} fw={700} size="sm">
                ${totalPrice}
              </Text>
            </Group>

            <BasicButton
              disabled={isSomethingSold}
              onClick={makePayment}
              fullWidth
              variant="filled"
              text="Proceed to Checkout"
              backGroundColor="blue"
              marginTop="md"
            />
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default Cart;
