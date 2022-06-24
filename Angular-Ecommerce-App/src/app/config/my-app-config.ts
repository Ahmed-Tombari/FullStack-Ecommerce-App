


export default {

  oidc: {
    clientId: '0oa3uaqkfsTvU927X5d7',
    issuer: 'https://dev-29785067.okta.com/oauth2/default',
    redirectUri: 'https://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    features: {
      registration: true,
    }

  }

};

