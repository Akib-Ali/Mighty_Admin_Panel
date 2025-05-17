"use client";
import React from 'react';
import ResetPasswordForm from '../../_components/reset-password-form';

const ResetPasswordPage = () => {
  return (
    <div className='container mx-auto my-8'>
      <div className='lg:w-1/3 border p-8 rounded-lg shadow-lg mx-4 lg:mx-auto'>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;