import React from 'react';
import ClaimCard from './claimcard';

//claim list to loop through users submitted claims and render a list of claimcards 
type Claim = {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  dateOfService: string;
  claimType: string;
  description: string;
  status: 'pending' | 'approved' | 'denied';
  claimNumber: string;
};

type UserClaimsListProps = {
  claims: Claim[];
};

const UserClaimsList: React.FC<UserClaimsListProps> = ({ claims }) => {
  if (!claims || claims.length === 0) {
    return (
      <p>
        You haven't submitted any claims yet.
      </p>
    );
  }

  return (
    <div>
      {claims.map((claim) => (
        <ClaimCard
          key={claim._id}
          fullName={claim.fullName}
          dateOfBirth={claim.dateOfBirth}
          dateOfService={claim.dateOfService}
          claimType={claim.claimType}
          description={claim.description}
          status={claim.status}
          claimNumber={claim.claimNumber}
        />
      ))}
    </div>
  );
};

export default UserClaimsList;
