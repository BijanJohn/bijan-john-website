/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email, {
      FNAME: firstName,
      LNAME: lastName
    });
    setMessage(result.msg);
    if (result.result === 'success') {
      setEmail('');
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <>
      <p sx={{
        textAlign: 'center',
        fontSize: '1.2rem',
        marginBottom: '1rem',
        color: 'text'
      }}>
        Subscribe to receive new blog posts
      </p>
      <form 
        onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'background',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        margin: '2rem auto'
      }}
    >
      <label 
        htmlFor="firstName"
        sx={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: 'text'
        }}
      >
        First Name
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your first name"
        required
        sx={{
          padding: '0.75rem',
          border: '1px solid',
          borderColor: 'primary',
          borderRadius: '4px',
          fontSize: '1rem',
          '&:focus': {
            outline: 'none',
            borderColor: 'primary',
            boxShadow: '0 0 0 2px rgba(162, 70, 108, 0.2)'
          }
        }}
      />
      <label 
        htmlFor="lastName"
        sx={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: 'text'
        }}
      >
        Last Name
      </label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter your last name"
        required
        sx={{
          padding: '0.75rem',
          border: '1px solid',
          borderColor: 'primary',
          borderRadius: '4px',
          fontSize: '1rem',
          '&:focus': {
            outline: 'none',
            borderColor: 'primary',
            boxShadow: '0 0 0 2px rgba(162, 70, 108, 0.2)'
          }
        }}
      />
      <label 
        htmlFor="email"
        sx={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: 'text'
        }}
      >
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        sx={{
          padding: '0.75rem',
          border: '1px solid',
          borderColor: 'primary',
          borderRadius: '4px',
          fontSize: '1rem',
          '&:focus': {
            outline: 'none',
            borderColor: 'primary',
            boxShadow: '0 0 0 2px rgba(162, 70, 108, 0.2)'
          }
        }}
      />
      <button 
        type="submit"
        sx={{
          variant: 'variants.button',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Subscribe
      </button>
      {message && (
        <div 
          dangerouslySetInnerHTML={{ __html: message }}
          sx={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: message.includes('success') ? 'rgba(0, 200, 0, 0.1)' : 'rgba(200, 0, 0, 0.1)',
            color: message.includes('success') ? 'green' : 'red'
          }}
        />
      )}
    </form>
    </>
  );
};

export default SubscribeForm;
