import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anchor, Box, Flex, UnstyledButton } from '@mantine/core';

import { accountApi } from 'resources/account';

import { BusketIcon } from 'components/icons/busketIcon';
import { LogoutIcon } from 'components/icons/logoutIcon';

import { RoutePath } from 'routes';

const UserMenu: FC = () => {
  const pa = usePathname();
  const { mutate: signOut } = accountApi.useSignOut();

  const isBasketActive = pa === '/basket';

  return (
    <Flex align="center" justify="space-between" gap={32}>
      <Box w={40} h={40} style={{ position: 'relative' }}>
        <Anchor w="100%" h="100%" display="inline-block" component={Link} href={RoutePath.Basket} c="#2B77EB">
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
