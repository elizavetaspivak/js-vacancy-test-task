import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import React from 'react';

export const sendNotification = (title: string, message: string, color: 'teal' | 'red') => {
  notifications.show({
    color: color,
    title: title,
    icon:
      color === 'red' ? (
        <IconX style={{ width: rem(18), height: rem(18) }} />
      ) : (
        <IconCheck style={{ width: rem(18), height: rem(18) }} />
      ),
    message: message,
  });
};
