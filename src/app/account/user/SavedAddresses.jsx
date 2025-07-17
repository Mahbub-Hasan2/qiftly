import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { CirclePlus, MoveLeft } from "lucide-react";
import InputField from "@/components/InputField";
import { countries } from "@/data/countries";

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
    addressLabel: "Home",
    defaultAddress: "",
  });

  const [selectedDialCode, setSelectedDialCode] = useState("+974");
  const [selectedAddressLabel, setSelectedAddressLabel] = useState("Home");
  const [defaultAddressChecked, setDefaultAddressChecked] = useState(false);

  const addressLabels = ["Home", "Office", "Other"];

  const handleChange = (e) => {
    setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let defaultAddress;

    if (defaultAddressChecked) {
      defaultAddress = newAddress.addressLabel || null;
    }

    const formData = {
      ...newAddress,
      defaultAddress: defaultAddress ? defaultAddress : null,
    };

    console.log(formData);
    // API request with formData ...
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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 border border-gray-300 rounded-xl shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)] mt-6 py-6 px-4"
      >
        {/* first name + last name */}
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

        {/* phone + address 1 */}
        <div className="flex gap-5">
          <div className="w-full">
            <label className="text-gray-800 font-semibold text-sm mb-2 block">
              Recipient's Phone*
            </label>
            <div className="p-0 flex border border-gray-200 rounded-md">
              <div className="relative w-16 px-2 grid bg-gray-200 rounded-l-md place-items-center">
                <span className="text-sm">{selectedDialCode}</span>
                <select
                  name="country"
                  onChange={(e) => setSelectedDialCode(e.target.value)}
                  className="text-sm font-normal w-full  cursor-pointer  opacity-0 h-full absolute top-0 left-0"
                >
                  {countries.map((country, idx) => (
                    <option
                      key={idx}
                      value={country.dial_code.toLocaleLowerCase()}
                      className="hover:bg-primary"
                    >
                      {country.name} {country.dial_code}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                name="phone"
                onChange={handleChange}
                className="input-field border-0 focus:shadow-none focus:outline-0 font-normal"
              />
            </div>
          </div>
          <InputField
            label="Address 1*"
            type="text"
            name="address1"
            value={newAddress?.address1}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* address 2 + country */}
        <div className="flex gap-5">
          <InputField
            label="Address 2"
            type="text"
            name="address2"
            value={newAddress?.address2}
            onChange={handleChange}
          />
          <div className="w-full">
            <label className="text-gray-800 font-semibold text-sm mb-2 block">
              Country
            </label>
            <select
              name="country"
              onChange={handleChange}
              value={newAddress.country}
              className="input-field text-sm font-normal"
            >
              {countries.map((country, idx) => (
                <option
                  key={idx}
                  value={country.name.toLocaleLowerCase()}
                  className="hover:bg-primary"
                >
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* city */}
        <div className="flex gap-5">
          <InputField
            label="City"
            type="text"
            name="city"
            value={newAddress?.city}
            onChange={handleChange}
          />
          <div className="w-full" />
        </div>

        {/* save address as */}
        <div>
          <span className="text-gray-800 font-semibold text-sm mb-2 block">
            Save address as*
          </span>

          <div className="flex md:items-center flex-col sm:flex-row gap-4">
            <div className="border border-primary rounded-md flex w-fit overflow-hidden">
              {addressLabels.map((label, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setNewAddress((prev) => ({ ...prev, addressLabel: label }));
                    setSelectedAddressLabel(label);
                  }}
                  className={`text-sm px-3 py-1  border-r-primary cursor-pointer ${
                    idx + 1 === addressLabels.length ? "border-0" : "border-r"
                  } ${
                    selectedAddressLabel === label
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
            {selectedAddressLabel === "Other" && (
              <input
                type="text"
                name="addressLabel"
                onChange={handleChange}
                required
                placeholder="Save as"
                className="border border-primary w-fit text-sm px-3 py-1 outline-0 rounded-md"
              />
            )}
          </div>
        </div>

        {/* default address checkbox */}
        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            className="cursor-pointer"
            onChange={(e) => setDefaultAddressChecked(e.target.checked)}
            id="defaultAddress"
          />
          <label
            htmlFor="defaultAddress"
            className="text-gray-700 font-semibold cursor-pointer"
          >
            Set as Default Address
          </label>
        </div>

        <div className="flex items-center gap-5 text-sm md:text-base">
          <button
            onClick={() => onClickBack(false)}
            className="border border-primary text-primary uppercase button-primary bg-transparent flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border-primary font-semibold button-primary uppercase flex-1"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};
