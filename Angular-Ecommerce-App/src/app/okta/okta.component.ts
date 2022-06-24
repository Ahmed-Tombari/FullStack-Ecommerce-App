import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from '../config/my-app-config';





@Component({
  selector: 'app-okta',
  templateUrl: './okta.component.html',
  styleUrls: ['./okta.component.css']
})
export class OktaComponent implements OnInit {

  constructor(public authStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth : OktaAuth) { }

  ngOnInit(): void {
    var oktaSignIn = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
        oktaSignIn.renderEl({ el: '#okta-login-container' },
        this.oktaAuth.signInWithRedirect(),
            function(error) {
                // Logs errors that occur when configuring the widget.
                // Remove or replace this with your own custom error handler.
                console.log(error.message, error);
                throw error;
              }
              );
            }

}


