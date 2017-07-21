import {Component, OnInit} from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';

const AllUsers = gql `
  query AllUsers {
    allUsers {
      id
      first_name
      last_name
    }
  }
`;


const addUser = gql`
  mutation addUser($first_name:String!, $last_name:String!, $email:String!) {
    addUser(first_name: $first_name, last_name: $last_name, email: $email) {
      id
    }
  }
`;

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  model = {};
  allUsers: ApolloQueryObservable<any>;

  constructor(private apollo : Apollo) {}

  ngOnInit() {
    this.allUsers = this
      .apollo
      .watchQuery({query: AllUsers}) ;
  }

  addUserClicked(_data) {
    console.log(this.model)

    this.apollo.mutate({
      mutation: addUser,
      variables : this.model
    }).subscribe(({ data }) => {
      console.log('got data', data);

      this.allUsers.refetch();

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
