import * as path from 'path';
import * as fs from 'fs';

export class Core {

    public getMockJson(relativePath: string): JSON {
        const pathToJson: string = this.getMockPath(relativePath);
        const getMrr = fs.readFileSync(pathToJson);
        return JSON.parse(getMrr.toString());
    }

    private getMockPath(relativePath: string): string {
        return path.resolve(__dirname, '..', `../src/mocks/${relativePath}`);
    }

}
