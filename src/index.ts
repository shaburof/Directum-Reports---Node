import { app } from './server';

import apiRouter from './router/apiRouter';
import loginRouter from './router/loginRouter';
import serviceRouter from './router/serviceRouter';
import responsiveRouter from './router/responsiveRouter';
import classifierRouter from './router/classifierRouter';
import { errorHandler } from './services/errorHandler';
import { userMiddleware } from './middlewares/userMiddleware';
import { guardMiddleware } from './middlewares/guardMiddleware';

app.use(userMiddleware);
app.use(guardMiddleware);

app.use('/', loginRouter);
app.use('/', apiRouter);
app.use('/', responsiveRouter);
app.use('/', classifierRouter);

app.use('*', serviceRouter);
app.use(errorHandler);
