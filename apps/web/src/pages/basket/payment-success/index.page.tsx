import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Anchor, Box } from '@mantine/core';

import { BasicButton } from 'components/basic-button/basicButton';

import { ShopyPaymentSuccess } from 'public/images';

import { RoutePath } from 'routes';

import classes from './paymentSuccess.module.css';

const PaymentSuccess: NextPage = () => (
  <>
    <Head>
      <title>Cart</title>
    </Head>

    <Box className={classes.container}>
      <Box m="0 auto" h="269px" bg="white" className={classes.contentBox}>
        <ShopyPaymentSuccess style={{ width: '56px', paddingTop: '20px' }} />
        <Box pt="20px" fz="24px" fw={600}>
          Payment Successfull
        </Box>
        <Box pt="15px" pb="15px" fz="16px" c="#767676">
          Hooray, you have completed your payment!
        </Box>
        <Anchor component={Link} href={RoutePath.Basket} c="#2B77EB">
          <BasicButton backGroundColor="#2B77EB" variant="filled" text="Back To Cart" />
        </Anchor>
      </Box>
    </Box>
  </>
);

export default PaymentSuccess;
