import { App } from './app';

const corsConfig = {
  origin: 'http://localhost:3003',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = new App(corsConfig);

app.listen(PORT);
