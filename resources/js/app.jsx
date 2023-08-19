import * as React from 'react';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import './Ui/Style/base.css';

createInertiaApp({
    id: 'app',
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', {eager: true})
        return pages[`./Pages/${name}.tsx`]
    },
    setup({el, App, props}) {
        createRoot(el).render(<App {...props} />)
    },
}).then(r => console.log("App is running..."))
