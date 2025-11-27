'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00bcd4',
            colorInfo: '#00bcd4',
            colorSuccess: '#10b981',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            fontFamily: 'var(--font-inter)',
            borderRadius: 6,
            wireframe: false,
          },
          components: {
            Button: {
              algorithm: true,
            },
            Layout: {
              bodyBg: '#f8fafc',
              headerBg: '#ffffff',
              siderBg: '#ffffff',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
