import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email);
    setMessage(result.msg);
    if (result.result === 'success') {
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Subscribe to receive updates </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
      {message && <div dangerouslySetInnerHTML={{ __html: message }} />}
    </form>
  );
};

export default SubscribeForm;
