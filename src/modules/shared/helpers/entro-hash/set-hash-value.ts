import { IConfig } from '../../interfaces/config';
import * as got from 'got';

export async function setHashValue(hash: string, value: any, config: IConfig) {
    try {
        const response = await got.default.post(`${config.url}/hash/${hash}`, {
            headers: {
                token: config.token,
            },
            json: value,
        });
        try {
            return JSON.parse(response.body);
        } catch (error) {
            return response.body;
        }
    } catch (e) {
        return false;
    }
}
