import * as React from 'react';
import {useEffect} from "react";
import queryString from 'query-string';

export const SignIn = ({}) => {
    const options = {
        method: 'GET',
        url: 'https://thirsty-herschel-c1bovh9ujt.projects.oryapis.com/oauth2/auth',
        params: {
            client_id: '1ec37eb5-e435-436a-9dde-ea1dd405336d',
            scope: 'email profile',
            response_type: 'code',
            redirect_uri: 'http://localhost',
            state: 'hdsgfshjbdnxfvshjsyeh9876dfjb000jdhdgjsdhfv'
        }
    }
    const queryParams = queryString.stringify(options.params);
    const url = `${options.url}?${queryParams}`;

    useEffect(() => {
        window.location.replace(url);
    }, []);
}

export default SignIn;
