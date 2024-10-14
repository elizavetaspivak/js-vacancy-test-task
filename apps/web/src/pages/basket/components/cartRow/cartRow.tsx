import React from 'react';
import { NextPage } from 'next';
import { Box, Button, Flex, Image, Table, Text, UnstyledButton } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { CardResponce, useRemoveCart, useUpdateCart } from 'resources/cart/cart.api';

import { sendNotification } from 'components/notifications/notification';

import { ProductStatus, SaleStatus } from 'schemas';

import classes from './cartRow.module.css';

const CartRow: NextPage<{ cart: CardResponce }> = ({ cart }) => {
  const { mutate: updateCart } = useUpdateCart<{ id: string; quantity: number }>();
  const { mutate: removeCart } = useRemoveCart();

  const handleUpdateCart = (id: string, quantity: number) => {
    if (quantity > cart.product.quantity) {
      sendNotification('Error', "You can't do that because the seller doesn't have that many items.", 'red');
      return;
    }

    if (quantity > 0) {
      updateCart({ id, quantity });
    }
  };

  return (
    <Table.Tr key={cart.product?.title}>
      <Table.Td w="600px">
        <Flex align="center" justify="flex-start">
          <Box w={80} h={80} className={classes.image}>
            <Image src={cart.product?.imageUrl} alt="Product" width={80} height={80} />
          </Box>
          <Box ml="20px" fw="bold" fz="16px">
            {cart.product?.title}
            {cart.product.saleStatus === SaleStatus.SOLD && (
              <Text size="xs" c="red">
                Product is out. Remove to proceed.
              </Text>
            )}
            {cart.product.productStatus === ProductStatus.DELETED && (
              <Text size="xs" c="red">
                Product was deleted. Remove to proceed.
              </Text>
            )}
          </Box>
        </Flex>
      </Table.Td>
      <Table.Td w="150px" align="center" mr="100px">
        <Box mr="30px">${cart.product?.price}</Box>
      </Table.Td>
      <Table.Td w="120px" align="center">
        <Flex align="center" justify="space-between">
          <UnstyledButton
            disabled={cart.product.saleStatus === SaleStatus.SOLD}
            pb={3}
            m={0}
            onClick={() => handleUpdateCart(cart._id, cart.quantity - 1)}
            fz="23px"
            c="gray"
          >
            -
          </UnstyledButton>
          <Box p={0} m={0}>
            {cart.quantity}
          </Box>
          <UnstyledButton
            disabled={cart.product.saleStatus === SaleStatus.SOLD}
            pb={3}
            m={0}
            onClick={() => handleUpdateCart(cart._id, cart.quantity + 1)}
            fz="23px"
            c="gray"
          >
            +
          </UnstyledButton>
        </Flex>
      </Table.Td>
      <Table.Td align="right">
        <Button
          variant="transparent"
          color="gray"
          size="xs"
          radius="xs"
          leftSection={<IconX size={16} />}
          onClick={() => removeCart({ id: cart._id })}
        >
          Remove
        </Button>
      </Table.Td>
    </Table.Tr>
  );
};

export default CartRow;
