'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

interface MainLayoutProps {
      children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      return (
            <div className="lg:flex min-h-screen">
                  <Sidebar  mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
                  <div className="lg:flex-1 flex flex-col min-w-0">
                        <Header onMenuClick={() => setMobileMenuOpen(true)} />
                        <Content className="p-4 lg:p-6 bg-slate-50 flex-1">
                              {children}
                        </Content>
                  </div>
            </div>
      );
};

export default MainLayout;
