import { Theme } from '@mui/material/styles';

import { Fonts, Screens } from './token';
import { getFontStack, remValue } from './utils';

export function configureTypographyPresets(theme: Theme) {
    theme.typography.h1 = {
        fontFamily: getFontStack(Fonts.FontDiagramm),
        fontWeight: 700,
        fontSize: remValue(4.75),
        lineHeight: remValue(5.5),
        [theme.breakpoints.down(Screens.ScreenTablet)]: {
            fontSize: remValue(2.875),
            lineHeight: remValue(3.125),
        },
        [theme.breakpoints.down(Screens.ScreenMobile)]: {
            fontSize: remValue(2),
            lineHeight: remValue(2.5),
        },
    };

    theme.typography.h2 = {
        fontFamily: getFontStack(Fonts.FontDiagramm),
        fontWeight: 700,
        fontSize: remValue(2),
        lineHeight: remValue(2.5),
        [theme.breakpoints.down(Screens.ScreenTablet)]: {
            fontSize: remValue(1.5),
            lineHeight: remValue(2.25),
        },
        [theme.breakpoints.down(Screens.ScreenMobile)]: {
            fontSize: remValue(1.25),
            lineHeight: remValue(1.75),
        },
    };

    theme.typography.h3 = {
        fontFamily: getFontStack(Fonts.FontDiagramm),
        fontWeight: 700,
        fontSize: remValue(1.25),
        lineHeight: remValue(2),
        [theme.breakpoints.down(Screens.ScreenTablet)]: {
            fontSize: remValue(1.125),
            lineHeight: remValue(1.625),
        },
        [theme.breakpoints.down(Screens.ScreenMobile)]: {
            fontSize: remValue(0.875),
            lineHeight: remValue(1.375),
        },
    };

    theme.typography.h4 = {
        fontFamily: getFontStack(Fonts.FontDiagramm),
        fontWeight: 700,
        fontSize: remValue(1),
        lineHeight: remValue(1.75),
    };

    theme.typography.h5 = {
        fontFamily: getFontStack(Fonts.FontDiagramm),
        fontWeight: 700,
        fontSize: remValue(0.875),
        lineHeight: remValue(1.625),
    };

    theme.typography.h6 = {
        fontFamily: getFontStack(Fonts.FontDiagramm),
        fontWeight: 700,
        fontSize: remValue(0.75),
        lineHeight: remValue(1.5),
    };

    theme.typography.body1 = {
        fontFamily: getFontStack(Fonts.FontGilmer),
        fontWeight: 400,
        fontSize: remValue(0.875),
        lineHeight: remValue(1.5),
    };

    theme.typography.body2 = {
        fontFamily: getFontStack(Fonts.FontGilmer),
        fontWeight: 400,
        fontSize: remValue(0.75),
        lineHeight: remValue(1.25),
    };

    theme.typography.button = {
        fontFamily: getFontStack(Fonts.FontGilmer),
        fontWeight: 700,
        fontSize: remValue(0.875),
        lineHeight: remValue(1.5),
        textTransform: 'inherit',
    };
}
