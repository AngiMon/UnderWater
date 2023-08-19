import * as React from 'react';
import ResponsiveAppBar, {AuthProps} from "../Components/Molecules/NavBar/NavBar";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {defaultTheme} from '../Style/theme';
import {usePage} from "@inertiajs/react";
import Container from "@mui/material/Container";

export default function Layout({ children }) {
    const pages = [
        {
            title: 'Projets',
            path: '/projects',
        },
        {
            title: 'Tableau',
            path: '/tasks',
        },
    ];
    const settings = [
        {
            title: 'Profil',
            path: '/settings',
        },
        {
            title: 'Se déconnecter',
            path: '/logout',
        }
    ]

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <ResponsiveAppBar
                title="UnderWater"
                pages={pages}
                settings={settings}
            />
            <Container sx={{minHeight: '100vh'}}>
                {children}
            </Container>
        </ThemeProvider>
    )
}
