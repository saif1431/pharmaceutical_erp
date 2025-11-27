'use client';

import React from 'react';
import { Layout, Avatar, Badge, Dropdown, Input, theme, Button } from 'antd';
import { Bell, Search, User, LogOut, Settings, Menu as MenuIcon } from 'lucide-react';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => {
      const {
            token: { colorBgContainer, colorBorderSecondary },
      } = theme.useToken();

      const userMenu: MenuProps['items'] = [
            {
                  key: 'profile',
                  label: 'My Profile',
                  icon: <User size={16} />,
            },
            {
                  key: 'settings',
                  label: 'Settings',
                  icon: <Settings size={16} />,
            },
            {
                  type: 'divider',
            },
            {
                  key: 'logout',
                  label: 'Logout',
                  icon: <LogOut size={16} />,
                  danger: true,
            },
      ];

      return (
            <AntHeader
                  style={{
                        padding: '0 24px',
                        background: colorBgContainer,
                        position: 'sticky',
                        top: 0,
                        zIndex: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${colorBorderSecondary}`,
                        height: 64,
                  }}
                  className="shadow-sm"
            >
                  <div className="flex items-center gap-4 flex-1">
                        {/* Mobile menu trigger could go here */}
                        <div className="hidden md:block w-full max-w-md">
                              <Input
                                    placeholder="Search for orders, items, or suppliers..."
                                    prefix={<Search size={16} className="text-slate-400" />}
                                    className="rounded-full bg-slate-50 border-slate-200 hover:bg-white focus:bg-white transition-all"
                                    variant="filled"
                              />
                        </div>
                  </div>

                  <div className="flex items-center gap-6">
                        <Button
                              type="text"
                              shape="circle"
                              icon={<Bell size={20} className="text-slate-600" />}
                              className="flex items-center justify-center"
                        />

                        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                        <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
                              <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                    <div className="text-right hidden sm:block">
                                          <div className="text-sm font-semibold text-slate-700">Dr. Alex Smith</div>
                                          <div className="text-xs text-slate-500">Production Manager</div>
                                    </div>
                                    <Avatar
                                          size="large"
                                          className="bg-emerald-100 text-emerald-600 border border-emerald-200"
                                          icon={<User size={20} />}
                                    />
                              </div>
                        </Dropdown>
                  </div>
            </AntHeader>
      );
};

export default Header;
