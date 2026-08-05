import {
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaRobot />,
    color: "bg-cyan-500",
    title: "AI analyzed a new complaint",
    time: "2 minutes ago",
  },
  {
    icon: <FaCheckCircle />,
    color: "bg-green-500",
    title: "Complaint #104 resolved",
    time: "10 minutes ago",
  },
  {
    icon: <FaExclamationTriangle />,
    color: "bg-red-500",
    title: "High severity complaint detected",
    time: "22 minutes ago",
  },
  {
    icon: <FaFileAlt />,
    color: "bg-indigo-500",
    title: "Daily AI report generated",
    time: "1 hour ago",
  },
  {
    icon: <FaRobot />,
    color: "bg-purple-500",
    title: "CAPA recommendations generated",
    time: "3 hours ago",
  },
];

export default function ActivityTimeline() {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 h-full">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-2xl font-bold">
          Live Activity
        </h2>

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

          <span className="text-sm text-gray-500">
            Live
          </span>

        </div>

      </div>

      <div className="space-y-6">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 items-start"
          >

            <div
              className={`${item.color} h-12 w-12 rounded-full text-white flex items-center justify-center text-xl shadow-lg flex-shrink-0`}
            >
              {item.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}