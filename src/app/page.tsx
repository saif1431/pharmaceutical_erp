import React from 'react';
import { Row, Col } from 'antd';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RecentOrders from '@/components/dashboard/RecentOrders';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, here's what's happening with your business today.</p>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <KPICard
            title="Total Revenue"
            value="54,230"
            prefix="$"
            trend="up"
            trendValue="12.5%"
            icon={<DollarSign size={20} />}
            color="bg-cyan-100 text-cyan-600"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KPICard
            title="Total Orders"
            value="1,250"
            trend="up"
            trendValue="8.2%"
            icon={<ShoppingCart size={20} />}
            color="bg-blue-100 text-blue-600"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KPICard
            title="Inventory Value"
            value="856,400"
            prefix="$"
            trend="down"
            trendValue="2.4%"
            icon={<Package size={20} />}
            color="bg-orange-100 text-orange-600"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KPICard
            title="Production Output"
            value="45,000"
            suffix=" units"
            trend="up"
            trendValue="5.1%"
            icon={<TrendingUp size={20} />}
            color="bg-cyan-100 text-cyan-600"
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <RevenueChart />
        </Col>
        <Col xs={24} lg={8}>
          <RecentOrders />
        </Col>
      </Row>
    </div>
  );
}
