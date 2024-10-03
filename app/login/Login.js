import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import styled from "styled-components";
import { Oswald } from "next/font/google";
const TitleFont = Oswald({ subsets: ["latin"], weight: "300" });


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${TitleFont.style.fontFamily};
`;

const LoginBox = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 50vw;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 60vw;
    height: 40vh;
    padding: 30px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 15px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
    @media (max-width: 768px) {
      margin: 0;
      margin-bottom: 10px;
    }
`;

const Button = styled.button`
  padding: 12px 20px;
  margin-top: 20px;
  width: 100%;
  border: none;
  background-color: #00063f;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #71b1cd;
  }

      @media (max-width: 768px) {
      margin: 0;
      margin-bottom: 10px;
    }
`;

const TextLink = styled.p`
  margin-top: 20px;
  color: #555;

  a {
    color: #00063f;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 32px;
  color: #00063f;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error logging in:", error.message);
      });
  };

  return (
    <Container>
      <LoginBox>
        <Title>SIGN IN</Title>

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
          <Button type="submit">SIGN IN</Button>
        </Form>

        <TextLink>
          Don't have an account? <Link href="/contact">Contact Us</Link>
        </TextLink>
      </LoginBox>
    </Container>
  );
};

export default Login;
