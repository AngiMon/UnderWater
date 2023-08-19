import { Shadows as MuiShadowStack } from '@mui/material/styles';

import {
    Fonts,
    REM_BASE_PX,
    SPACING_INTERVAL,
    Spacings,
    SYSTEM_FONT_STACK,
} from './token';

export function getFontStack(font: Fonts): string {
    return [font, ...SYSTEM_FONT_STACK]
        .map((name) => (name.indexOf(' ') !== -1 ? `"${name}"` : name))
        .join(',');
}

export function getShadowStack(shadows: string[]): MuiShadowStack {
    // @ts-ignore
    const res = new Array(25).fill('none') as MuiShadowStack;
    for (let i = 1; i < 25; i++) {
        res[i] = shadows[Math.floor(((i - 1) * shadows.length) / 24)]!;
    }
    return res;
}

export function remToPx(rem: number): number {
    return REM_BASE_PX * rem;
}

export function remValue(rem: number) {
    return `${rem}rem`;
}

export function spacingToRem(spacing: number | Spacings): string {
    return `${(SPACING_INTERVAL / REM_BASE_PX) * spacing}rem`;
}

export type AddPrefix<S, P extends string> = S extends string
    ? `${P}${S}`
    : never;
export type RemovePrefix<S, P extends string> = S extends AddPrefix<infer K, P>
    ? K
    : never;
export type LowerFirst<S> = S extends `${infer F}${infer R}`
    ? `${Lowercase<F>}${R}`
    : never;
export type TokenString<K extends string, P extends string> = LowerFirst<
    RemovePrefix<K, P>
>;
export type TokenEnum = Record<string, unknown>;
export type TokenObject<T extends TokenEnum, P extends string> = {
    [K in Extract<keyof T, string> as TokenString<K, P>]: T[K];
};

export function makeTokenString<K extends string, P extends string>(
    name: K,
    prefix: P
): TokenString<K, P> {
    // @ts-ignore
    const trimmed = name.startsWith(prefix)
        ? name.substring(prefix.length)
        : name;
    return `${trimmed.substring(0, 1).toLowerCase()}${trimmed.substring(
        1
    )}` as TokenString<K, P>;
}

export function makeTokenObject<T extends TokenEnum, P extends string>(
    def: T,
    prefix: P
): TokenObject<T, P> {
    const obj: Record<string, unknown> = {};
    for (const k in def) {
        obj[makeTokenString(k, prefix)] = def[k];
    }
    return obj as TokenObject<T, P>;
}
