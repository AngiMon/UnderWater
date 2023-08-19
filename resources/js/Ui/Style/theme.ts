import { LinkProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Colors, Fonts, REM_BASE_PX, Shadows } from './token';
import { configureTypographyPresets } from './typography';
import {
    getFontStack,
    getShadowStack,
    makeTokenObject,
    remToPx,
    spacingToRem,
} from './utils';

const baseTheme = {
    palette: {
        common: {
            black: Colors.ColorBlack,
            white: Colors.ColorWhite,
        },
        primary: {
            main: Colors.ColorWater,
            light: Colors.ColorGrey500,
            dark: Colors.ColorBlack,
            contrastText: Colors.ColorWhite,
        },
        secondary: {
            main: Colors.ColorBlue,
            light: Colors.ColorSky,
            // dark
            contrastText: Colors.ColorWhite,
        },
        error: {
            main: Colors.ColorError,
            light: Colors.ColorErrorSoft,
            // dark
            contrastText: Colors.ColorWhite,
        },
        warning: {
            main: Colors.ColorWarning,
            light: Colors.ColorWarningSoft,
            // dark
            contrastText: Colors.ColorBlack,
        },
        info: {
            main: Colors.ColorInformation,
            light: Colors.ColorInformationSoft,
            // dark
            contrastText: Colors.ColorBlack,
        },
        success: {
            main: Colors.ColorSuccess,
            light: Colors.ColorSuccessSoft,
            // dark
            contrastText: Colors.ColorBlack,
        },
        grey: {
            // 900
            // 800
            700: Colors.ColorGrey700,
            600: Colors.ColorGrey600,
            500: Colors.ColorGrey500,
            400: Colors.ColorGrey400,
            300: Colors.ColorGrey300,
            200: Colors.ColorGrey200,
            100: Colors.ColorGrey100,
            // 50
            // A700
            // A400
            // A200
            // A100
        },
        text: {
            primary: Colors.ColorWater,
            secondary: Colors.ColorBlack,
            disabled: Colors.ColorGrey400,
        },
        divider: Colors.ColorGrey200,
        background: {
            paper: Colors.ColorWhite,
            default: Colors.ColorWhite,
        },
        custom: makeTokenObject(Colors, 'Color'),
    },
    typography: {
        htmlFontSize: REM_BASE_PX,
        fontFamily: getFontStack(Fonts.FontGilmer),
        fontSize: remToPx(0.875),
    },
    shape: {
        borderRadius: remToPx(0.25),
    },
    spacing: (factor: number) => spacingToRem(factor),
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1320,
            xl: 1920,
        },
    },
    components: {
        MuiLink: {

        },
        MuiButtonBase: {

        },
    },
};

export const defaultTheme = createTheme(baseTheme);
configureTypographyPresets(defaultTheme);

const adminThemeOverrides = {
    palette: {
        primary: {
            main: Colors.ColorViolet,
            light: Colors.ColorLavande,
            // dark
            contrastText: Colors.ColorWhite,
        },
    },
};

export const adminTheme = createTheme(
    deepmerge(baseTheme, adminThemeOverrides)
);
configureTypographyPresets(adminTheme);
