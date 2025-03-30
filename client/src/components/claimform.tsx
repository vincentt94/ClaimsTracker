
import React, { useState } from 'react';
import Button from './button';


// generic claim for for the user to input their information
const ClaimForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    dateOfService: '',
    claimType: '',
    description: '',
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(null);

    // Simple client-side validation
    const { fullName, dateOfBirth, dateOfService, claimType, description } = formData;
    if (!fullName || !dateOfBirth || !dateOfService || !claimType || !description) {
      setErrors('Please fill out all fields.');
      return;
    }

    // In the real app, you'll call a GraphQL mutation here.
    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setSuccess('Claim submitted successfully!');
      setFormData({
        fullName: '',
        dateOfBirth: '',
        dateOfService: '',
        claimType: '',
        description: '',
      });
    } catch (err) {
      setErrors('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2 >Submit a New Claim</h2>

      {errors && <p >{errors}</p>}
      {success && <p >{success}</p>}

      <form onSubmit={handleSubmit} >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfService"
          value={formData.dateOfService}
          onChange={handleChange}
        />

        <select
          name="claimType"
          value={formData.claimType}
          onChange={handleChange}
        >
          <option value="">Select Claim Type</option>
          <option value="medical">Medical</option>
          <option value="dental">Dental</option>
          <option value="vision">Vision</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Claim Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />

        <Button text="Submit Claim" type="submit" />
      </form>
    </div>
  );
};

export default ClaimForm;
