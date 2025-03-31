import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_CLAIMS_BY_USER_ID } from '../utils/queries';
import AdminClaimCard from './adminclaimcard';

const AdminDashboard: React.FC = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_ALL_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [getUserClaims, { data: claimsData, loading: claimsLoading }] = useLazyQuery(GET_CLAIMS_BY_USER_ID);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    getUserClaims({ variables: { userId } });
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
          <h3>Claims for Selected User</h3>
          {claimsLoading ? (
            <p>Loading claims...</p>
          ) : claimsData?.getClaimsByUserId.length === 0 ? (
            <p>No claims submitted.</p>
          ) : (
            claimsData?.getClaimsByUserId.map((claim: any) => (
              <AdminClaimCard
                key={claim._id}
                {...claim}
                onApprove={() => {}}
                onDeny={() => {}}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
