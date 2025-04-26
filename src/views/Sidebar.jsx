import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Sidebar = () => {
  const { role } = useParams();
  const dummyRole = role?.toLowerCase() || 'owner';
  const [isOpen, setIsOpen] = useState(false);

  const links = {
    owner: [
      { to: '/dashboard/owner', label: 'Dashboard' },
      { to: '/vehicles', label: 'Vehicles' },
      { to: '/reports', label: 'Reports' },
    ],
    manager: [
      { to: '/dashboard/manager', label: 'Dashboard' },
      { to: '/maintenance', label: 'Maintenance' },
      { to: '/drivers', label: 'Drivers' },
    ],
    driver: [
      { to: '/dashboard/driver', label: 'Dashboard' },
      { to: '/maintenance', label: 'Tasks' },
      { to: '/report-issue', label: 'Report Issue' },
    ],
    admin: [
      { to: '/dashboard/admin', label: 'Dashboard' },
      { to: '/users', label: 'Users' },
      { to: '/settings', label: 'Settings' },
      { to: '/roles', label: 'Roles' },
      { to: '/users/reset-passwords', label: 'Reset Passwords' },
    ],
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 h-screen fixed top-0 left-0 p-6 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static z-40`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-300">Menu</h2>
          <button
            className="md:hidden p-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {(links[dummyRole] || []).map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg text-gray-100 hover:bg-blue-600 ${
                      isActive ? 'bg-blue-600' : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
