import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Modal from "./Modal";

export default function PersonalInfo() {
  
  const [activeModal, setActiveModal] = useState(null)

  const profileData = {
    firstName: "Ahsanul",
    lastName: "Haque",
    phone: "01812345678",
    email: "example@email.com",
  };

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
            type="text"
            value={profileData?.email}
            className="input-field text-gray-600"
            disabled
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button onClick={() => setActiveModal("edit-profile")} className="button-primary px-16">Edit</button>
      </div>

      <Modal isOpen={activeModal === "edit-profile"} onClose={() => setActiveModal(null)}>
        Hello Modal
      </Modal>
    </div>
  );
}
