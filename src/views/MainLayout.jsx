import React from 'react';
import Sidebar from './Sidebar';
import UserRoleButton from './UserRoleButton';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter flex">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-64">
        <div className="flex justify-end mb-6">
          <UserRoleButton />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;