import React from 'react';
import { NextPage } from 'next';

type BusketIconProps = {
  isBasketActive: boolean;
};

export const BusketIcon: NextPage<BusketIconProps> = ({ isBasketActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
    <path
      fill={isBasketActive ? '#2B77EB' : '#767676'}
      fillRule="evenodd"
      d="M.018 4.757a.94.94 0 0 1 1.108-.739l1.778.356a4.33 4.33 0 0 1 3.46 3.816l.175 1.743h23.31c3.148 0 5.458 2.959 4.694 6.013l-1.903 7.612a6.874 6.874 0 0 1-6.668 5.207H10.729a4.33 4.33 0 0 1-4.3-3.815L4.75 10.967l-.26-2.59A2.45 2.45 0 0 0 2.536 6.22L.757 5.864a.94.94 0 0 1-.739-1.107Zm6.73 7.058 1.549 12.91a2.45 2.45 0 0 0 2.432 2.158h15.243a4.992 4.992 0 0 0 4.843-3.781l1.903-7.612a2.958 2.958 0 0 0-2.87-3.675h-23.1Z"
      clipRule="evenodd"
    />
    <path
      fill={isBasketActive ? '#2B77EB' : '#767676'}
      fillRule="evenodd"
      d="M9.978 20.457c0-.526.413-.953.924-.953h5.914c.51 0 .924.427.924.953 0 .525-.414.952-.924.952h-5.914c-.51 0-.924-.427-.924-.952Z"
      clipRule="evenodd"
    />
    <circle cx={11.959} cy={33.757} r={2.543} fill={isBasketActive ? '#2B77EB' : '#767676'} />
    <circle cx={27.214} cy={33.757} r={2.543} fill={isBasketActive ? '#2B77EB' : '#767676'} />
  </svg>
);
