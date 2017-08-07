
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { print as printGraphQL } from 'graphql/language/printer';
import { ApolloClient } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

function myCreateNetworkInterface(url) {
  return {
    query(request) {
      const formData = new FormData();

      // search for File objects on the request and 
      // set them as formData
      const variables = {}
      for (let key in request.variables) {
        let v = request.variables[key]
        if (v instanceof File) {
          console.log(key, v)
          formData.append(key, v)
        } else {
          variables[key] = v
        }
      }

      formData.append('query', printGraphQL(request.query));
      formData.append('variables', JSON.stringify(variables))
      formData.append('debugName', request.debugName || '');
      formData.append('operationName', request.operationName || '');

      return fetch(url.uri, {
        headers: { Accept: '*/*' },
        body: formData,
        method: 'POST',
      }).then(result => result.json());
    }
  }
}




// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client = new ApolloClient({
  networkInterface: myCreateNetworkInterface({
    uri: 'https://aks-graphql-sample1.glitch.me/graphql',
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
