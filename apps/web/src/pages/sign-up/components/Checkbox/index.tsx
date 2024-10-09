import React, { memo } from 'react';
import { Center, Group, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { CheckIcon } from 'public/icons';

type CheckboxProps = {
  label: string;
  checked: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked }) => (
  <Group gap={12}>
    <Center w={20} h={20}>
      {!checked ? <IconX /> : <CheckIcon />}
    </Center>
    <Text size="md" c="black-300">
      {label}
    </Text>
  </Group>
);

export default memo(Checkbox);
