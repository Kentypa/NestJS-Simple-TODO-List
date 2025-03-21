import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className='flex justify-around items-center w-full p-4 bg-gray-300'>
      <h3>Simple Todo List</h3>
      <h3>User profile</h3>
    </header>
  );
};
