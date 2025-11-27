'use client';

import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
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

const Sidebar = () => {
      const [collapsed, setCollapsed] = useState(false);
      const pathname = usePathname();
      const {
            token: { colorBgContainer, colorBorderSecondary },
      } = theme.useToken();

      const menuItems = [
            {
                  key: '/',
                  icon: <LayoutDashboard size={20} />,
                  label: <Link href="/">Dashboard</Link>,
            },
            {
                  key: '/procurement',
                  icon: <ShoppingCart size={20} />,
                  label: 'Procurement',
                  children: [
                        {
                              key: '/procurement/suppliers-import',
                              label: <Link href="/procurement/suppliers-import">Suppliers (Import)</Link>,
                        },
                        {
                              key: '/procurement/suppliers-local',
                              label: <Link href="/procurement/suppliers-local">Suppliers (Local)</Link>,
                        },
                        {
                              key: '/procurement/orders',
                              label: <Link href="/procurement/orders">Purchase Orders</Link>,
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
                              label: <Link href="/production/batches">Batch Management</Link>,
                        },
                  ],
            },
            {
                  key: '/inventory',
                  icon: <Package size={20} />,
                  label: <Link href="/inventory">Inventory</Link>,
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

      // Determine selected keys based on current path
      const getSelectedKeys = () => {
            if (pathname === '/') return ['/'];
            return [pathname];
      };

      const getOpenKeys = () => {
            if (pathname.startsWith('/procurement')) return ['/procurement'];
            if (pathname.startsWith('/production')) return ['/production'];
            return [];
      };

      return (
            <Sider
                  collapsible
                  collapsed={collapsed}
                  onCollapse={(value) => setCollapsed(value)}
                  width={260}
                  className="border-r border-slate-200 h-screen sticky top-0 left-0 z-50 shadow-sm"
                  theme="light"
                  style={{
                        background: colorBgContainer,
                        borderColor: colorBorderSecondary,
                  }}
            >
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
                                    src="/logo.png"
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
                        className="border-none font-medium"
                        style={{ background: 'transparent' }}
                  />
            </Sider>
      );
};

export default Sidebar;
