import React from 'react';
import { useCurrentUser } from '../utils/usecurrentuser';
import UserClaimsList from '../components/userclaimslist';

const Dashboard: React.FC = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) return <p>Loading user info...</p>;
  if (error || !user) return <p>Error loading user data.</p>;

  // For now, use mock claims until real query is added
  const mockClaims = [
    {
      _id: '1',
      fullName: user.username,
      dateOfBirth: '1990-01-01',
      dateOfService: '2025-03-01',
      claimType: 'medical',
      description: 'Routine check-up',
      status: 'pending',
      claimNumber: '12345'
    },
    {
      _id: '2',
      fullName: user.username,
      dateOfBirth: '1990-01-01',
      dateOfService: '2025-02-15',
      claimType: 'dental',
      description: 'Teeth cleaning',
      status: 'approved',
      claimNumber: '67890'
    }
  ];

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <hr />

      <h3>Your Claims:</h3>
      <UserClaimsList claims={mockClaims} />
    </div>
  );
};

export default Dashboard;
