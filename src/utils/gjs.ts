import { GObject } from '@girs/gobject-2.0'

export function registerGObjectClass<
    K,
    T extends {
        metaInfo?: GObject.MetaInfo<any, any, any>
        new (...params: any[]): K
    }
>(target: T) {
    if (Object.prototype.hasOwnProperty.call(target, 'metaInfo')) {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line
        return GObject.registerClass<K, T>(
            target.metaInfo!,
            target
        ) as typeof target
    } else {
        // eslint-disable-next-line
        // @ts-ignore
        return GObject.registerClass<K, T>(target) as typeof target
    }
}
