import { File } from '@koa/multer';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import { AppKoaContext } from 'types';

const firebaseConfig = {
  apiKey: 'AIzaSyBQe3pqytKKxfUF9QhUtISfsgWwBR2Rrb8',
  authDomain: 'shopy-images.firebaseapp.com',
  projectId: 'shopy-images',
  storageBucket: 'shopy-images.appspot.com',
  messagingSenderId: '19847816950',
  appId: '1:19847816950:web:97591f546e7e23c88e6ed7',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const uploadPhoto = async (photo: File, ctx: AppKoaContext): Promise<string | null> => {
  const storage = getStorage(firebaseApp, 'shopy-images.appspot.com');

  const metadata = {
    contentType: photo.mimetype,
  };

  const storageRef = ref(storage, `images/${photo.originalname}`);
  const uploadTask = uploadBytesResumable(storageRef, photo.buffer, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        reject(error.message);

        ctx.assertClientError(true, {
          email: error.message,
        });
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        resolve(url);
      },
    );
  });
};
