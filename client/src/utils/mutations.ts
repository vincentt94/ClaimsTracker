import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        role
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        role
      }
    }
  }
`;

export const CREATE_CLAIM = gql`
  mutation CreateClaim(
    $fullName: String!
    $dateOfBirth: String!
    $dateOfService: String!
    $claimType: String!
    $description: String!
  ) {
    createClaim(
      fullName: $fullName
      dateOfBirth: $dateOfBirth
      dateOfService: $dateOfService
      claimType: $claimType
      description: $description
    ) {
      _id
      claimNumber
      status
    }
  }
`;

export const UPDATE_CLAIM_STATUS = gql`
  mutation UpdateClaimStatus($claimId: ID!, $status: String!) {
    updateClaimStatus(claimId: $claimId, status: $status) {
      _id
      status
    }
  }
`;