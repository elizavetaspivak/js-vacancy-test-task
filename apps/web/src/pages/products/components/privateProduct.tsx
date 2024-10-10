import React from 'react';
import { Badge, Box, Card, Group, Image, Text, ThemeIcon, UnstyledButton } from '@mantine/core';

import { useDeleteProduct, useUpdateProduct } from 'resources/product/product.api';

import { DeleteProductIcon } from 'components/icons/deleteProductIcon';

import { SaleStatus } from 'schemas/src/product.schema';
import { Product } from 'types';

type PrivateProductProps = {
  product: Product;
};

export const PrivateProduct = ({ product }: PrivateProductProps) => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  return (
    <Card w="270px" h="300px" shadow="sm" padding="xs" radius="md" withBorder key={product._id}>
      <Card.Section style={{ position: 'relative' }}>
        <UnstyledButton
          style={{ position: 'absolute', top: 10, right: 10 }}
          onClick={() => deleteProduct({ productId: product._id })}
        >
          <ThemeIcon variant="white" radius="sm" size="md" color="gray">
            <Box w="60%">
              <DeleteProductIcon />
            </Box>
          </ThemeIcon>
        </UnstyledButton>
        <Image fit="cover" src={product.imageUrl} height={160} alt="Norway" />
        <UnstyledButton
          style={{ position: 'absolute', bottom: 10, right: 10 }}
          onClick={() =>
            updateProduct({
              id: product._id,
              saleStatus: product.saleStatus === SaleStatus.ON_SALE ? SaleStatus.SOLD : SaleStatus.ON_SALE,
            })
          }
        >
          {product.saleStatus === SaleStatus.ON_SALE ? (
            <Badge bg="#FEF4E6" c="#F79009">
              On sale
            </Badge>
          ) : (
            <Badge bg="#E8F7F0" c="#17B26A">
              Sold
            </Badge>
          )}
        </UnstyledButton>
      </Card.Section>

      <Group justify="space-between" mt="sm" mb="xs">
        <Text style={{ fontSize: '20px' }} fw={700}>
          {product.title}
        </Text>
      </Group>

      <Group justify="space-between" mt="sm">
        <Text fw={500} style={{ fontSize: '14px' }} size="sm" c="dimmed">
          Price:
        </Text>
        <Text style={{ fontSize: '20px' }} fw={700} size="sm">
          ${product.price}
        </Text>
      </Group>
      <Group justify="space-between" mb="xs">
        <Text fw={500} style={{ fontSize: '14px' }} size="sm" c="dimmed">
          Quantity:
        </Text>
        <Text style={{ fontSize: '20px' }} fw={700} size="sm">
          {product.quantity}
        </Text>
      </Group>
    </Card>
  );
};
