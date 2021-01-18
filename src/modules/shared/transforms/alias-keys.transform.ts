import { Transform } from 'class-transformer';

export function AliasKeys(aliasKeys: string[] | string): PropertyDecorator {
    return Transform((value, obj) => {
        // If we have a value at this key then there is no need to continue
        if (value) {
            return value;
        }
        if (Array.isArray(aliasKeys)) {
            for (const aliasKey of aliasKeys) {
                if (obj[aliasKey] !== undefined) {
                    return obj[aliasKey];
                }
            }
            return value;
        } else {
            return obj[aliasKeys];
        }
    }) as (target: Object, propertyKey: string | symbol) => void;
}

export function AliasKey(aliasKey: string): PropertyDecorator {
    return Transform((value, obj) => {
        // If we have a value at this key then there is no need to continue
        if (value) {
            return value;
        }
        return obj[aliasKey];
    }) as (target: Object, propertyKey: string | symbol) => void;
}
