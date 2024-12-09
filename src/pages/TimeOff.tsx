import React from 'react';
import { useAuthStore } from '../stores/authStore';

function TimeOff() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Time Off Requests</h2>
        <p className="mt-1 text-sm text-gray-500">Request and manage your time off</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Available Balance</h3>
              <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Vacation:</span>
                  <span className="ml-2 font-medium">{user?.benefits.vacation} hours</span>
                </div>
                <div>
                  <span className="text-gray-500">Sick Leave:</span>
                  <span className="ml-2 font-medium">{user?.benefits.sick} hours</span>
                </div>
                <div>
                  <span className="text-gray-500">Comp Time:</span>
                  <span className="ml-2 font-medium">{user?.benefits.comp} hours</span>
                </div>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              New Request
            </button>
          </div>

          <div className="mt-6">
            {/* Time off requests list will be implemented in the next phase */}
            <p className="text-sm text-gray-500">Your time off requests will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeOff;