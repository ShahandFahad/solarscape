import React from "react";
import UserListProvider from "../provider/UserListProvider";
import UserTable from "../components/user/UserTable";

export default function Users() {
  return (
    <UserListProvider>
      <div className="p-4 mt-16">
        {/* This MUI table - Which is enhanced - With custom search and filters */}
        <UserTable />
        {/* This is custom user table - requires its dat via prop drilling - and has not search filter */}
        {/* {users && <CustomUserTable users={users} />} */}
      </div>
    </UserListProvider>
  );
}
