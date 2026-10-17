require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Server startup failed.');
    process.exit(1);
  }
};

startServer();
