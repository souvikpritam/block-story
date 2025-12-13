import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import BlogList from '../components/BlogList';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <BlogList />
    </Layout>
  );
};

export default Index;
