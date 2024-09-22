import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

const MetricsDashboard = () => {
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:4000');

    // Listen for messages (data updates) from the WebSocket server
    ws.onmessage = (event) => {
      const newMetrics = JSON.parse(event.data);
      setMetricsData(newMetrics);  // Update the chart data with new metrics
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  // Prepare data for the charts
  const chartData = metricsData.map(row => ({
    instanceName: row.instance_name,
    timestamp: new Date(row.timestamp).toLocaleTimeString(),
    cpuUsage: row.cpu_usage,
    memoryUsage: row.memory_usage,
    networkIn: row.network_in,
    networkOut: row.network_out
  }));

  return (
    <div>
      <h2>AWS Instances Metrics Dashboard (Real-Time with WebSockets)</h2>

      {/* LineChart for CPU Usage */}
      <div>
        <h3>CPU Usage (%) Over Time</h3>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpuUsage" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* BarChart for Memory Usage */}
      <div>
        <h3>Memory Usage (%) Over Time</h3>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="memoryUsage" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* AreaChart for Network In/Out */}
      <div>
        <h3>Network Traffic (MB) Over Time</h3>
        <AreaChart width={600} height={300} data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="networkIn" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="networkOut" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </div>
    </div>
  );
};

export default MetricsDashboard;

// Insert data and broadcast updates
 // Every 1 second
