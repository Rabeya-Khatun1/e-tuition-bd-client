import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const [openField, setOpenField] = useState(null);
  const [editingUserEmail, setEditingUserEmail] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    photoURL: ''
  });


  const handleChangeRole = async (email, newRole) => {
    const res = await axiosSecure.patch(`/users/update/${email}`, { role: newRole });

    if (res.data.modifiedCount > 0) {
      toast.success("Role updated!");
      refetch();
    }
  };



  const handleUpdate = async (email) => {
    const updatedData = {};

    if (openField === "name") updatedData.displayName = formData.name;
    if (openField === "phoneNumber") updatedData.phoneNumber = formData.phoneNumber;
    if (openField === "photoURL") updatedData.photoURL = formData.photoURL;

    const res = await axiosSecure.patch(`/users/update/${email}`, updatedData);

    if (res.data.modifiedCount > 0) {
      toast.success("User updated successfully!");
      refetch();
    }

    setOpenField(null);
  };



  const openEdit = (field, user) => {
    setOpenField(field);
    setEditingUserEmail(user.email);
    setFormData({
      name: user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      photoURL: user.photoURL || '',
    });
  };



const handleDeleteUser= (email)=>{
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {

  axiosSecure.delete(`/users/delete/${email}`)
  .then(res=> {
    if(res.data.deletedCount){
 if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
  refetch()
    }
  })


 
});
}

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">User Management</h3>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{u.displayName}</td>
                <td className="py-4 px-6">{u.email}</td>
                <td className="py-4 px-6">{u.role}</td>
                <td className="py-4 px-6">{u.phoneNumber || 'N/A'}</td>

                <td className="py-4 px-6 space-x-2">

          {/* Change Role  */}
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() =>
                      handleChangeRole(u.email, u.role === "student" ? "tutor" : "student")
                    }
                  >
                    Change Role
                  </button>

                  {/* Update */}
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => openEdit("name", u)}
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteUser(u.email)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>


      {/* Update Modal */}
      {openField && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-3 capitalize">Update {openField}</h3>

            {openField === "name" && (
              <input
                type="text"
                value={formData.name}
                className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            )}

            {openField === "phoneNumber" && (
              <input
                type="text"
                value={formData.phoneNumber}
                className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            )}

            {openField === "photoURL" && (
              <input
                type="text"
                value={formData.photoURL}
                className="border p-2 w-full"
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
              />
            )}

            <div className="flex gap-3 mt-3">
              <button
                className="bg-green-500 text-white px-4 py-1 rounded"
                onClick={() => handleUpdate(editingUserEmail)}
              >
                Save
              </button>

              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={() => setOpenField(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
