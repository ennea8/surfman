import express from 'express';
import cors from 'cors';
import path from 'path';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { Surfman } from '@surfman/sdk';

export interface ServerOptions {
  port: number;
  rpcUrl: string;
  openBrowser?: boolean;
}

export async function startWebServer(options: ServerOptions) {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(cors());
  app.use(express.json());

  const client = new Surfman(options.rpcUrl);

  app.post('/api/rpc', async (req, res) => {
    try {
      const { method, params } = req.body;
      const result = await (client as any).request(method, params);
      res.json({ result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', rpcUrl: options.rpcUrl });
  });

  // Handle both dev (tsx) and prod (built) paths
  const staticPath = path.join(__dirname, '../../static');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    
    ws.on('message', async (message) => {
      try {
        const request = JSON.parse(message.toString());
        const result = await (client as any).request(request.method, request.params);
        ws.send(JSON.stringify({ id: request.id, result }));
      } catch (error: any) {
        ws.send(JSON.stringify({ error: error.message }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  return new Promise<void>((resolve) => {
    server.listen(options.port, () => {
      resolve();
    });
  });
}
