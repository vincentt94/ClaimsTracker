import React, { useState } from 'react';
import Button from './button';
import { useMutation } from '@apollo/client';
import { CREATE_CLAIM } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const ClaimForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    dateOfService: '',
    claimType: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
//allows users to see refetch queries of all new claims after new claim is created
  const [createClaim] = useMutation(CREATE_CLAIM, {
    refetchQueries: ['GetClaimsByUser'],
    awaitRefetchQueries: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const { data } = await createClaim({ variables: formData });

      setSuccessMessage(`Claim #${data.createClaim.claimNumber} submitted successfully!`);
      setFormData({
        fullName: '',
        dateOfBirth: '',
        dateOfService: '',
        claimType: '',
        description: '',
      });

      // Redirect to dashboard after short delay
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('Failed to submit claim. Please try again.');
    }
  };

  return (
    <div>
      <h2>Submit a New Claim</h2>

      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="dateOfService">Date of Service</label>
        <input
          type="date"
          name="dateOfService"
          value={formData.dateOfService}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="claimType">Claim Type</label>
        <select name="claimType" value={formData.claimType} onChange={handleChange}>
          <option value="">Select Claim Type</option>
          <option value="medical">Medical</option>
          <option value="dental">Dental</option>
          <option value="vision">Vision</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Claim Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <Button text="Submit Claim" type="submit" />
      </form>
    </div>
  );
};

export default ClaimForm;
