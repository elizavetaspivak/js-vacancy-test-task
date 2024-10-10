import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Alert, Box, Button, Group, Image, Stack, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlertCircle } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { productApi } from 'resources/product';

import { CreateProductIcon } from 'components/icons/createProductIcon';

import { createSchema } from 'schemas';

import classes from '../index.module.css';

const schema = z.object({
  file: z.any(),
  title: z.string().min(1, 'Title is required'),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

type CreateNewProductParams = z.infer<typeof schema>;

const CreateProduct: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    resetField,
  } = useForm<CreateNewProductParams>({
    resolver: zodResolver(createSchema.extend({ file: z.instanceof(File, { message: 'Cannot be empty' }) })),
  });

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createNewProduct, isPending: isCreateNewProductPending } = productApi.useCreateProduct();

  const onUpload = () => {
    hiddenInputRef.current?.click();
  };

  const onSubmit = (data: CreateNewProductParams) => {
    if (!file) {
      setError('file', { message: 'No file uploaded' });
      return;
    }

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('file', file, file.name);

    createNewProduct(formData, {
      onSuccess: () => {
        setFile(null);
        resetField('price');
        resetField('title');
        resetField('quantity');
      },
    });
  };

  return (
    <>
      <Head>
        <title>Create Products</title>
      </Head>

      <Stack gap="lg" w="55%">
        <Title order={2}>Create new product</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={20} maw={694}>
            <Group gap={36}>
              <Box w={180} h={180} className={classes.image}>
                {file ? (
                  <Image src={URL.createObjectURL(file)} alt="Product" width={180} height={180} />
                ) : (
                  <CreateProductIcon />
                )}
              </Box>
              <Button
                style={{
                  borderColor: '#CFCFCF',
                  color: '#767676',
                }}
                variant="outline"
                onClick={onUpload}
              >
                Upload Photo
              </Button>
              <Controller
                name="file"
                rules={{ required: true }}
                control={control}
                render={({ field: { name, onBlur, onChange, ref } }) => (
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name={name}
                    onBlur={onBlur}
                    hidden
                    className={classes.hidden}
                    onChange={(event) => {
                      const uploadFile = event.target.files?.[0];
                      if (!uploadFile) return;

                      onChange(uploadFile);
                      setFile(uploadFile);
                    }}
                    ref={(e) => {
                      ref(e);
                      hiddenInputRef.current = e;
                    }}
                  />
                )}
              />
            </Group>
            {errors.file && (
              <Alert icon={<IconAlertCircle />} color="red">
                {errors.file.message?.toString()}
              </Alert>
            )}
            <TextInput
              {...register('title')}
              label="Title of the product"
              pt="5px"
              withErrorStyles={false}
              placeholder="Enter title of the product"
              error={errors.title?.message}
              radius="md"
              w="100%"
            />

            <TextInput
              {...register('price', { valueAsNumber: true })}
              label="Price"
              pt="5px"
              type="number"
              withErrorStyles={false}
              placeholder="Enter price of the product"
              error={errors.price?.message}
              onKeyDown={(event) => {
                if (['e', 'E', '+', '-'].includes(event.key)) {
                  event.preventDefault();
                }
              }}
              radius="md"
              w="100%"
            />
            <TextInput
              {...register('quantity', { valueAsNumber: true })}
              label="Quantity"
              pt="5px"
              type="number"
              withErrorStyles={false}
              placeholder="Enter quantity of the product"
              error={errors.quantity?.message}
              onKeyDown={(event) => {
                if (['e', 'E', '+', '-'].includes(event.key)) {
                  event.preventDefault();
                }
              }}
              radius="md"
              w="100%"
            />
            <Button
              style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto' }}
              type="submit"
              mt="28px"
              w="21%"
              bg="#2B77EB"
              loading={isCreateNewProductPending}
              variant="filled"
            >
              Upload Product
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};
export default CreateProduct;
