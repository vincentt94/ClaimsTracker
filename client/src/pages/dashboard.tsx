import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_MY_CLAIMS } from '../utils/queries';
import UserClaimsList from '../components/userclaimslist';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_ME);
  const { data: claimsData, loading: claimsLoading, error: claimsError } = useQuery(GET_MY_CLAIMS);

  if (userLoading || claimsLoading) return <p>Loading...</p>;
  if (userError || claimsError) return <p>Error loading dashboard.</p>;

  const user = userData?.me;
  const claims = claimsData?.getClaimsByUser || [];

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button onClick={() => navigate('/submit-claim')}>Submit New Claim</button>

      <hr />

      <h3>Your Claims:</h3>
      {claims.length === 0 ? (
        <p>You have no claims yet.</p>
      ) : (
        <UserClaimsList claims={claims} />
      )}
    </div>
  );
};

export default Dashboard;
