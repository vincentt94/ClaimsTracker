
import React, { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, GET_CLAIMS_BY_USER_ID } from '../utils/queries';
import { UPDATE_CLAIM_STATUS } from '../utils/mutations';
import AdminClaimCard from './adminclaimcard';

const AdminDashboard: React.FC = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_ALL_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [getUserClaims, { data: claimsData, loading: claimsLoading }] = useLazyQuery(GET_CLAIMS_BY_USER_ID);
  const [updateClaimStatus] = useMutation(UPDATE_CLAIM_STATUS);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    getUserClaims({ variables: { userId } });
  };

  const handleApprove = async (claimId: string) => {
    await updateClaimStatus({ variables: { claimId, status: 'approved' } });
    if (selectedUserId) getUserClaims({ variables: { userId: selectedUserId } });
  };

  const handleDeny = async (claimId: string) => {
    await updateClaimStatus({ variables: { claimId, status: 'denied' } });
    if (selectedUserId) getUserClaims({ variables: { userId: selectedUserId } });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {usersLoading ? (
        <p>Loading users...</p>
      ) : usersError ? (
        <p>Error loading users</p>
      ) : (
        <div>
          <h3>Users</h3>
          <ul>
            {usersData.getAllUsers.map((user: any) => (
              <li key={user._id}>
                <button onClick={() => handleUserSelect(user._id)}>
                  {user.username} ({user.email})
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedUserId && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Claims</h3>
          {claimsLoading ? (
            <p>Loading claims...</p>
          ) : claimsData?.getClaimsByUserId.length === 0 ? (
            <p>No claims submitted.</p>
          ) : (
            claimsData.getClaimsByUserId.map((claim: any) => (
              <AdminClaimCard
                key={claim._id}
                _id={claim._id}
                fullName={claim.fullName}
                dateOfBirth={claim.dateOfBirth}
                dateOfService={claim.dateOfService}
                claimType={claim.claimType}
                description={claim.description}
                status={claim.status}
                claimNumber={claim.claimNumber}
                onApprove={handleApprove}
                onDeny={handleDeny}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
