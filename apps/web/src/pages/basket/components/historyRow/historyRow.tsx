import React from 'react';
import { NextPage } from 'next';
import { Box, Flex, Image, Table } from '@mantine/core';

import { CardResponce } from 'resources/cart/cart.api';

import classes from './historyRow.module.css';

const HistoryRow: NextPage<{ cart: CardResponce }> = ({ cart }) => {
  const paymentDate = new Date(cart.paymentDate!);
  const year = paymentDate.getFullYear();
  const month = paymentDate.getMonth() + 1;
  const day = paymentDate.getDate();

  return (
    <Table.Tr key={cart.product.title}>
      <Table.Td w="900px">
        <Flex align="center" justify="flex-start">
          <Box w={80} h={80} className={classes.imageBox}>
            <Image src={cart.product.imageUrl} alt="Product" width={80} height={80} />
          </Box>
          <Box ml="20px" fw="bold" fz="16px">
            {cart.product.title}
          </Box>
        </Flex>
      </Table.Td>
      <Table.Td w="200px" align="center" mr="100px">
        <Box mr="60px">${cart.product.price * cart.quantity}</Box>
      </Table.Td>
      <Table.Td w="200px" align="center" mr="100px">
        <Box mr="60px">{cart.quantity}</Box>
      </Table.Td>
      <Table.Td>
        {day}.{month < 10 ? `0${month}` : month}.{year.toString().slice(2)}
      </Table.Td>
    </Table.Tr>
  );
};

export default HistoryRow;
