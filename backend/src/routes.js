import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import UrlController from './app/controllers/UrlController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);



routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/urls', UrlController.index);

routes.post('/urls', UrlController.store);
routes.get('/urls/:short_url', UrlController.codeUrl);




export default routes;
