'use client';

import React from 'react';
import { Card, Table, Tag, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { User } from 'lucide-react';

interface OrderType {
      key: string;
      orderId: string;
      customer: string;
      amount: number;
      status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
      date: string;
}

const data: OrderType[] = [
      {
            key: '1',
            orderId: '#ORD-001',
            customer: 'Apex Pharma',
            amount: 12500.00,
            status: 'Completed',
            date: '2023-11-25',
      },
      {
            key: '2',
            orderId: '#ORD-002',
            customer: 'MediCare Hospitals',
            amount: 8450.50,
            status: 'Processing',
            date: '2023-11-24',
      },
      {
            key: '3',
            orderId: '#ORD-003',
            customer: 'Global Health',
            amount: 3200.00,
            status: 'Pending',
            date: '2023-11-24',
      },
      {
            key: '4',
            orderId: '#ORD-004',
            customer: 'City Pharmacy',
            amount: 5600.00,
            status: 'Completed',
            date: '2023-11-23',
      },
      {
            key: '5',
            orderId: '#ORD-005',
            customer: 'Wellness Center',
            amount: 1200.00,
            status: 'Cancelled',
            date: '2023-11-22',
      },
];

const columns: ColumnsType<OrderType> = [
      {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <span className="font-medium text-emerald-600">{text}</span>,
      },
      {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            render: (text) => (
                  <div className="flex items-center gap-2">
                        <Avatar size="small" icon={<User size={12} />} className="bg-slate-100 text-slate-500" />
                        <span className="text-slate-700">{text}</span>
                  </div>
            ),
      },
      {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <span className="font-medium">${amount.toLocaleString()}</span>,
      },
      {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                  let color = 'default';
                  if (status === 'Completed') color = 'success';
                  if (status === 'Processing') color = 'processing';
                  if (status === 'Pending') color = 'warning';
                  if (status === 'Cancelled') color = 'error';

                  return <Tag color={color}>{status}</Tag>;
            },
      },
      {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            className: 'text-slate-500',
      },
];

const RecentOrders = () => {
      return (
            <Card title="Recent Orders" bordered={false} className="shadow-sm h-full" extra={<a href="#" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">View All</a>}>
                  <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="small"
                        className="no-border-table overflow-x-auto"
                  />
            </Card>
      );
};

export default RecentOrders;
