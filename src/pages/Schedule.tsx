import React from 'react';
import { useAuthStore } from '../stores/authStore';

function Schedule() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>
        <p className="mt-1 text-sm text-gray-500">View and manage your work schedule</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Current Group: {user?.group}</h3>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              View Full Calendar
            </button>
          </div>

          <div className="mt-4">
            {/* Schedule content will be implemented in the next phase */}
            <p className="text-sm text-gray-500">The schedule calendar will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;