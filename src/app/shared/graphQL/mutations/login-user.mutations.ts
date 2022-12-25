import {gql} from "apollo-angular";

export const LOGIN_USER = gql<Response, Variables>`
  mutation LoginUser($loginDetails: LoginDetails!) {
    loginUser(loginDetails: $loginDetails) {
      access_token
      refresh_token
    }
  }
`;

export type Response = {
  loginUser: LoginUser
}

export type Variables = {
  loginDetails: LoginDetails
};

export type LoginDetails = {
  email: string,
  password: string
}

export type LoginUser = {
  access_token: string,
  refresh_token: string
}
