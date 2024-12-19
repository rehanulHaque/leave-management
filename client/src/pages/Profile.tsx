import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface UserTypes {
  email: string;
  username: string;
  role: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserTypes>();
  const token = JSON.parse(localStorage.getItem("token")!);
  const getProfile = async () => {
    if (!token) {
      <Navigate to="/login" />;
    }
    const data = await axios.get("http://localhost:3000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(data.data.user);
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Container>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>{userData?.username}</p>
      <p>{userData?.role}</p>
    </Container>
  );
}
