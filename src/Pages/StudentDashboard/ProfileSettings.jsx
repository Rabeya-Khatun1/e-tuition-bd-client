import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { CiEdit } from "react-icons/ci";
import { FaCamera, FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const ProfileSettings = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [openField, setOpenField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    photoURL: ''
  });

  const openEdit = (field) => {
    setOpenField(field);
    setFormData({
      name: user?.displayName || '',
      phoneNumber: user?.phoneNumber || '',
      photoURL: user?.photoURL || '',
    });
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updatedData = {};

    if (openField === "name") {
      updatedData.displayName = formData.name;
    }
    if (openField === "phoneNumber") {
      updatedData.phoneNumber = formData.phoneNumber;
    }
    if (openField === "photoURL") {
      updatedData.photoURL = formData.photoURL;
    }

    axiosSecure.patch(`/users/update/${user?.email}`, updatedData)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          if (openField === "name" || openField === "photoURL") {
            updateUserProfile({
              displayName: updatedData.displayName || user.displayName,
              photoURL: updatedData.photoURL || user.photoURL
            });
          }

          setUser({
            ...user,
            displayName: updatedData.displayName || user.displayName,
            phoneNumber: updatedData.phoneNumber || user.phoneNumber,
            photoURL: updatedData.photoURL || user.photoURL
          });

          toast.success("Profile updated successfully!");
        } else {
          toast.info("No changes were made.");
        }
      })
      .catch(err => {
        toast.error("Failed to update profile!");
        console.error(err);
      });

    setOpenField(null);
  };

  return (
    <div className="min-h-screen  p-4 md:p-6">
      <title>eTuitionBd-Dashboard-ProfileSettings</title>
      <ToastContainer />

      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content">Profile Settings</h1>
          <p className="text-base-content/70 mt-2">Manage your personal information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="card bg-base-100">
          <div className="card-body p-6 md:p-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="Profile"
                      className="object-cover"
                    />
                  </div>
                </div>
                <button
                  onClick={() => openEdit("photoURL")}
                  className="absolute bottom-2 right-2 btn btn-circle btn-sm group-hover:opacity-100 opacity-90 transition-all duration-200"
                >
                  <FaCamera className="text-lg" />
                </button>
              </div>
              
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-base-content">
                  {user?.displayName || "No Name"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 text-base-content/70">
                  <MdEmail className="text-base" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Information Sections */}
            <div className="space-y-4">
              {/* Phone Number Section */}
              <div className="card bg-base-200 border border-base-300 hover:border-primary-500 transition-all duration-300">
                <div className="card-body p-4 md:p-6">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => openEdit("phoneNumber")}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FaPhone className="text-xl text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-base-content/70">Phone Number</p>
                        <p className="text-lg font-semibold text-base-content">
                          {user?.phoneNumber || "Not added"}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-circle hover:bg-primary/10">
                      <CiEdit size={24} className="text-base-content/70 hover:text-primary-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Display Name Section */}
              <div className="card bg-base-200 border border-base-300 hover:border-primary-500 transition-all duration-300">
                <div className="card-body p-4 md:p-6">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => openEdit("name")}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FaUser className="text-xl text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-base-content/70">Display Name</p>
                        <p className="text-lg font-semibold text-base-content">
                          {user?.displayName || "No Name"}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-circle hover:bg-primary/10">
                      <CiEdit size={24} className="text-base-content/70 hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="stat bg-base-300 rounded-xl">
                <div className="stat-title text-base-content/70">Account Status</div>
                <div className="stat-value text-lg text-success">Active</div>
              </div>
              <div className="stat bg-base-300 rounded-xl">
                <div className="stat-title text-base-content/70">Member Since</div>
                <div className="stat-value text-lg">{new Date(user?.metadata?.creationTime).toLocaleDateString() || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {openField && (
          <div className="modal modal-open">
            <div className="modal-box max-w-md">
              <h3 className="text-xl font-bold mb-4 capitalize">
                Update {openField}
              </h3>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text capitalize">{openField}</span>
                </label>
                <input
                  type={openField === "photoURL" ? "url" : "text"}
                  name={openField}
                  className="input input-bordered w-full"
                  value={formData[openField]}
                  onChange={handleOnChange}
                  placeholder={`Enter your ${openField}`}
                />
                {openField === "photoURL" && (
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Enter a valid image URL
                    </span>
                  </label>
                )}
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-error text-white"
                  onClick={() => setOpenField(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setOpenField(null)}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;