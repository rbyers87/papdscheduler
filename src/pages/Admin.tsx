import React from 'react';
import { useAuthStore } from '../stores/authStore';

function Admin() {
  const { user } = useAuthStore();

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">Manage users, schedules, and permissions</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">User Management</h3>
            <div className="mt-4">
              {/* User management content will be implemented in the next phase */}
              <p className="text-sm text-gray-500">User management interface will appear here.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Schedule Management</h3>
            <div className="mt-4">
              {/* Schedule management content will be implemented in the next phase */}
              <p className="text-sm text-gray-500">Schedule management interface will appear here.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Time Off Requests</h3>
            <div className="mt-4">
              {/* Time off management content will be implemented in the next phase */}
              <p className="text-sm text-gray-500">Time off request management interface will appear here.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Group Management</h3>
            <div className="mt-4">
              {/* Group management content will be implemented in the next phase */}
              <p className="text-sm text-gray-500">Group management interface will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;