'use client';

import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
      return (
            <Layout style={{ minHeight: '100vh' }}>
                  <Sidebar />
                  <Layout>
                        <Header />
                        <Content
                              style={{
                                    margin: '24px 24px',
                                    minHeight: 280,
                              }}
                        >
                              {children}
                        </Content>
                  </Layout>
            </Layout>
      );
};

export default MainLayout;
