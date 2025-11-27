'use client';

import React from 'react';
import { Table, Button, Space, Input, Tooltip, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { Edit, Trash2, Eye, Search, Plus } from 'lucide-react';

interface DataTableProps<T extends object> extends TableProps<T> {
      onEdit?: (record: T) => void;
      onDelete?: (record: T) => void;
      onView?: (record: T) => void;
      onCreate?: () => void;
      searchPlaceholder?: string;
      tableTitle?: string;
}

function DataTable<T extends object>({
      columns = [],
      onEdit,
      onDelete,
      onView,
      onCreate,
      searchPlaceholder = 'Search...',
      tableTitle,
      ...tableProps
}: DataTableProps<T>) {

      const actionColumn = {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_: any, record: T) => (
                  <Space size="small">
                        {onView && (
                              <Tooltip title="View">
                                    <Button
                                          type="text"
                                          icon={<Eye size={16} className="text-slate-500" />}
                                          onClick={() => onView(record)}
                                    />
                              </Tooltip>
                        )}
                        {onEdit && (
                              <Tooltip title="Edit">
                                    <Button
                                          type="text"
                                          icon={<Edit size={16} className="text-blue-500" />}
                                          onClick={() => onEdit(record)}
                                    />
                              </Tooltip>
                        )}
                        {onDelete && (
                              <Tooltip title="Delete">
                                    <Popconfirm
                                          title="Delete this item?"
                                          description="Are you sure to delete this item?"
                                          onConfirm={() => onDelete(record)}
                                          okText="Yes"
                                          cancelText="No"
                                    >
                                          <Button
                                                type="text"
                                                icon={<Trash2 size={16} className="text-red-500" />}
                                                danger
                                          />
                                    </Popconfirm>
                              </Tooltip>
                        )}
                  </Space>
            ),
      };

      const finalColumns = [...columns];
      if (onEdit || onDelete || onView) {
            finalColumns.push(actionColumn);
      }

      return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-slate-800">{tableTitle}</h2>
                        <Space>
                              <Input
                                    placeholder={searchPlaceholder}
                                    prefix={<Search size={16} className="text-slate-400" />}
                                    className="w-64"
                              />
                              {onCreate && (
                                    <Button type="primary" icon={<Plus size={16} />} onClick={onCreate}>
                                          Add New
                                    </Button>
                              )}
                        </Space>
                  </div>
                  <Table columns={finalColumns} {...tableProps} />
            </div>
      );
}

export default DataTable;
