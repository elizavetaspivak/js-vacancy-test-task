import React, { FC, memo } from 'react';
import Link from 'next/link';
import { Anchor, AppShell, Group } from '@mantine/core';

import { accountApi } from 'resources/account';

import { LogoImage } from 'public/images';

import { RoutePath } from 'routes';

import HeaderMenu from './components/HeaderMenu';
import UserMenu from './components/UserMenu';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <AppShell.Header h={90} bg="#FCFCFC" style={{ border: 'none' }}>
      <Group h={72} px={48} py={16} justify="space-between" bg="#FCFCFC">
        <Anchor component={Link} href={RoutePath.Home}>
          <LogoImage />
        </Anchor>

        <HeaderMenu />

        <UserMenu />
      </Group>
    </AppShell.Header>
  );
};

export default memo(Header);
