import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/components/firebase';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  background-color: #71B1CD;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00063F;
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignUp}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
      <p>Already have an account? <Link href="/login">Login</Link></p>
    </Container>
  );
};

export default SignUp;