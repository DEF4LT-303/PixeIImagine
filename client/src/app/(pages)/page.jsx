'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../api/redux/apiCalls';
import Header from '../components/Header';

const page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default page;
