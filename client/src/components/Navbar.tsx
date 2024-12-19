import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/app'

export default function Navbar() {
  const {logoutUser} = useAppStore()
  const token = localStorage.getItem("token")
  return (
    <div className='flex justify-between items-center p-4 shadow-lg'>
      <Link to="/" className='font-bold text-xl'>Manegment</Link>
      <div>
        { token ? <Button onClick={logoutUser}>Logout</Button> : <Link to="/login"><Button>Login</Button></Link>}
      </div>
    </div>
  )
}
