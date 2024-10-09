import React from 'react';
import { NextPage } from 'next';
import { Button, ButtonProps } from '@mantine/core';

type BasicButtonProps = ButtonProps & {
  width?: number | string;
  marginTop?: number | string;
  backGroundColor?: string;
  variant: string;
  text: string;
  isLoading?: boolean;
  onClick?: (() => Promise<void>) | (() => void);
};

export const BasicButton: NextPage<BasicButtonProps> = ({
  backGroundColor,
  marginTop,
  variant,
  width,
  text,
  isLoading,
  onClick,
}) => (
  <Button
    onClick={onClick}
    type="submit"
    mt={marginTop}
    radius="md"
    w={width}
    bg={backGroundColor}
    loading={isLoading}
    variant={variant}
  >
    {text}
  </Button>
);
