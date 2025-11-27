'use client';

import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, DatePicker, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '@/components/ui/DataTable';
import DrawerForm from '@/components/ui/DrawerForm';
import { FileText } from 'lucide-react';
import dayjs from 'dayjs';

interface PurchaseOrder {
      key: string;
      id: string;
      supplier: string;
      material: string;
      quantity: number;
      unitPrice: number;
      totalAmount: number;
      orderDate: string;
      deliveryDate: string;
      status: 'Draft' | 'Pending' | 'Approved' | 'Received' | 'Cancelled';
      priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}

const mockData: PurchaseOrder[] = [
      {
            key: '1',
            id: 'PO-2024-001',
            supplier: 'Global Pharma Supplies Ltd.',
            material: 'Active Pharmaceutical Ingredient - Paracetamol',
            quantity: 5000,
            unitPrice: 12.50,
            totalAmount: 62500,
            orderDate: '2024-11-20',
            deliveryDate: '2024-12-15',
            status: 'Approved',
            priority: 'High',
      },
      {
            key: '2',
            id: 'PO-2024-002',
            supplier: 'Local Pharma Distributors',
            material: 'Packaging Material - Blister Packs',
            quantity: 10000,
            unitPrice: 0.25,
            totalAmount: 2500,
            orderDate: '2024-11-22',
            deliveryDate: '2024-12-05',
            status: 'Pending',
            priority: 'Medium',
      },
      {
            key: '3',
            id: 'PO-2024-003',
            supplier: 'MediSource International',
            material: 'Raw Material - Lactose Monohydrate',
            quantity: 2000,
            unitPrice: 8.75,
            totalAmount: 17500,
            orderDate: '2024-11-18',
            deliveryDate: '2024-12-01',
            status: 'Received',
            priority: 'Low',
      },
      {
            key: '4',
            id: 'PO-2024-004',
            supplier: 'City Medical Supplies',
            material: 'Laboratory Equipment - pH Meter',
            quantity: 5,
            unitPrice: 450.00,
            totalAmount: 2250,
            orderDate: '2024-11-25',
            deliveryDate: '2024-12-20',
            status: 'Draft',
            priority: 'Medium',
      },
      {
            key: '5',
            id: 'PO-2024-005',
            supplier: 'Asian Chemicals Corp',
            material: 'Chemical Reagent - Sodium Hydroxide',
            quantity: 500,
            unitPrice: 15.00,
            totalAmount: 7500,
            orderDate: '2024-11-15',
            deliveryDate: '2024-11-30',
            status: 'Approved',
            priority: 'Urgent',
      },
];

export default function PurchaseOrdersPage() {
      const [data, setData] = useState<PurchaseOrder[]>(mockData);
      const [drawerOpen, setDrawerOpen] = useState(false);
      const [editingRecord, setEditingRecord] = useState<PurchaseOrder | null>(null);
      const [form] = Form.useForm();

      const columns: ColumnsType<PurchaseOrder> = [
            {
                  title: 'PO Number',
                  dataIndex: 'id',
                  key: 'id',
                  render: (text) => (
                        <div className="flex items-center gap-2">
                              <FileText size={16} className="text-emerald-600" />
                              <span className="font-medium text-emerald-600">{text}</span>
                        </div>
                  ),
            },
            {
                  title: 'Supplier',
                  dataIndex: 'supplier',
                  key: 'supplier',
                  render: (text) => <span className="font-medium text-slate-700">{text}</span>,
            },
            {
                  title: 'Material',
                  dataIndex: 'material',
                  key: 'material',
                  ellipsis: true,
            },
            {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  key: 'quantity',
                  render: (qty) => qty.toLocaleString(),
            },
            {
                  title: 'Total Amount',
                  dataIndex: 'totalAmount',
                  key: 'totalAmount',
                  render: (amount) => <span className="font-semibold">${amount.toLocaleString()}</span>,
            },
            {
                  title: 'Order Date',
                  dataIndex: 'orderDate',
                  key: 'orderDate',
            },
            {
                  title: 'Delivery Date',
                  dataIndex: 'deliveryDate',
                  key: 'deliveryDate',
            },
            {
                  title: 'Priority',
                  dataIndex: 'priority',
                  key: 'priority',
                  render: (priority) => {
                        let color = 'default';
                        if (priority === 'Urgent') color = 'red';
                        if (priority === 'High') color = 'orange';
                        if (priority === 'Medium') color = 'blue';
                        if (priority === 'Low') color = 'green';
                        return <Tag color={color}>{priority}</Tag>;
                  },
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => {
                        let color = 'default';
                        if (status === 'Approved') color = 'success';
                        if (status === 'Pending') color = 'warning';
                        if (status === 'Received') color = 'processing';
                        if (status === 'Cancelled') color = 'error';
                        if (status === 'Draft') color = 'default';
                        return <Tag color={color}>{status}</Tag>;
                  },
            },
      ];

      const handleCreate = () => {
            setEditingRecord(null);
            form.resetFields();
            setDrawerOpen(true);
      };

      const handleEdit = (record: PurchaseOrder) => {
            setEditingRecord(record);
            form.setFieldsValue({
                  ...record,
                  orderDate: dayjs(record.orderDate),
                  deliveryDate: dayjs(record.deliveryDate),
            });
            setDrawerOpen(true);
      };

      const handleDelete = (record: PurchaseOrder) => {
            setData(data.filter((item) => item.key !== record.key));
      };

      const handleView = (record: PurchaseOrder) => {
            setEditingRecord(record);
            form.setFieldsValue({
                  ...record,
                  orderDate: dayjs(record.orderDate),
                  deliveryDate: dayjs(record.deliveryDate),
            });
            setDrawerOpen(true);
      };

      const handleFinish = (values: any) => {
            const formattedValues = {
                  ...values,
                  orderDate: values.orderDate.format('YYYY-MM-DD'),
                  deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
                  totalAmount: values.quantity * values.unitPrice,
            };

            if (editingRecord) {
                  // Update existing
                  setData(
                        data.map((item) =>
                              item.key === editingRecord.key ? { ...item, ...formattedValues } : item
                        )
                  );
            } else {
                  // Create new
                  const newPO: PurchaseOrder = {
                        key: String(data.length + 1),
                        id: `PO-2024-${String(data.length + 1).padStart(3, '0')}`,
                        ...formattedValues,
                  };
                  setData([...data, newPO]);
            }
            setDrawerOpen(false);
            form.resetFields();
      };

      return (
            <div className="space-y-6">
                  <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Purchase Order Management</h1>
                        <p className="text-slate-500">Create and manage purchase orders for materials and supplies</p>
                  </div>

                  <DataTable
                        className='overflow-x-auto'
                        tableTitle="Purchase Orders"
                        columns={columns}
                        dataSource={data}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                        searchPlaceholder="Search purchase orders..."
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1200 }}
                  />

                  <DrawerForm
                        title={editingRecord ? 'Edit Purchase Order' : 'Create New Purchase Order'}
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        onFinish={handleFinish}
                        form={form}
                  >
                        <Form.Item
                              name="supplier"
                              label="Supplier"
                              rules={[{ required: true, message: 'Please select supplier' }]}
                        >
                              <Select placeholder="Select supplier">
                                    <Select.Option value="Global Pharma Supplies Ltd.">Global Pharma Supplies Ltd.</Select.Option>
                                    <Select.Option value="Local Pharma Distributors">Local Pharma Distributors</Select.Option>
                                    <Select.Option value="MediSource International">MediSource International</Select.Option>
                                    <Select.Option value="City Medical Supplies">City Medical Supplies</Select.Option>
                                    <Select.Option value="Asian Chemicals Corp">Asian Chemicals Corp</Select.Option>
                              </Select>
                        </Form.Item>

                        <Form.Item
                              name="material"
                              label="Material/Item Description"
                              rules={[{ required: true, message: 'Please enter material description' }]}
                        >
                              <Input.TextArea rows={3} placeholder="Enter detailed material description" />
                        </Form.Item>

                        <Form.Item
                              name="quantity"
                              label="Quantity"
                              rules={[{ required: true, message: 'Please enter quantity' }]}
                        >
                              <InputNumber min={1} className="w-full" placeholder="Enter quantity" />
                        </Form.Item>

                        <Form.Item
                              name="unitPrice"
                              label="Unit Price ($)"
                              rules={[{ required: true, message: 'Please enter unit price' }]}
                        >
                              <InputNumber min={0} step={0.01} className="w-full" placeholder="Enter unit price" />
                        </Form.Item>

                        <Form.Item
                              name="orderDate"
                              label="Order Date"
                              rules={[{ required: true, message: 'Please select order date' }]}
                        >
                              <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                              name="deliveryDate"
                              label="Expected Delivery Date"
                              rules={[{ required: true, message: 'Please select delivery date' }]}
                        >
                              <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                              name="priority"
                              label="Priority"
                              rules={[{ required: true, message: 'Please select priority' }]}
                        >
                              <Select placeholder="Select priority">
                                    <Select.Option value="Low">Low</Select.Option>
                                    <Select.Option value="Medium">Medium</Select.Option>
                                    <Select.Option value="High">High</Select.Option>
                                    <Select.Option value="Urgent">Urgent</Select.Option>
                              </Select>
                        </Form.Item>

                        <Form.Item
                              name="status"
                              label="Status"
                              rules={[{ required: true, message: 'Please select status' }]}
                        >
                              <Select placeholder="Select status">
                                    <Select.Option value="Draft">Draft</Select.Option>
                                    <Select.Option value="Pending">Pending</Select.Option>
                                    <Select.Option value="Approved">Approved</Select.Option>
                                    <Select.Option value="Received">Received</Select.Option>
                                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                              </Select>
                        </Form.Item>
                  </DrawerForm>
            </div>
      );
}
