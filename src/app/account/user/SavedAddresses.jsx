import React, { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { CirclePlus, MoveLeft, SquarePen, Trash2 } from "lucide-react";
import InputField from "@/components/InputField";
import { countries } from "@/data/countries";

const savedAddressesData = [
  {
    firstName: "Abir",
    lastName: "Hasan",
    phone: "+8801829328493",
    address1: "Dhaka, Bangladesh",
    address2: "Fulbaria, Mymensingh",
    country: "Bangladesh",
    city: "Mymensingh",
    addressLabel: "Home",
    defaultAddress: true,
  },
  {
    firstName: "Takrim",
    lastName: "Hasan",
    phone: "+8801829328345",
    address1: "Comilla",
    address2: "Branmanpara, Comilla",
    country: "Bangladesh",
    city: "Comilla",
    addressLabel: "Office",
    defaultAddress: false,
  },
  {
    firstName: "Junayet",
    lastName: "Hasan",
    phone: "+8801829328345",
    address1: "Rajshahi",
    address2: "Branmanpara, Rajshahi",
    country: "Bangladesh",
    city: "Rajshahi",
    addressLabel: "Dokan",
    defaultAddress: false,
  },
];

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState(savedAddressesData || []);
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

      <p className="text-gray-400 mt-5">{addresses.length > 0 ? addresses.length : 0} {addresses.length > 1 ? "addresses" : "address"}</p>
      {addresses.length > 0 ? (
        <div className="mt-8 flex flex-col gap-6">
          {addresses.map((address, idx) => (
            <AddressCard key={idx} address={address} />
          ))}
        </div>
      ) : (
        <h3 className="mt-5 text-gray-600 text-center">
          You have no addresses saved. Please add an address.
        </h3>
      )}
    </div>
  ) : (
    <AddressForm onClickBack={setIsAddingNew} />
  );
}

const AddressForm = ({ onClickBack, addressData, isEditing }) => {
  const [newAddress, setNewAddress] = useState(addressData || {
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

    if (isEditing) {
      // API request for updating ...
    }else{
      // API request for new ...
    }
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
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-5 border border-gray-300 rounded-xl shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)] mt-6 ${isEditing ? "px-0 py-0 border-0 shadow-none" : "py-6 px-4"}`}
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
                value={addressData.phone}
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
            defaultChecked={addressData.defaultAddress}
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
            {isEditing ? "Update" : "Save"} Address
          </button>
        </div>
      </form>
    </div>
  );
};

const AddressCard = ({ address }) => {

  const {firstName, lastName, phone, address1, address2, country, city, addressLabel, defaultAddress} = address;
  const [addressIcon, setAddressIcon] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  // set address label icon
  useEffect(() => {
    switch (addressLabel) {
      case "Home":
        setAddressIcon("🏠")
        break;
      case "Office":
        setAddressIcon("🏢")
        break;
    
      default:
        setAddressIcon("📍")
        break;
    }
  }, [])

  return (
    <div className="border border-gray-300 rounded-xl shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)] p-5">
      <div className="border-b pb-5 border-b-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="text font-semibold">{addressIcon} {addressLabel}</h2>
          {defaultAddress && <span className="text-[9px] px-2 py-1.5 rounded-full bg-amber-500/50">Default Address</span>}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsEditing(prev => !prev)} className="text-gray-600 hover:scale-105 duration-200 cursor-pointer"><SquarePen size={17}/></button>
          <button className="text-red-400 hover:scale-105 duration-200 cursor-pointer"><Trash2 size={17}/></button>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
        <p className="text-sm text-gray-500">{address1}</p>
        <p className="text-sm text-gray-500">{address2}</p>
        <p className="text-sm text-gray-500">{city}, {country}</p>
        <p className="font-semibold text-sm text-gray-500">Mobile: {phone}</p>
      </div>

        {isEditing && <div className="border-t border-t-gray-200 pt-5 mt-5"><AddressForm isEditing={true} onClickBack={() => setIsEditing(false)} addressData={address} /></div>}


    </div>
  );
};
