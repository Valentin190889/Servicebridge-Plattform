import { 
  Users, 
  Brain, 
  MessageSquare, 
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const stats = [
  {
    name: 'Total Users',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'blue'
  },
  {
    name: 'AI Interactions',
    value: '45.8K',
    change: '+23%',
    changeType: 'increase',
    icon: Brain,
    color: 'purple'
  },
  {
    name: 'Support Tickets',
    value: '98%',
    change: '+4%',
    changeType: 'increase',
    icon: MessageSquare,
    color: 'green'
  },
  {
    name: 'Revenue',
    value: '$89.4K',
    change: '+15%',
    changeType: 'increase',
    icon: CreditCard,
    color: 'orange'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'New User',
    content: 'John Doe signed up for Professional plan',
    timestamp: '5 minutes ago',
    icon: Users,
    iconColor: 'text-blue-500'
  },
  {
    id: 2,
    type: 'AI Training',
    content: 'New model version deployed successfully',
    timestamp: '1 hour ago',
    icon: Brain,
    iconColor: 'text-purple-500'
  },
  {
    id: 3,
    type: 'Support',
    content: 'Resolved ticket #1234 - API Integration',
    timestamp: '2 hours ago',
    icon: CheckCircle,
    iconColor: 'text-green-500'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">Last updated: 5 minutes ago</span>
          <button 
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
            style={{
              backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
              border: '1px solid white',
              boxShadow: '0 0 20px #eee',
              backgroundSize: '200% auto',
            }}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white/10 overflow-hidden rounded-lg border border-white/20 hover:border-[#29DDDA] transition-all duration-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className={`h-6 w-6 text-${stat.color}-500`}
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-white">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-white/5 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`text-${
                    stat.changeType === 'increase' ? 'green' : 'red'
                  }-500`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-300"> from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 rounded-lg border border-white/20 hover:border-[#29DDDA] transition-all duration-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-white/20"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white/5 ${activity.iconColor} bg-white/10`}
                        >
                          <activity.icon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-white">
                            {activity.content}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-300">
                          <Clock className="inline-block h-4 w-4 mr-1" />
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 