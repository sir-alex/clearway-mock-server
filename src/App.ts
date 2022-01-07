import cors from 'cors';
import express from 'express';
import { createServer, Server } from 'http';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { ArtistsRouter } from './routes/artists';

export class MockApiServer {

    public static readonly DELAYMS: number = 0;
    public static readonly PORT: number = 3004;
    private app: express.Application;
    private delayMs: string | number;
    private port: string | number;
    private server: Server;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || MockApiServer.PORT;
        this.delayMs = process.env.DELAYMS || MockApiServer.DELAYMS;
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use((_req, _res, next) => setTimeout(next, parseInt(this.delayMs as string, 0)));
        this.app.set('port', this.port);
        this.server = createServer(this.app);
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private listen(): void {
        this.server.listen(this.port);
        // tslint:disable-next-line:no-console
        console.log(`Mock API server started on port ${this.port}`);
    }

    private routes(): void {
        const artistsRouter: ArtistsRouter = new ArtistsRouter();
        this.app.use('/api/v1/artists/', artistsRouter.router);
    }

}
