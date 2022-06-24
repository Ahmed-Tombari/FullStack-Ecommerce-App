import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';


interface ResourceServerExample {
  label: string;
  url: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  resourceServerExamples: Array<ResourceServerExample>;
  userName: string = '';
  isAuthenticated: boolean = true;
  error: Error | null = null;
  storage: Storage = sessionStorage;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.resourceServerExamples = [
      {
        label: 'Node/Express Resource Server Example',
        url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
      },
      {
        label: 'Java/Spring MVC Resource Server Example',
        url: 'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
      },
    ];
  }

  async login() {
    await this.oktaAuth.signInWithRedirect({ originalUri: '/' });
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name as string;}
   /* try {
      await this.oktaAuth.signInWithRedirect({ originalUri: '/login' });
    } catch (err) {
      console.error(err);
      this.error = err as Error;
    }*/
  }
  async logout() {
    await this.oktaAuth.signOut();
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {


      const userClaims = await this.oktaAuth.getUser();

      // user full name is exposed as a property name
      this.userName = userClaims.name as string;
      console.log(this.userName);

      // retrive the user's email from authentication response
       const theEmail = userClaims.email as string;
       console.log(theEmail);

      // store the email in browser storage
      this.storage.setItem('userEmail', JSON.stringify(theEmail));
    }
  }
}
