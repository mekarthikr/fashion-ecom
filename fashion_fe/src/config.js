export default {
  oidc: {
    clientId: '0oa60ija3wOvi93BR5d7',
    issuer: 'https://dev-74134547.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: false,
  }
  ,
  widget: {
    issuer: 'https://dev-74134547.okta.com/oauth2/default',
    clientId: '0oa60ija3wOvi93BR5d7',
    redirectUri: `http://localhost:3000/login/callback`,
    scopes: ['openid', 'profile', 'email'],
    useInteractionCodeFlow: true,
    pkce: true,
    disableHttpsCheck: false,
  }
};
