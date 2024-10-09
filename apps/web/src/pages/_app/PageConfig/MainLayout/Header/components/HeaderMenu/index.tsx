import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anchor, Button, Flex } from '@mantine/core';

import { RoutePath } from 'routes';

const HeaderMenu: FC = () => {
  const pa = usePathname();

  const isMarketplaceActive = pa === '/';
  const isProductsActive = pa.includes('/products');

  return (
    <Flex gap={32}>
      <Anchor component={Link} href={RoutePath.Home} c="#2B77EB">
        <Button
          variant={isMarketplaceActive ? 'light' : 'transparent'}
          color={isMarketplaceActive ? 'black' : 'gray'}
          radius="xl"
        >
          Marketplace
        </Button>
      </Anchor>
      <Anchor component={Link} href={RoutePath.Products} c="#2B77EB">
        <Button
          variant={isProductsActive ? 'light' : 'transparent'}
          color={isProductsActive ? 'black' : 'gray'}
          radius="xl"
        >
          Your Products
        </Button>
      </Anchor>
    </Flex>
  );
};

export default HeaderMenu;
