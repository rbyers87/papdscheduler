import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { Calendar, Clock, Users } from 'lucide-react';

function BenefitsCard({ title, amount, icon: Icon }: { title: string; amount: number; icon: React.ElementType }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{amount}</div>
                <div className="ml-2 text-sm text-gray-500">hours</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h2>
        <p className="mt-1 text-sm text-gray-500">Here's your current benefits balance and schedule overview</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <BenefitsCard 
          title="Vacation Balance" 
          amount={user.benefits.vacation}
          icon={Calendar}
        />
        <BenefitsCard 
          title="Sick Leave Balance" 
          amount={user.benefits.sick}
          icon={Clock}
        />
        <BenefitsCard 
          title="Comp Time Balance" 
          amount={user.benefits.comp}
          icon={Users}
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Schedule</h3>
          <div className="mt-4">
            {/* Schedule content will be implemented in the next phase */}
            <p className="text-sm text-gray-500">Your upcoming shifts will appear here.</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Time-Off Requests</h3>
          <div className="mt-4">
            {/* Time-off requests will be implemented in the next phase */}
            <p className="text-sm text-gray-500">Your recent time-off requests will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;