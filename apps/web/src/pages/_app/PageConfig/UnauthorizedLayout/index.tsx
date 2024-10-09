import React, { FC, ReactElement } from 'react';
import { Box, Center, Flex, Image, SimpleGrid, Text, Title } from '@mantine/core';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid bg="#FCFCFC" h="100vh" cols={{ base: 2 }}>
    <Center component="main" h="100%" w="100%" px={32}>
      {children}
    </Center>

    <Flex
      bg="#F4F4F4"
      m={24}
      style={{ borderRadius: '12px' }}
      my={32}
      direction="column"
      gap="56px"
      pt={40}
      px={32}
      pb={46}
    >
      <Flex direction="column" justify="space-between" style={{ flexGrow: 1 }}>
        <Image w="22%" ml={8} fit="contain" c="black" src="/images/shopy-logo.svg" alt="App Info" />

        <Image fit="contain" src="/images/shopy-cards.svg" alt="App Info" />
      </Flex>

      <Box>
        <Title style={{ fontSize: 36, fontWeight: 700 }}>Sell and buy products super quickly!</Title>

        <Text style={{ fontSize: 20 }} mt={12}>
          Save your time, we take care of all the processing.
        </Text>

        <Flex align="center" gap={12} mt={32}>
          <Image w="25%" fit="contain" src="/images/shopy-avatars.svg" alt="App Info" />
          <Text>
            <strong>+100</strong> users from all over the world
          </Text>
        </Flex>
      </Box>
    </Flex>
  </SimpleGrid>
);

export default UnauthorizedLayout;
