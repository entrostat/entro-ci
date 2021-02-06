import { Transform } from 'class-transformer';

export function AliasKey(aliasKey: string): PropertyDecorator {
    return Transform((value, obj) => {
        // If we have a value at this key then there is no need to continue
        if (value) {
            return value;
        }
        return obj[aliasKey];
    }) as (target: Object, propertyKey: string | symbol) => void;
}
