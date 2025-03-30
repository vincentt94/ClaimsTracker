
import React from 'react';
import Button from './button';

//similar to claimcard, but allows approve/deny buttons
type AdminClaimCardProps = {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  dateOfService: string;
  claimType: string;
  description: string;
  status: 'pending' | 'approved' | 'denied';
  claimNumber: string;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
};

const AdminClaimCard: React.FC<AdminClaimCardProps> = ({
  _id,
  fullName,
  dateOfBirth,
  dateOfService,
  claimType,
  description,
  status,
  claimNumber,
  onApprove,
  onDeny
}) => {
  const statusColor = {
    pending: 'text-yellow-600',
    approved: 'text-green-600',
    denied: 'text-red-600'
  }[status];

  return (
    <div >
      <div >
        <h3 >{fullName}</h3>
        <span className={`text-sm font-medium ${statusColor}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <p><strong>Claim Number:</strong> #{claimNumber}</p>
      <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
      <p ><strong>Date of Service:</strong> {dateOfService}</p>
      <p><strong>Claim Type:</strong> {claimType}</p>
      
      <div >
        <p ><strong>Description:</strong></p>
        <p>{description}</p>
      </div>

      {status === 'pending' && (
        <div className="flex gap-3">
          <Button text="Approve" onClick={() => onApprove(_id)} />
          <Button text="Deny" onClick={() => onDeny(_id)}  />
        </div>
      )}
    </div>
  );
};

export default AdminClaimCard;
