import { Transform } from 'class-transformer';

export function AliasKeys(keys: string[] | string): PropertyDecorator {
    return Transform((value, obj) => {
        // If we have a value at this key then there is no need to continue
        if (value) {
            return value;
        }
        if (Array.isArray(keys)) {
            for (const key of keys) {
                if (obj[key] !== undefined) {
                    return obj[key];
                }
            }
            return value;
        } else {
            return obj[keys];
        }
    }) as (target: Object, propertyKey: string | symbol) => void;
}

export function AliasKey(key: string): PropertyDecorator {
    return AliasKeys([key]);
}
