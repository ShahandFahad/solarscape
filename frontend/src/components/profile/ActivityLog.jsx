import React, { useEffect, useState } from "react";
import axios from "axios";

// Convert time stamp into: X hours etc ago
function formatTimeAgo(timestamp) {
  const now = new Date();
  const timeDifference = now - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

// Get User assessment from server
// Display 3 row incase if size is greater than 3.
// show more  button is added whic display the rest

export default function ActivityLog() {
  const [showMore, setShowMore] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  // Get all the recent user activity and displays here
  useEffect(() => {
    axios
      .get(
        `http://localhost:8001/api/v1/user/store-assessment-history/${localStorage.getItem(
          "UserID"
        )}`
      )
      .then((res) => setRecentActivity(res.data.allAssessments))
      .catch((error) => console.log("Recent Activity Error: ", error));
  }, []);

  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
      <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
      <div className="relative px-4">
        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
        {recentActivity.length === 0 && (
          <span className="text-orange-500">No, Recent Logs...</span>
        )}
        {/* <!-- start::Timeline item --> */}

        {/* ITERATION OVER ACTIVITY: Get each recent activity one by one */}
        {recentActivity.map((activity, index) => {
          // console.log("Index: ", index);
          if (!showMore && index < 3) {
            return (
              <div
                key={index}
                className="flex items-center w-full my-6 -ml-1.5"
              >
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    {`For Lat/Lon [${activity.coordinates.lat}, ${activity.coordinates.lon}]. Annual Solr Rad, AC, DC ${activity.solarRadiationAnnual}, ${activity.ACAnnual}, ${activity.DCAnnual}.`}
                    <span className="text-orange-600 font-bold">{`Capacity Factor ${activity.capacityFactor}`}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(Date.parse(activity.createdAt))}
                  </p>
                </div>
              </div>
            );
          } else if (showMore) {
            // If show more is true than display the rest of the data
            return (
              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    {`For Lat/Lon [${activity.coordinates.lat}, ${activity.coordinates.lon}]. Annual Solr Rad, AC, DC ${activity.solarRadiationAnnual}, ${activity.ACAnnual}, ${activity.DCAnnual}.`}
                    <span className="text-orange-600 font-bold">{`Capacity Factor ${activity.capacityFactor}`}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(Date.parse(activity.createdAt))}
                  </p>
                </div>
              </div>
            );
          } else {
            return ""; // just for formality
          }
        })}
        {/* END OF ITERATION */}

        {/* If recent activiyt length is greater then 3 then display this button */}
        {recentActivity.length > 3 && (
          <h1 className="text-right text-orange-600">
            <button
              onClick={() =>
                showMore ? setShowMore(false) : setShowMore(true)
              }
            >
              {showMore ? "Hide" : "Show More"}
            </button>
          </h1>
        )}
        {/* {console.log(recentActivity.length)} */}
        {/* <!-- end::Timeline item --> */}
      </div>
    </div>
  );
}
