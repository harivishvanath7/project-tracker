import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const topicsData = {
  dsa: {
    title: "DSA",
    topics: {
      "Arrays": ["Sorting", "Searching"],
      "Linked Lists": ["Singly Linked List", "Doubly Linked List"],
    },
  },
  mern: {
    title: "MERN",
    topics: {
      "Frontend": ["React Basics", "Tailwind CSS"],
      "Backend": ["Node.js", "Express"],
    },
  },
  others: {
    title: "Others",
    topics: {
      "DevOps": ["Docker", "Kubernetes"],
      "Cloud": ["AWS", "Google Cloud"],
    },
  },
};

export default function TopicsPage() {
  const { category } = useParams();
  const [completed, setCompleted] = useState({});
  const [completedCount, setCompletedCount] = useState(0);
  const totalTasks = Object.keys(topicsData[category]?.topics || {}).reduce(
    (sum, topic) => sum + topicsData[category].topics[topic].length,
    0
  );

  useEffect(() => {
    // Fetch progress from MongoDB
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/goals/${category}`);
        setCompleted(res.data.progress || {});
        setCompletedCount(res.data.completedCount || 0);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [category]);

  const handleCheckbox = (topic, subtopic) => {
    setCompleted((prev) => {
      const newCompleted = {
        ...prev,
        [`${topic}-${subtopic}`]: !prev[`${topic}-${subtopic}`],
      };

      // Calculate completed count
      const newCompletedCount = Object.values(newCompleted).filter(Boolean).length;
      setCompletedCount(newCompletedCount);

      // Save to MongoDB
      axios.post(`http://localhost:5000/api/goals/${category}`, {
        progress: newCompleted,
        completedCount: newCompletedCount,
        totalCount: totalTasks,
      });

      return newCompleted;
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">{topicsData[category]?.title} Topics</h1>
      <p className="text-lg mb-4 font-semibold">
        Completed: {completedCount}/{totalTasks}
      </p>
      <div className="space-y-6">
        {Object.entries(topicsData[category]?.topics || {}).map(([topic, subtopics]) => (
          <div key={topic} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{topic}</h2>
            <ul className="space-y-2">
              {subtopics.map((subtopic) => (
                <li key={subtopic} className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={!!completed[`${topic}-${subtopic}`]}
                    onChange={() => handleCheckbox(topic, subtopic)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">{subtopic}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
