import config from './../config/config.js';
import app from '../app.js';

app.listen(config.port, () => {
  console.log(`This server is running on port: http://localhost:${config.port}...`);
});
