import { Transform } from 'class-transformer';

export function AliasKey(aliasKey: string): PropertyDecorator {
    // I'm ignoring this for now, it's not being used currently.
    // TODO: Remove this when possible
    // @ts-ignore
    return Transform((value: any, obj: any) => {
        // If we have a value at this key then there is no need to continue
        if (value) {
            return value;
        }
        return obj[aliasKey];
    }) as (target: Object, propertyKey: string | symbol) => void;
}
