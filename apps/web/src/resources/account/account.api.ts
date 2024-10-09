import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ApiError, SignInParams, SignUpParams, User } from 'types';

export const useSignIn = <T = SignInParams>() =>
  useMutation<User, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/account/sign-in', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });

export const useSignOut = () =>
  useMutation<void, ApiError>({
    mutationFn: () => apiService.post('/account/sign-out'),
    onSuccess: () => {
      queryClient.setQueryData(['account'], null);
    },
  });

export const useSignUp = <T = SignUpParams>() =>
  useMutation<User, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/account/sign-up', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });

export const useGet = (options = {}) =>
  useQuery<User>({
    queryKey: ['account'],
    queryFn: () => apiService.get('/account'),
    staleTime: 5 * 1000,
    ...options,
  });
