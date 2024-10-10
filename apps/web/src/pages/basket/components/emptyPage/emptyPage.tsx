import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Anchor, Box } from '@mantine/core';

import { BasicButton } from 'components/basic-button/basicButton';

import { ShopyBaloon } from 'public/images';

import { RoutePath } from 'routes';

import classes from './emptyPage.module.css';

const EmptyPage: NextPage = () => (
  <>
    <Head>
      <title>Cart</title>
    </Head>

    <Box className={classes.container}>
      <Box className={classes.contentBox}>
        <ShopyBaloon style={{ width: '45%' }} />
        <Box fz="20px" fw="bold">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Oops, there's nothing here yet!
        </Box>
        <Box fz="14px" mt="20px">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          You haven't made any purchases yet.
        </Box>
        <Box fz="14px" mb="20px">
          Go to the marketplace and make purchases.
        </Box>
        <Anchor component={Link} href={RoutePath.Home} c="#2B77EB">
          <BasicButton backGroundColor="#2B77EB" variant="filled" text="Go To Marketplace" />
        </Anchor>
      </Box>
    </Box>
  </>
);

export default EmptyPage;
