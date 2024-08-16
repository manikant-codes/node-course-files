import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../services/apiServices";
import UserList from "../components/UserList";

function Home() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data.data);
    });
  }, []);

  function handleDelete(id) {
    const userInput = window.confirm("Are you sure?");
    if (userInput) {
      deleteUser(id).then((data) => {
        console.log(data);
        getAllUsers().then((data) => {
          setUsers(data.data);
        });
      });
    }
  }

  if (!users) return null;

  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => {
        return (
          <UserList key={user._id} user={user} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
}

export default Home;