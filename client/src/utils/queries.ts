import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      role
    }
  }
`;

export const GET_MY_CLAIMS = gql`
  query GetClaimsByUser {
    getClaimsByUser {
      _id
      fullName
      dateOfBirth
      dateOfService
      claimType
      description
      status
      claimNumber
    }
  }
`;