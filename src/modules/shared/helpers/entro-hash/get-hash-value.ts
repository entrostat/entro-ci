import { IConfig } from '../../interfaces/config';
import * as got from 'got';

export async function getHashValue(hash: string, config: IConfig) {
    try {
        const value = await got.default.get(`${config.url}/hash/${hash}`, {
            headers: {
                token: config.token,
            },
        });
        try {
            return JSON.parse(value.body);
        } catch (error) {
            return value.body;
        }
    } catch (e) {
        return false;
    }
}
