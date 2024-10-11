import router from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';

import { sendNotification } from 'components/notifications/notification';

import { apiService } from 'services';

import queryClient from 'query-client';

import { SaleStatus } from 'schemas/src/product.schema';
import { ApiError, ListResult, Product } from 'types';

export type ProductResponce = {
  _id: string;
  title: string;
  price: number;
  userId: string;
  imageUrl: string;
  fileReference: string;
  createdOn?: Date | undefined;
  updatedOn?: Date | undefined;
  deletedOn?: Date | null | undefined;
};

export const useCreateProduct = <T = FormData>() =>
  useMutation<Product, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/product/upload', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['myproducts'], (prev: { results: Product[] }) => ({
        ...prev,
        results: [data, ...(prev.results || [])],
      }));
      queryClient.invalidateQueries({ queryKey: ['products'] });
      sendNotification('Success', 'Your product was created successfully', 'teal');
      router.back();
    },
  });
export const useDeleteProduct = <T extends { productId: string }>() =>
  useMutation<void, ApiError, T>({
    mutationFn: (data: T) => apiService.delete('/product/delete', data),
    onSuccess: (_, params: T) => {
      queryClient.setQueryData(['myproducts'], (prev: { results: Product[] }) => ({
        ...prev,
        results: prev.results?.filter((product) => product._id !== params.productId),
      }));
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['cartCount'],
      });
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      sendNotification('Success', 'Your product was deleted successfully', 'teal');
    },
  });

export const useUpdateProduct = <T extends { id: string; saleStatus: SaleStatus }>() =>
  useMutation<ProductResponce, ApiError, T>({
    mutationFn: (data: T) => apiService.put(`/product/${data.id}`, data),
    onSuccess: (item) => {
      queryClient.setQueryData(['myproducts'], (prev: { results: Product[] }) => ({
        ...prev,
        results: prev.results.map((product) => (product._id === item._id ? item : product)),
      }));
      sendNotification('Success', 'Your product was updated successfully', 'teal');
    },
  });

export const useGetMyProducts = (options = {}) =>
  useQuery<{ results: Product[] }>({
    queryKey: ['myproducts'],
    queryFn: () => apiService.get('/product/private'),
    staleTime: 45000,
    ...options,
  });

export const useGetProducts = <T>(options: T) =>
  useQuery<{ products: ListResult<ProductResponce>; cartProductIds: string[] }>({
    queryKey: ['products', options],
    queryFn: () => apiService.get('/product/pagination', options),
    refetchInterval: 10000,
  });
