import React from 'react';
import Link from 'next/link';
import { Anchor, Box, Card } from '@mantine/core';

import { NewProductIcon } from 'components/icons/newProductIcon';

import { RoutePath } from 'routes';

export const CreateNewProduct = () => (
  <Anchor style={{ textDecoration: 'none' }} component={Link} href={RoutePath.CreateProduct} c="#2B77EB">
    <Card
      style={{
        height: '10em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      w="270px"
      h="300px"
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
    >
      <Box>
        <NewProductIcon />
      </Box>
      <Box c="#2B77EB" style={{ textDecoration: 'none' }}>
        New Product
      </Box>
    </Card>
  </Anchor>
);
