import React from 'react';
import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export const sendNotification = (title: string, message: string, color: 'teal' | 'red') => {
  notifications.show({
    color,
    title,
    icon:
      color === 'red' ? (
        <IconX style={{ width: rem(18), height: rem(18) }} />
      ) : (
        <IconCheck style={{ width: rem(18), height: rem(18) }} />
      ),
    message,
  });
};
