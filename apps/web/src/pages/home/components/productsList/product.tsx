import React from 'react';
import { Card, Group, Image, Text } from '@mantine/core';

import { ProductResponce } from 'resources/product/product.api';

import { BasicButton } from 'components/basic-button/basicButton';

type ProductProps = {
  product: ProductResponce;
};

export const Product = ({ product }: ProductProps) => (
  <Card padding="md" bg="white" radius="12px" withBorder bd="1px solid black-100" w={318} key={product._id}>
    <Card.Section style={{ position: 'relative' }}>
      <Image fit="cover" src={product.imageUrl} height={160} alt="Norway" />
    </Card.Section>

    <Group justify="space-between" mt="xs" mb="xs">
      <Text style={{ fontSize: '20px' }} fw={700}>
        {product.title}
      </Text>
    </Group>

    <Group justify="space-between" mt="xs" mb="xs">
      <Text fw={500} style={{ fontSize: '14px' }} size="sm" c="dimmed">
        Price:
      </Text>
      <Text style={{ fontSize: '20px' }} fw={700} size="sm">
        ${product.price}
      </Text>
    </Group>

    <BasicButton fullWidth variant="filled" text=" Add to Cart" backGroundColor="blue" marginTop="md" radius="md" />
  </Card>
);
