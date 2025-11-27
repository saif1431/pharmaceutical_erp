'use client';

import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface KPICardProps {
      title: string;
      value: string | number;
      prefix?: React.ReactNode;
      suffix?: React.ReactNode;
      trend?: 'up' | 'down' | 'neutral';
      trendValue?: string;
      icon?: React.ReactNode;
      color?: string; // Tailwind color class for icon background
}

const KPICard: React.FC<KPICardProps> = ({
      title,
      value,
      prefix,
      suffix,
      trend,
      trendValue,
      icon,
      color = 'bg-emerald-100 text-emerald-600',
}) => {
      return (
            <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex justify-between items-start mb-4">
                        <div className="text-slate-500 font-medium text-sm">{title}</div>
                        {icon && (
                              <div className={`p-2 rounded-lg ${color} flex items-center justify-center`}>
                                    {icon}
                              </div>
                        )}
                  </div>

                  <div className="flex items-end gap-2 mb-2">
                        <div className="text-2xl font-bold text-slate-800">
                              {prefix}{value}{suffix}
                        </div>
                  </div>

                  {trend && (
                        <div className="flex items-center gap-1 text-sm">
                              {trend === 'up' && <ArrowUp size={14} className="text-emerald-500" />}
                              {trend === 'down' && <ArrowDown size={14} className="text-red-500" />}
                              {trend === 'neutral' && <Minus size={14} className="text-slate-400" />}

                              <span
                                    className={`font-medium ${trend === 'up'
                                                ? 'text-emerald-500'
                                                : trend === 'down'
                                                      ? 'text-red-500'
                                                      : 'text-slate-500'
                                          }`}
                              >
                                    {trendValue}
                              </span>
                              <span className="text-slate-400 ml-1">vs last month</span>
                        </div>
                  )}
            </Card>
      );
};

export default KPICard;
