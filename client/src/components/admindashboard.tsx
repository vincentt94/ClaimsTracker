// src/components/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import AdminClaimCard from './adminclaimcard';

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

const AdminDashboard: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([
    {
      _id: '1',
      fullName: 'John Smith',
      dateOfBirth: '1985-06-15',
      dateOfService: '2025-03-01',
      claimType: 'medical',
      description: 'Emergency room visit',
      status: 'pending',
      claimNumber: '12345'
    },
    {
      _id: '2',
      fullName: 'Emily Brown',
      dateOfBirth: '1991-08-22',
      dateOfService: '2025-02-15',
      claimType: 'dental',
      description: 'Tooth extraction and recovery',
      status: 'approved',
      claimNumber: '67890'
    }
  ]);

  const handleApprove = (id: string) => {
    setClaims(prev =>
      prev.map(claim =>
        claim._id === id ? { ...claim, status: 'approved' } : claim
      )
    );
    // Need to add GraphQL mutation here to update status in backend
  };

  const handleDeny = (id: string) => {
    setClaims(prev =>
      prev.map(claim =>
        claim._id === id ? { ...claim, status: 'denied' } : claim
      )
    );
    //Need to add GraphQL mutation here to update status in backend
  };

  return (
    <div >
      <h2 >Admin Claim Management</h2>
      {claims.length === 0 ? (
        <p>No claims to display.</p>
      ) : (
        claims.map(claim => (
          <AdminClaimCard
            key={claim._id}
            {...claim}
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
