import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background-color: #71b1cd;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00063f;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   router.push('/dashboard');
    // } catch (error) {
    //   console.error('Error logging in:', error.message);
    // }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Container>
      <div style={{fontSize: '52px'}}>LOGIN</div>

      <Form onSubmit={handleLogin}>
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
        <Button type="submit">Login</Button>
      </Form>
      <p>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </Container>
  );
};

export default Login;
