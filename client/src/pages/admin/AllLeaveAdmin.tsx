import { Button, Container } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllLeaveAdmin() {
  const [allData, setALlData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")!);

  const getAllLeaves = async () => {
    const data = await axios.get(
      "http://localhost:3000/api/leave/check-all-leave",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setALlData(data.data.applicationList);
  };
  useEffect(() => {
    getAllLeaves();
  }, []);

  const approveApplication = async (id: string) => {
    // setApproveLoading(true)
    const data = await axios.patch(
      `http://localhost:3000/api/leave/approve-leave/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const rejectApplication = async (id: string) => {
    // setRejectLoading(true)
    const data = await axios.patch(
      `http://localhost:3000/api/leave/reject-leave/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  return (
    <Container>
      <h1>Admin All Leave</h1>
      {allData &&
        allData.map((leave: any) => (
          <div key={leave._id} className="border border-black rounded-md p-4">
            <h2>{leave.from}</h2>
            <h2>{leave.to}</h2>
            <p>{leave.reason}</p>
            <p>{leave.status}</p>
            <img src={leave.documentUrl} className="h-[100px] w-auto" />
            <div className="flex gap-4 mt-4">
              <Button onClick={() => approveApplication(leave._id)}>
                Approve
              </Button>
              <Button onClick={() => rejectApplication(leave._id)}>
                Reject
              </Button>
            </div>
          </div>
        ))}
    </Container>
  );
}
