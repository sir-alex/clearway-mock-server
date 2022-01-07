import * as express from 'express';
import { Core } from '../common/core';

export class ArtistsRouter extends Core {

    public router: express.Router;

    constructor() {
        super();
        this.router = express.Router();
        this.init();
    }

    private searchByQuery = (req: express.Request, res: express.Response, _next: express.NextFunction): void => {
        const mockJson: JSON | null = this.getMockJson(`artists/search-artists.json`);
        const responseStatus = 200;
/*        switch (req.query.query) {
            case 'west':
            case 'kanye':
                responseStatus = 200;
                mockJson = this.getMockJson(`artists/search-artists-kanye.json`);
                break;
            case 'chloe':
            case 'kardashian':
                responseStatus = 200;
                mockJson = this.getMockJson(`artists/search-artists-chloe.json`);
                break;
            case 'error':
                responseStatus = 500;
                mockJson = null;
                break;
            default:
                responseStatus = 200;
                mockJson = this.getMockJson(`artists/search-artists-empty.json`);
        }*/
        res.status(responseStatus).json(mockJson);
    };

    private getArtistById = (req: express.Request, res: express.Response, _next: express.NextFunction): void => {
        let mockJson: JSON | null;
        let responseStatus: number;
        switch (req.params.artistId) {
            case typeof null:
                responseStatus = 404;
                mockJson = null;
                break;
            default:
                responseStatus = 200;
                mockJson = this.getMockJson(`artists/artist-${req.params.artistId}.json`);
        }
        res.status(responseStatus).json(mockJson);
    };

    private init(): void {
        this.router.get('/search', this.searchByQuery);
        this.router.get('/:artistId', this.getArtistById);
    }

}
