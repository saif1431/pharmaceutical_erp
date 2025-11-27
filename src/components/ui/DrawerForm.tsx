'use client';

import React from 'react';
import { Drawer, Button, Space, Form } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface DrawerFormProps {
      title: string;
      open: boolean;
      onClose: () => void;
      onFinish: (values: any) => void;
      form: FormInstance;
      children: React.ReactNode;
      loading?: boolean;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
      title,
      open,
      onClose,
      onFinish,
      form,
      children,
      loading = false,
}) => {
      return (
            <Drawer
                  title={title}
                  width={720}
                  onClose={onClose}
                  open={open}
                  styles={{
                        body: {
                              paddingBottom: 80,
                        },
                  }}
                  extra={
                        <Space>
                              <Button onClick={onClose}>Cancel</Button>
                              <Button onClick={() => form.submit()} type="primary" loading={loading}>
                                    Submit
                              </Button>
                        </Space>
                  }
            >
                  <Form layout="vertical" form={form} onFinish={onFinish} requiredMark="optional">
                        {children}
                  </Form>
            </Drawer>
      );
};

export default DrawerForm;
