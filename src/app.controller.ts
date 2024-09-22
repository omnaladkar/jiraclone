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



const broadcast = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Insert data and broadcast updates
const insertMetrics = () => {
  const metrics = generateRandomMetrics();
  const sql = 'INSERT INTO metrics (instance_name, cpu_usage, memory_usage, network_in, network_out) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [metrics.instance_name, metrics.cpu_usage, metrics.memory_usage, metrics.network_in, metrics.network_out], (err, result) => {
    if (err) throw err;
    
    console.log('Inserted metrics:', metrics);
    
    // Fetch the latest data and broadcast it
    db.query('SELECT * FROM metrics ORDER BY timestamp DESC LIMIT 10', (err, rows) => {
      if (err) throw err;
      broadcast(rows); // Send latest data to all connected clients
    });
  });
};

// Generate random metrics data
const generateRandomMetrics = () => ({
  instance_name: `Instance ${Math.floor(Math.random() * 5) + 1}`,
  cpu_usage: Math.floor(Math.random() * 100),
  memory_usage: Math.floor(Math.random() * 100),
  network_in: Math.floor(Math.random() * 500),
  network_out: Math.floor(Math.random() * 500),
});

// Insert data every second
setInterval(insertMetrics, 1000); // Every 1 second
