'use client';

import React, { useState } from 'react';
import { Form, Input, Select, Rate, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DataTable from '@/components/ui/DataTable';
import DrawerForm from '@/components/ui/DrawerForm';
import { Building2 } from 'lucide-react';

interface Supplier {
      key: string;
      id: string;
      name: string;
      city: string;
      contact: string;
      email: string;
      rating: number;
      status: 'Active' | 'Inactive' | 'Pending';
      certifications: string[];
      lastAudit: string;
}

const mockData: Supplier[] = [
      {
            key: '1',
            id: 'SUP-LOC-001',
            name: 'Local Pharma Distributors',
            city: 'Mumbai',
            contact: '+91 22 12345678',
            email: 'contact@localpharma.in',
            rating: 4,
            status: 'Active',
            certifications: ['GMP', 'ISO 9001'],
            lastAudit: '2024-11-10',
      },
      {
            key: '2',
            id: 'SUP-LOC-002',
            name: 'City Medical Supplies',
            city: 'Delhi',
            contact: '+91 11 98765432',
            email: 'info@citymedical.in',
            rating: 4.5,
            status: 'Active',
            certifications: ['GMP', 'ISO 9001', 'WHO'],
            lastAudit: '2024-10-25',
      },
      {
            key: '3',
            id: 'SUP-LOC-003',
            name: 'Regional Health Products',
            city: 'Bangalore',
            contact: '+91 80 44556677',
            email: 'sales@regionalhealth.in',
            rating: 3.5,
            status: 'Pending',
            certifications: ['GMP'],
            lastAudit: '2024-09-15',
      },
      {
            key: '4',
            id: 'SUP-LOC-004',
            name: 'Metro Pharmaceutical Supplies',
            city: 'Chennai',
            contact: '+91 44 23456789',
            email: 'contact@metropharma.in',
            rating: 5,
            status: 'Active',
            certifications: ['GMP', 'ISO 9001', 'ISO 13485'],
            lastAudit: '2024-11-05',
      },
      {
            key: '5',
            id: 'SUP-LOC-005',
            name: 'State Medical Corporation',
            city: 'Pune',
            contact: '+91 20 87654321',
            email: 'info@statemedical.in',
            rating: 3,
            status: 'Inactive',
            certifications: ['GMP'],
            lastAudit: '2024-07-20',
      },
];

export default function SuppliersLocalPage() {
      const [data, setData] = useState<Supplier[]>(mockData);
      const [drawerOpen, setDrawerOpen] = useState(false);
      const [editingRecord, setEditingRecord] = useState<Supplier | null>(null);
      const [form] = Form.useForm();

      const columns: ColumnsType<Supplier> = [
            {
                  title: 'Supplier ID',
                  dataIndex: 'id',
                  key: 'id',
                  render: (text) => <span className="font-medium text-emerald-600">{text}</span>,
            },
            {
                  title: 'Company Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text) => (
                        <div className="flex items-center gap-2">
                              <Building2 size={16} className="text-slate-400" />
                              <span className="font-medium text-slate-700">{text}</span>
                        </div>
                  ),
            },
            {
                  title: 'City',
                  dataIndex: 'city',
                  key: 'city',
            },
            {
                  title: 'Contact',
                  dataIndex: 'contact',
                  key: 'contact',
            },
            {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  render: (text) => <a href={`mailto:${text}`} className="text-blue-500">{text}</a>,
            },
            {
                  title: 'Rating',
                  dataIndex: 'rating',
                  key: 'rating',
                  render: (rating) => <Rate disabled defaultValue={rating} className="text-sm" />,
            },
            {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => {
                        let color = 'default';
                        if (status === 'Active') color = 'success';
                        if (status === 'Pending') color = 'warning';
                        if (status === 'Inactive') color = 'error';
                        return <Tag color={color}>{status}</Tag>;
                  },
            },
            {
                  title: 'Certifications',
                  dataIndex: 'certifications',
                  key: 'certifications',
                  render: (certs: string[]) => (
                        <div className="flex gap-1 flex-wrap">
                              {certs.map((cert) => (
                                    <Tag key={cert} color="blue" className="text-xs">
                                          {cert}
                                    </Tag>
                              ))}
                        </div>
                  ),
            },
      ];

      const handleCreate = () => {
            setEditingRecord(null);
            form.resetFields();
            setDrawerOpen(true);
      };

      const handleEdit = (record: Supplier) => {
            setEditingRecord(record);
            form.setFieldsValue(record);
            setDrawerOpen(true);
      };

      const handleDelete = (record: Supplier) => {
            setData(data.filter((item) => item.key !== record.key));
      };

      const handleView = (record: Supplier) => {
            setEditingRecord(record);
            form.setFieldsValue(record);
            setDrawerOpen(true);
      };

      const handleFinish = (values: any) => {
            if (editingRecord) {
                  // Update existing
                  setData(
                        data.map((item) =>
                              item.key === editingRecord.key ? { ...item, ...values } : item
                        )
                  );
            } else {
                  // Create new
                  const newSupplier: Supplier = {
                        key: String(data.length + 1),
                        id: `SUP-LOC-${String(data.length + 1).padStart(3, '0')}`,
                        ...values,
                  };
                  setData([...data, newSupplier]);
            }
            setDrawerOpen(false);
            form.resetFields();
      };

      return (
            <div className="space-y-6">
                  <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Supplier Management (Local)</h1>
                        <p className="text-slate-500">Manage local suppliers and their performance</p>
                  </div>

                  <DataTable
                  className='overflow-x-auto'
                        tableTitle="Local Suppliers"
                        columns={columns}
                        dataSource={data}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                        searchPlaceholder="Search suppliers..."
                        pagination={{ pageSize: 10 }}
                  />

                  <DrawerForm
                        title={editingRecord ? 'Edit Supplier' : 'Add New Supplier'}
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        onFinish={handleFinish}
                        form={form}
                  >
                        <Form.Item
                              name="name"
                              label="Company Name"
                              rules={[{ required: true, message: 'Please enter company name' }]}
                        >
                              <Input placeholder="Enter company name" />
                        </Form.Item>

                        <Form.Item
                              name="city"
                              label="City"
                              rules={[{ required: true, message: 'Please select city' }]}
                        >
                              <Select placeholder="Select city">
                                    <Select.Option value="Mumbai">Mumbai</Select.Option>
                                    <Select.Option value="Delhi">Delhi</Select.Option>
                                    <Select.Option value="Bangalore">Bangalore</Select.Option>
                                    <Select.Option value="Chennai">Chennai</Select.Option>
                                    <Select.Option value="Pune">Pune</Select.Option>
                                    <Select.Option value="Hyderabad">Hyderabad</Select.Option>
                                    <Select.Option value="Kolkata">Kolkata</Select.Option>
                              </Select>
                        </Form.Item>

                        <Form.Item
                              name="contact"
                              label="Contact Number"
                              rules={[{ required: true, message: 'Please enter contact number' }]}
                        >
                              <Input placeholder="+91 XX XXXXXXXX" />
                        </Form.Item>

                        <Form.Item
                              name="email"
                              label="Email"
                              rules={[
                                    { required: true, message: 'Please enter email' },
                                    { type: 'email', message: 'Please enter a valid email' },
                              ]}
                        >
                              <Input placeholder="contact@example.com" />
                        </Form.Item>

                        <Form.Item
                              name="rating"
                              label="Rating"
                              rules={[{ required: true, message: 'Please provide rating' }]}
                        >
                              <Rate />
                        </Form.Item>

                        <Form.Item
                              name="status"
                              label="Status"
                              rules={[{ required: true, message: 'Please select status' }]}
                        >
                              <Select placeholder="Select status">
                                    <Select.Option value="Active">Active</Select.Option>
                                    <Select.Option value="Pending">Pending</Select.Option>
                                    <Select.Option value="Inactive">Inactive</Select.Option>
                              </Select>
                        </Form.Item>

                        <Form.Item
                              name="certifications"
                              label="Certifications"
                              rules={[{ required: true, message: 'Please select certifications' }]}
                        >
                              <Select mode="multiple" placeholder="Select certifications">
                                    <Select.Option value="GMP">GMP</Select.Option>
                                    <Select.Option value="ISO 9001">ISO 9001</Select.Option>
                                    <Select.Option value="ISO 13485">ISO 13485</Select.Option>
                                    <Select.Option value="WHO">WHO</Select.Option>
                              </Select>
                        </Form.Item>

                        <Form.Item
                              name="lastAudit"
                              label="Last Audit Date"
                        >
                              <Input type="date" />
                        </Form.Item>
                  </DrawerForm>
            </div>
      );
}
