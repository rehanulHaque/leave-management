import { Button, Container } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

export default function AllLeaves() {
    const [allLeaves, setAllLeaves] = useState<any>([])
    const token = JSON.parse(localStorage.getItem("token")!);
    const getAllLeaves = async() => {
        if(!token){
            <Navigate to="/login"/>
        }
        const data = await axios.get("http://localhost:3000/api/leave/check-leave", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setAllLeaves(data.data.applicationList)
    }
    useEffect(()=> {
        getAllLeaves()
    }, [])
  return (
    <Container>
        <h1>All Leaves</h1>
        {allLeaves && allLeaves.map((leave: any) => (
            <div key={leave._id} className='border border-black rounded-md p-4'>
                <h2>{leave.from}</h2>
                <h2>{leave.to}</h2>
                <p>{leave.reason}</p>
                <p>{leave.status}</p>
                <img src={leave.documentUrl} className='h-[100px] w-auto'/>
            </div>
        ))}
        <Link to={'/apply-leave'}><Button>Apply Leave</Button></Link>
    </Container>
  )
}
