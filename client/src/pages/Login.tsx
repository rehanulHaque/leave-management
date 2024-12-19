import { Button, Container, Input, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/app'

export default function Login() {
  const toast = useToast()
  const navigate = useNavigate()
  const {register, handleSubmit, reset} = useForm()

  const {loginUser} = useAppStore()
  const onSubmit = async(data: any) => {
    const result = await loginUser(data)
    localStorage.setItem("token", JSON.stringify(result.token))
    toast({
      title: result.message,
      status: result.sucess? "success" : "error",
      duration: 3000,
      isClosable: true
    })
    navigate("/")
    reset()
  }
  return (
    <Container className=''>
      <h1 className='text-3xl font-bold text-center py-4 md:py-8'>Login to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center flex gap-4 flex-col'>
          <Input {...register('email')} placeholder='Email'/>
          <Input {...register('password')} placeholder='Password'/>
        <Button type='submit'>Login</Button>
        <p>Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
      </form>
    </Container>
  )
}
