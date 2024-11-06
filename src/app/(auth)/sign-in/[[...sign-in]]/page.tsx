"use client"
import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <main className=''>
      <SignIn />
    </main>
  );
}
