import { useEffect, useState } from "react";
import { getAllGroups } from "../services/api";
import Spinner from "../components/Spinner";

function UserGroups() {
  const groups = [
    {
      _id: "group_id_1",
      name: "Tech Enthusiasts",
      description: "A group for tech lovers",
      createdBy: "user_id_1",
    },
    {
      _id: "group_id_2",
      name: "Book Lovers",
      description: "A group for book enthusiasts",
      createdBy: "user_id_2",
    },
    {
      _id: "group_id_3",
      name: "Art Aficionados",
      description: "A community for art lovers",
      createdBy: "user_id_3",
    },
  ];
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getAllGroups();
      const data = response.data;
      console.log(data);

      setGroupData(data);
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (groupData.length < 1)
    return (
      <section className="w-full h-full flex justify-center items-center">
        <div className="bg-white shadow-lg py-20 px-10 text-3xl rounded-xl">
          There are no groups available{" "}
        </div>
      </section>
    );
  const handleJoin = (groupId) => {
    console.log(`Joining group with ID: ${groupId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Groups</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group._id}
            className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">{group.name}</h3>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleJoin(group._id)}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserGroups;
