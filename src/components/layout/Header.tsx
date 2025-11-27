'use client';

import React from 'react';
import { Layout, Input, Button, Avatar, Dropdown } from 'antd';
import { Search, Bell, User, Settings, LogOut, Menu } from 'lucide-react';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

interface HeaderProps {
      onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
      const userMenuItems: MenuProps['items'] = [
            {
                  key: 'profile',
                  icon: <User size={16} />,
                  label: 'Profile',
            },
            {
                  key: 'settings',
                  icon: <Settings size={16} />,
                  label: 'Settings',
            },
            {
                  type: 'divider',
            },
            {
                  key: 'logout',
                  icon: <LogOut size={16} />,
                  label: 'Logout',
                  danger: true,
            },
      ];

      return (
            <AntHeader style={{ padding: '.6rem 2rem' }} className="bg-white border-b border-slate-200 flex items-center justify-between shadow-sm sticky top-0 z-40">
                  <div className="flex items-center gap-4 flex-1">
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden block">
                              <Button
                                    type="text"
                                    icon={<Menu size={20} />}
                                    onClick={onMenuClick}
                                    className=""
                              />
                        </div>

                        {/* Search Bar */}
                        <Input
                              placeholder="Search..."
                              prefix={<Search size={16} className="text-slate-400" />}
                              className="max-w-md hidden sm:block"
                              size="middle"
                        />
                  </div>

                  <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <Button
                              type="text"
                              icon={<Bell size={20} />}
                              className="relative"
                        />

                        {/* User Profile */}
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                                    <Avatar
                                          size={32}
                                          className="bg-cyan-100 text-cyan-600 border border-cyan-200"
                                    >
                                          <User size={16} />
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                          <div className="text-sm font-medium text-slate-700">John Doe</div>
                                          <div className="text-xs text-slate-500">Administrator</div>
                                    </div>
                              </div>
                        </Dropdown>
                  </div>
            </AntHeader>
      );
};

export default Header;
