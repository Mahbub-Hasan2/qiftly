import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { CirclePlus, MoveLeft } from "lucide-react";
import InputField from "@/components/InputField";

export default function SavedAddresses() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  return !isAddingNew ? (
    <div>
      <div className="flex md:items-center flex-col gap-2 md:flex-row justify-between">
        <SectionHeader>My Saved Addresses</SectionHeader>
        <button
          onClick={() => setIsAddingNew(true)}
          className="button-primary py-2.5"
        >
          <CirclePlus />
          Add New Address
        </button>
      </div>

      <p className="text-gray-400 mt-5">0 address</p>
      <h3 className="mt-5 text-gray-600 text-center">
        You have no addresses saved. Please add an address.
      </h3>
    </div>
  ) : (
    <NewAddressForm onClickBack={setIsAddingNew} />
  );
}

const NewAddressForm = ({ onClickBack }) => {
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    addressLabel: "",
    defaultAddress: "",
  });

  const handleChange = (e) => {
    setNewAddress((prev) => ({ ...prev, [e.taget.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newAddress);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onClickBack(false)}
          className="button-primary py-2.5 px-8"
        >
          <MoveLeft />
        </button>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary md:text-black">
          Add New Address
        </h2>
      </div>

      <form className="flex flex-col gap-5 border border-gray-300 rounded-xl shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)] mt-6 py-6 px-4">
        <div className="flex gap-5">
          <InputField
            label="Recipient's First Name*"
            type="text"
            name="firstName"
            value={newAddress?.firstName}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Recipient's Last Name*"
            type="text"
            name="lastName"
            value={newAddress?.lastName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="flex gap-5">
          <InputField
            label="Recipient's Phone*"
            type="text"
            name="firstName"
            value={newAddress?.firstName}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Address 1*"
            type="text"
            name="lastName"
            value={newAddress?.lastName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="flex gap-5">
          <InputField
            label="Address 2"
            type="text"
            name="firstName"
            value={newAddress?.firstName}
            onChange={handleChange}
          />
          <InputField
            label="Country"
            type="text"
            name="lastName"
            value={newAddress?.lastName}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};
