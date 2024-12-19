import { Button, Checkbox, Container, Input, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {useAppStore} from '../store/app'

export default function Home() {
  const toast = useToast()
  const navigate = useNavigate()
  const {register, handleSubmit, reset} = useForm()

  const {registerUser} = useAppStore()
  const onSubmit = async(data: any) => {
    const newData = {
      ...data, role: data.role ? 'admin' : 'user'
    }
    const result = await registerUser(newData)
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
      <h1 className='text-3xl font-bold text-center py-4 md:py-8'>Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='text-center flex gap-4 flex-col'>
          <Input {...register('email')} placeholder='Email'/>
          <Input {...register('username')} placeholder='Username'/>
          <Input {...register('password')} placeholder='Password'/>
          <Checkbox {...register('role')}>Are you Admin</Checkbox>
        <Button type='submit'>Sign up</Button>
        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
    </Container>
  )
}
