import { Button, Container, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

export default function ApplyLeave() {
  const { register, handleSubmit, formState: {isSubmitting}, reset, } = useForm();
  const toast = useToast()
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    if (!token) {
      <Navigate to="/login" />;
    }
    const user = await axios.get("http://localhost:3000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    try {
      const formData = new FormData();
      formData.append("startDate", data.from);
      formData.append("endDate", data.to);
      formData.append("reason", data.reason);
      formData.append("image", data.image[0]);
      formData.append("userId", user.data.user.id);
      const response = await fetch("http://localhost:3000/api/leave/apply-leave", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      toast({
        title: result.message,
        status: result.sucess? "success" : "error",
        duration: 3000,
        isClosable: true
      })
      navigate("/all-leaves")
      reset()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Container>
      <h1 className="text-2xl font-bold">Apply Leave</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="From" {...register("from")} type="date"/>
          <Input placeholder="To" {...register("to")} type="date" />
          <Input placeholder="Reason" {...register("reason")} />
          <Input type="file" {...register("image")} />
          <Button type="submit" isLoading={isSubmitting} loadingText="Applying...">Apply</Button>
        </form>
      </Container>
    </div>
  );
}
