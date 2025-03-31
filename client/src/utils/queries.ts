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

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      username
      email
    }
  }
`;

export const GET_CLAIMS_BY_USER_ID = gql`
  query GetClaimsByUserId($userId: ID!) {
    getClaimsByUserId(userId: $userId) {
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
