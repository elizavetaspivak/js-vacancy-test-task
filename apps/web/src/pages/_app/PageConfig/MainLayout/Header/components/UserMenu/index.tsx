import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anchor, Badge, Box, Flex, UnstyledButton } from '@mantine/core';

import { accountApi } from 'resources/account';
import { cartApi } from 'resources/cart';

import { BusketIcon } from 'components/icons/busketIcon';
import { LogoutIcon } from 'components/icons/logoutIcon';

import { RoutePath } from 'routes';

const UserMenu: FC = () => {
  const pa = usePathname();
  const { mutate: signOut } = accountApi.useSignOut();

  const { data: cartCount } = cartApi.useGetCartCounts();

  const isBasketActive = pa === '/basket';

  return (
    <Flex align="center" justify="space-between" gap={32}>
      <Box w={40} h={40} style={{ position: 'relative' }}>
        <Anchor w="100%" h="100%" display="inline-block" component={Link} href={RoutePath.Basket} c="#2B77EB">
          {cartCount !== undefined && +cartCount > 0 && (
            <Badge size="sm" bg="#2B77EB" circle style={{ position: 'absolute', right: 0 }}>
              {cartCount}
            </Badge>
          )}
          <BusketIcon isBasketActive={isBasketActive} />
        </Anchor>
      </Box>

      <Box w={40} h={40}>
        <UnstyledButton w="100%" h="100%" onClick={() => signOut()}>
          <LogoutIcon />
        </UnstyledButton>
      </Box>
    </Flex>
  );
};

export default UserMenu;
