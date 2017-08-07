import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import { usingFetchDirectly } from './utils'

const AllUsers = gql`
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

const deleteUser = gql`
  mutation deleteUser( $id : String! ) {
    deleteUser(id:$id) {
      id
    }
  }
`;

const uploadFile = gql`
  mutation uploadFile( $originalname : String!, $image : String ) {
    uploadFile(originalname:$originalname, image:$image) {
      filename
      originalname
      destination
    }
  }
`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  model = {};
  allUsers: ApolloQueryObservable<any>;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.allUsers = this
      .apollo
      .watchQuery({ query: AllUsers });
  }

  deleteUser(_id) {
    console.log(_id);

    this.apollo.mutate({
      mutation: deleteUser,
      variables: { id: _id }
    }).subscribe(({ data }) => {
      console.log('got data', data);

      this.allUsers.refetch();

    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }


  addUserClicked() {
    console.log(this.model);

    this.apollo.mutate({
      mutation: addUser,
      variables: this.model
    }).subscribe(({ data }) => {
      console.log('got data', data);

      this.allUsers.refetch();

    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }


  /**
   * 
   * 
   * @param {any} _args 
   * @memberof AppComponent
   */
  fileChangeEvent(_args) {
    if (_args.target.files && _args.target.files[0]) {

      let files = _args.target.files;

      //utils.usingFetchDirectly(files, uploadFile)

      console.log(files[0])
      this.apollo.mutate({
        mutation: uploadFile,
        variables: {
          // add the file object to the request thru variables
          file: files[0],
          originalname: files[0].name
        }
      }).subscribe(({ data }) => {
        console.log('got data', data);

        //this.allUsers.refetch();

      }, (error) => {
        console.log('there was an error sending the query', error);
      });

    }
  }
}
