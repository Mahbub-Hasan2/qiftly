import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Modal from "./Modal";

const data = {
    firstName: "Ahsanul",
    lastName: "Haque",
    phone: "1812345678",
    email: "example@email.com",
  }

export default function PersonalInfo() {
  const [activeModal, setActiveModal] = useState(null);

  const [profileData, setProfileData] = useState(data);


const handleChange = (e) => {
  setProfileData(prev => ({...prev, [e.target.name] : e.target.value}))
}


  const handleUpdateUser = (e) => {
    e.preventDefault();
    console.log(profileData)
    // TODO
  }

  return (
    <div>
      <SectionHeader>Profile Details</SectionHeader>

      {/* Profile Data */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">First Name</label>
          <input
            type="text"
            value={profileData?.firstName}
            className="input-field text-gray-600"
            disabled
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Last Name</label>
          <input
            type="text"
            value={profileData?.lastName}
            className="input-field text-gray-600"
            disabled
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Phone</label>
          <input
            type="text"
            value={profileData?.phone}
            className="input-field text-gray-600"
            disabled
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            value={profileData?.email}
            className="input-field text-gray-600"
            disabled
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => setActiveModal("edit-profile")}
          className="button-primary px-16"
        >
          Edit
        </button>
      </div>

      <Modal
        isOpen={activeModal === "edit-profile"}
        onClose={() => setActiveModal(null)}
        className="max-w-xl"
      >
        <h2 className="text-xl mb-6 font-semibold">Update your profile</h2>
        <form>

          {/* name */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-gray-800 font-semibold text-sm mb-2 block">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                defaultValue={profileData.firstName}
                className="input-field text-gray-600"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-800 font-semibold text-sm mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                defaultValue={profileData.lastName}
                className="input-field text-gray-600"
              />
            </div>
          </div>

          {/* phone */}
          <div className="w-full my-5">
            <label className="text-gray-800 font-semibold text-sm mb-2 block">
              Phone
            </label>
            <div className="border rounded-lg border-gray-200/40 p-0 flex gap-5 pl-3">
              <div className="flex items-center gap-1 text-gray-400">
                <img
                  src="https://flagcdn.com/16x12/qa.png"
                  width="16"
                  height="12"
                  alt="Qatar"
                />
                <select disabled>
                  <option value="">+974</option>
                </select>
              </div>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                defaultValue={profileData.phone}
                className="input-field text-gray-600 border-0"
              />
            </div>
          </div>

{/* email */}
          <div className="flex-1">
            <label className="text-gray-800 font-semibold text-sm mb-2 block">
             Email Address
            </label>
            <input
              type="email"
              defaultValue={profileData.email}
              name="email"
              onChange={handleChange}
              disabled
              className="input-field"
            />
          </div>

          <div className="mt-5 flex justify-end items-center gap-5">
            <button onClick={() => setActiveModal(null)} className="button-primary bg-transparent text-primary border border-gray-400 rounded-lg">
              Cancel
            </button>
            <button onClick={handleUpdateUser} className="button-primary border border-primary rounded-lg px-6">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
