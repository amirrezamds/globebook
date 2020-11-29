;(function(window) {
    'use strict';

    const MESSAGES = {
        'login': 'Login as any user on this computer and another user on another computer.',
        'create_session': 'Creating a session...',
        'connect': 'Connecting...',
        'connect_error': 'Something went wrong with the connection. Check internet connection or user info and try again.',
        'login_as': 'Logged in as ',
        'title_login': 'Choose a user to login with:',
        'title_callee': 'Choose users to call:',
        'calling': 'Calling...',
        'webrtc_not_avaible': 'WebRTC is not available in your browser',
        'no_internet': 'Please check your Internet connection and try again'
    };

    const CC_CREDENTIALS = {
        appId: 691,
        authKey: '7F5qDVGWGSNGqXB',
        authSecret: 'ZUKhCy3UmGqpr7D'
    };

    const CC_CONFIG = {
        // endpoints: {
        //     api: "",
        //     chat: ""
        // },
        debug: true,
        videocalling: {
            answerTimeInterval: 30,
            dialingTimeInterval: 5,
            disconnectTimeInterval: 35,
            statsReportTimeInterval: 5
        }
    };

    const CC_USERS = [
      {
        id: 112290,
        login: "michaelzheng",
        password: "michaelzhengisdumb"
      },
      {
        id: 112292,
        login: "amirmds",
        password: "12345678"
      },
        {
        id: 112471,
        login:"jamesliao",
        password:"jamesisdumb"
        },
        {
        id: 2830771,
        login:"SoltoonDara",
        password:"12345678"
        }
    ];

    window.CONFIG = {
        'CREDENTIALS': CC_CREDENTIALS,
        'APP_CONFIG': CC_CONFIG,
        'USERS': CC_USERS,
        'MESSAGES': MESSAGES
    };
}(window));
