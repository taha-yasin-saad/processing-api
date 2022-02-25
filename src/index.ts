import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// Add routes
app.use(routes);

// Start Server
app.listen(port, async (): Promise<void> => {
  const url: string = `http://localhost:${port}`;
  console.log(`${url} to access ..`);
});

export default app;
