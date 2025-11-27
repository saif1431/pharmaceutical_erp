'use client';

import React, { useState } from 'react';
import { Layout, Menu, theme, Drawer } from 'antd';
import {
      LayoutDashboard,
      ShoppingCart,
      Package,
      Users,
      FileText,
      Settings,
      Truck,
      Factory,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const { Sider } = Layout;

interface SidebarProps {
      mobileOpen: boolean;
      setMobileOpen: (open: boolean) => void;
}

const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
      const [collapsed, setCollapsed] = useState(false);
      const pathname = usePathname();
      const {
            token: { colorBgContainer, colorBorderSecondary },
      } = theme.useToken();

      const menuItems = [
            {
                  key: '/',
                  icon: <LayoutDashboard size={20} />,
                  label: <Link href="/" onClick={() => setMobileOpen(false)}>Dashboard</Link>,
            },
            {
                  key: '/procurement',
                  icon: <ShoppingCart size={20} />,
                  label: 'Procurement',
                  children: [
                        {
                              key: '/procurement/suppliers-import',
                              label: <Link href="/procurement/suppliers-import" onClick={() => setMobileOpen(false)}>Suppliers (Import)</Link>,
                        },
                        {
                              key: '/procurement/suppliers-local',
                              label: <Link href="/procurement/suppliers-local" onClick={() => setMobileOpen(false)}>Suppliers (Local)</Link>,
                        },
                        {
                              key: '/procurement/orders',
                              label: <Link href="/procurement/orders" onClick={() => setMobileOpen(false)}>Purchase Orders</Link>,
                        },
                  ],
            },
            {
                  key: '/production',
                  icon: <Factory size={20} />,
                  label: 'Production',
                  children: [
                        {
                              key: '/production/batches',
                              label: <Link href="/production/batches" onClick={() => setMobileOpen(false)}>Batch Management</Link>,
                        },
                  ],
            },
            {
                  key: '/inventory',
                  icon: <Package size={20} />,
                  label: <Link href="/inventory" onClick={() => setMobileOpen(false)}>Inventory</Link>,
            },
            {
                  key: '/sales',
                  icon: <Truck size={20} />,
                  label: 'Sales & Distribution',
            },
            {
                  key: '/hr',
                  icon: <Users size={20} />,
                  label: 'HR & Payroll',
            },
            {
                  key: '/reports',
                  icon: <FileText size={20} />,
                  label: 'Reports',
            },
            {
                  key: '/settings',
                  icon: <Settings size={20} />,
                  label: 'Settings',
            },
      ];

      const getSelectedKeys = () => {
            if (pathname === '/') return ['/'];
            return [pathname];
      };

      const getOpenKeys = () => {
            if (pathname.startsWith('/procurement')) return ['/procurement'];
            if (pathname.startsWith('/production')) return ['/production'];
            return [];
      };

      const sidebarContent = (
            <>
                  <div className="flex items-center justify-center h-30 border-b border-slate-100 mb-4 px-4">
                        {!collapsed ? (
                              <Image
                                    src="/favicon.png"
                                    alt="PharmCeutical Logo"
                                    width={80}
                                    height={60}
                                    className="object-contain transition-all duration-300"
                                    priority
                              />
                        ) : (
                              <Image
                                    src="/favicon.png"
                                    alt="VD"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                    priority
                              />
                        )}
                  </div>

                  <Menu
                        mode="inline"
                        defaultSelectedKeys={getSelectedKeys()}
                        defaultOpenKeys={getOpenKeys()}
                        selectedKeys={getSelectedKeys()}
                        items={menuItems}
                        className="border-none  font-medium"
                        style={{ background: 'transparent' }}
                  />
            </>
      );

      return (
            <>
                  {/* Desktop Sidebar */}
                  <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        width={260}
                        className="hidden lg:block border-r border-slate-200 h-screen sticky top-0 left-0 shadow-sm  "
                        theme="light"
                        style={{
                              background: colorBgContainer,
                              borderColor: colorBorderSecondary,
                        }}
                  >
                        {sidebarContent}
                  </Sider>

                  {/* Mobile Drawer */}
                  <Drawer
                        placement="left"
                        onClose={() => setMobileOpen(false)}
                        open={mobileOpen}
                        className="lg:hidden"
                        size="default"
                        styles={{
                              body: { padding: '1rem', background: colorBgContainer },
                        }}
                  >
                        {sidebarContent}
                  </Drawer>
            </>
      );
};

export default Sidebar;
