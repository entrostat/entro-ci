export function fixHash(hash: string): string {
    hash = hash.replace(/ +.+/, '');
    return hash.replace(/\n/, '');
}
