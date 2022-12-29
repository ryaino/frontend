import {gql} from "apollo-angular";


export type Response = {
  refreshUser: RefreshTokenOutput
}

export type RefreshTokenOutput = {
  access_token: string;
}

export const REFRESH_USER = gql<Response, {}>`
  query RefreshUser {
    refreshUser {
      access_token
    }
  }
`;
