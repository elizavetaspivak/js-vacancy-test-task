import React, { FC, ReactElement } from 'react';
import { AppShell, Stack } from '@mantine/core';

import { accountApi } from 'resources/account';

import Header from './Header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <AppShell component={Stack} header={{ height: 90 }} bg="black-50">
      <Header />

      <AppShell.Main ml={50} mr={50}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
