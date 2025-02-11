// src/components/ThongKeDoanhThu.js
import React from 'react';
import Admin from './Admin';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ThongKeDoanhThu = () => {
  const revenueData = [
    { month: 'Tháng 1', revenue: 5000000 },
    { month: 'Tháng 2', revenue: 4500000 },
    { month: 'Tháng 3', revenue: 6000000 },
    { month: 'Tháng 4', revenue: 7000000 },
    { month: 'Tháng 5', revenue: 8000000 },
    { month: 'Tháng 6', revenue: 7500000 },
  ];

  const chartData = {
    labels: revenueData.map((data) => data.month),
    datasets: [
      {
        label: 'Doanh Thu (VNĐ)',
        data: revenueData.map((data) => data.revenue),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống Kê Doanh Thu Theo Tháng',
      },
    },
  };

  return (
    <Admin>
      <Container>
        <Row className="my-4">
          <Col>
            <h3 className="text-center">Thống Kê Doanh Thu</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h5>Bảng Thống Kê</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tháng</th>
                  <th>Doanh Thu (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.month}</td>
                    <td>{data.revenue.toLocaleString('vi-VN')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h5>Biểu Đồ Doanh Thu</h5>
            <Bar data={chartData} options={chartOptions} />
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default ThongKeDoanhThu;
