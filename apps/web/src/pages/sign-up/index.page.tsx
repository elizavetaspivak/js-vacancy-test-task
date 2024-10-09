import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Anchor, Button, Group, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { accountApi } from 'resources/account';

import { handleApiError } from 'utils';

import { RoutePath } from 'routes';

import { signUpSchema } from 'schemas';

import Checkbox from './components/Checkbox';

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

type SignUpParams = z.infer<typeof signUpSchema>;

const SignUp: NextPage = () => {
  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({ resolver: zodResolver(signUpSchema) });

  const passwordValue = watch('password', '').trim();

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8 && passwordValue.length <= 50;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    updatedPasswordRulesData[2].done = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isPending: isSignUpPending } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) =>
    signUp(data, {
      onError: (e) => handleApiError(e, setError),
    });

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack w={400} gap={32}>
        <Stack gap={32}>
          <Title style={{ fontSize: '26px' }}>Sign Up</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter email Address"
                error={errors.email?.message}
                radius="md"
                w="408px"
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
                radius="md"
                w="408px"
              />

              <Stack gap={8}>
                {passwordRulesData.map((ruleData) => (
                  <Checkbox key={ruleData.title} label={ruleData.title} checked={ruleData.done} />
                ))}
              </Stack>
            </Stack>

            <Button type="submit" loading={isSignUpPending} radius="md" fullWidth mt={32} bg="#2B77EB">
              Create Account
            </Button>
          </form>
        </Stack>

        <Stack gap={32}>
          <Group justify="center" gap={12}>
            Have an account?
            <Anchor component={Link} href={RoutePath.SignIn} c="#2B77EB">
              Sign In
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
