import React, { useState, useEffect } from "react";
import StatCard from "../components/dashboardcomp/StatCard";
import { GET_ALL_USERS, GET_USER_TIMELINE } from "../utils/apiCalls";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import SimpleBarChart from "../components/dashboardcomp/BarChart";
import SimplePieChart from "../components/dashboardcomp/PieChart";

// Stat Icons
const SidebarItems = {
  totaalUsers: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  ),
  activeUsers: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  ),
  inactiveUsers: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-12 h-12 p-2.5 bg-red-400 bg-opacity-20 rounded-full text-red-600 border border-red-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
      />
    </svg>
  ),
};

export default function Dashboard() {
  // Get all users:
  // 1: Count Total
  // 2: Count Active (Property Active Set To True)
  // 3: Count Inactive (Property Active Set To False)
  const [allUsers, setAllUsers] = useState([]);
  const [totalUsersCount, setTotalUserCount] = useState(0);
  const [totalActiveCount, setTotalActiveCount] = useState(0);
  const [totalInActiveCount, setTotalInActiveCount] = useState(0);
  const [userTimelineData, setUserTimelineData] = useState(null);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch All Users
    GET_ALL_USERS()
      .then((response) => {
        console.log(response);
        if (response.name === "TokenExpiredError") {
          setToken();
          navigate("/explore", { replace: true });
        } else {
          setAllUsers(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Get User Timeline
    const fetchData = async () => {
      try {
        const userTimeline = await GET_USER_TIMELINE();
        console.log(userTimeline);
        // Process userTimeline data here
        setUserTimelineData(userTimeline.data);
      } catch (error) {
        console.error(error);
        // Handle error, if needed
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []);

  // When User are Fetched Perform these operations
  useEffect(() => {
    if (allUsers) {
      // Set Total Count
      setTotalUserCount(allUsers.length);

      // Set Total Active Users
      setTotalActiveCount(
        allUsers.filter((user) => user.active === true).length
      );

      // Set Total Inative Users
      setTotalInActiveCount(
        allUsers.filter((user) => user.active === false).length
      );
    }
  }, [allUsers]);

  return (
    <div className="flex flex-col w-full 2xl:w-3/3">
      <div className="flex-1 bg-white rounded-lg mt-4 p-4">
        {/* Stat Cards */}
        <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          <StatCard
            name="Total Users"
            value={totalUsersCount}
            icon={SidebarItems.totaalUsers}
            color="text-blue-600"
          />
          <StatCard
            name="Active Users"
            value={totalActiveCount}
            icon={SidebarItems.activeUsers}
            color="text-green-600"
          />
          <StatCard
            name="Inactive Users"
            value={totalInActiveCount}
            icon={SidebarItems.inactiveUsers}
            color="text-red-600"
          />
        </div>

        {/* Users Timeline */}
        <div className="bg-white rounded-md mt-10">
          <h4 className="text-xl text-gray-900 font-bold">User Timeline</h4>
          <div
            className="flex lg:flex-row flex-col gap-2 items-center flex-wrap
          mt-4 px-6 py-6 bg-gray-50 border border-gray-300 rounded-lg shadow"
          >
            {/* Barchart */}
            <div className="flex-1">
              {userTimelineData !== null ? (
                <SimpleBarChart userTimelineData={userTimelineData} />
              ) : (
                <></>
              )}
            </div>
            {/* Pie chart */}
            <div>
              <SimplePieChart
                totalActiveCount={totalActiveCount}
                totalInActiveCount={totalInActiveCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
