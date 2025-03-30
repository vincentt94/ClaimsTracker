import React from 'react';

type ClaimStatus = 'pending' | 'approved' | 'denied';

// a claim card to outline the claim and it's attributes 
type ClaimCardProps = {
  fullName: string;
  dateOfBirth: string;
  dateOfService: string;
  claimType: string;
  description: string;
  status: ClaimStatus;
  claimNumber: string;
};

const ClaimCard: React.FC<ClaimCardProps> = ({
  fullName,
  dateOfBirth,
  dateOfService,
  claimType,
  description,
  status,
  claimNumber
}) => {
  const statusColor = {
    pending: 'text-yellow-600',
    approved: 'text-green-600',
    denied: 'text-red-600'
  }[status];

  return (
    <div>
      <div >
        <h3 >{fullName}</h3>
        <span className={`text-sm font-medium ${statusColor}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <p><strong>Claim Number:</strong> #{claimNumber}</p>
      <p ><strong>Date of Birth:</strong> {dateOfBirth}</p>
      <p ><strong>Date of Service:</strong> {dateOfService}</p>
      <p ><strong>Claim Type:</strong> {claimType}</p>
      
      <div >
        <p ><strong>Description:</strong></p>
        <p >{description}</p>
      </div>
    </div>
  );
};

export default ClaimCard;
