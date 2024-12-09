import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Calendar, Clock, LayoutDashboard, Settings, LogOut } from 'lucide-react';

function Layout() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Calendar className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Scheduler</span>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </NavLink>
                
                <NavLink
                  to="/schedule"
                  className={({ isActive }) =>
                    `${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </NavLink>
                
                <NavLink
                  to="/time-off"
                  className={({ isActive }) =>
                    `${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Time Off
                </NavLink>
                
                {user?.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                    }
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </NavLink>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">{user?.email}</span>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;