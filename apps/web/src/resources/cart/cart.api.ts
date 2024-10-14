import { useMutation, useQuery } from '@tanstack/react-query';

import { sendNotification } from 'components/notifications/notification';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ProductStatus, SaleStatus } from 'schemas';

interface CreateCartResponce {
  productId: string;
}

export type CardResponce = {
  _id: string;
  quantity: number;
  product: {
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    saleStatus: SaleStatus;
    productStatus: ProductStatus;
  };
  paymentDate: string | null;
};

type CheckoutResponse = {
  id: string;
};

export const useCreateCart = <T>() =>
  useMutation<CreateCartResponce, unknown, T>({
    mutationFn: (data: T) => apiService.post('/cart/create', data),
    onSuccess: () => {
      sendNotification('Success', 'Your product was added to cart', 'teal');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

export const useGetCart = () =>
  useQuery<CardResponce[]>({
    queryKey: ['cart'],
    queryFn: () => apiService.get('/cart/list'),
    refetchInterval: 10000,
  });

export const useGetHistory = () =>
  useQuery<CardResponce[]>({
    queryKey: ['history'],
    queryFn: () => apiService.get('/cart/history'),
  });

export const useGetCartCounts = () =>
  useQuery<number>({
    queryKey: ['cartCount'],
    queryFn: () => apiService.get('/cart/counts'),
  });

export const useCheckoutCart = () =>
  useMutation<CheckoutResponse, unknown>({
    mutationFn: () => apiService.post(`/cart/create-checkout-session`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

export const useUpdateCart = <T extends { id: string; quantity: number }>() =>
  useMutation<CardResponce, unknown, T>({
    mutationFn: (data: T) => apiService.put(`/cart/${data.id}`, { quantity: data.quantity }),
    onSuccess: (item) => {
      queryClient.setQueryData(['cart'], (prev: CardResponce[]) =>
        prev.map((cart) => (cart._id === item._id ? item : cart)),
      );
      sendNotification('Success', 'Your product was updated successfully', 'teal');
    },
  });

export const useRemoveCart = <T extends { id: string }>() =>
  useMutation<CardResponce, unknown, T>({
    mutationFn: (data: T) => apiService.delete(`/cart/${data.id}`),
    onSuccess: (item) => {
      queryClient.setQueryData(['cart'], (prev: CardResponce[]) => prev.filter((cart) => cart._id !== item._id));
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      sendNotification('Success', 'Your product was deleted successfully', 'teal');
    },
  });
