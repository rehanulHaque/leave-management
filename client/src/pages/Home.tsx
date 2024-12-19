
export default function Home() {
  
  return (
    <div>
      <p>USER</p>
      <p>http://localhost:3000/api/user/me</p>
      <p>http://localhost:3000/api/leave/apply-leave</p>
      <p>http://localhost:3000/api/leave/check-leave</p>

      <p>ADMIN</p>
      <p>http://localhost:3000/api/leave/check-all-leave</p>
      <p>http://localhost:3000/api/leave/check-leave/:userId</p>
      <p>http://localhost:3000/api/leave/approve-leave/:userId</p>
      <p>http://localhost:3000/api/leave/reject-leave/:userId</p>
    </div>
  )
}
