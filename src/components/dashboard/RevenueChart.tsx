'use client';

import React from 'react';
import {
      AreaChart,
      Area,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      ResponsiveContainer,
} from 'recharts';
import { Card } from 'antd';

const data = [
      { name: 'Jan', revenue: 4000, expenses: 2400 },
      { name: 'Feb', revenue: 3000, expenses: 1398 },
      { name: 'Mar', revenue: 2000, expenses: 9800 },
      { name: 'Apr', revenue: 2780, expenses: 3908 },
      { name: 'May', revenue: 1890, expenses: 4800 },
      { name: 'Jun', revenue: 2390, expenses: 3800 },
      { name: 'Jul', revenue: 3490, expenses: 4300 },
      { name: 'Aug', revenue: 4000, expenses: 2400 },
      { name: 'Sep', revenue: 3000, expenses: 1398 },
      { name: 'Oct', revenue: 2000, expenses: 9800 },
      { name: 'Nov', revenue: 2780, expenses: 3908 },
      { name: 'Dec', revenue: 1890, expenses: 4800 },
];

const RevenueChart = () => {
      return (
            <Card title="Revenue vs Expenses" bordered={false} className="shadow-sm">
                  <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                    data={data}
                                    margin={{
                                          top: 10,
                                          right: 30,
                                          left: 0,
                                          bottom: 0,
                                    }}
                              >
                                    <defs>
                                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                          </linearGradient>
                                          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                          </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                          dataKey="name"
                                          axisLine={false}
                                          tickLine={false}
                                          tick={{ fill: '#64748b', fontSize: 12 }}
                                          dy={10}
                                    />
                                    <YAxis
                                          axisLine={false}
                                          tickLine={false}
                                          tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                          type="monotone"
                                          dataKey="revenue"
                                          stroke="#059669"
                                          fillOpacity={1}
                                          fill="url(#colorRevenue)"
                                          strokeWidth={2}
                                    />
                                    <Area
                                          type="monotone"
                                          dataKey="expenses"
                                          stroke="#f97316"
                                          fillOpacity={1}
                                          fill="url(#colorExpenses)"
                                          strokeWidth={2}
                                    />
                              </AreaChart>
                        </ResponsiveContainer>
                  </div>
            </Card>
      );
};

export default RevenueChart;
