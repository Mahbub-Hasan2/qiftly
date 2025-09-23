"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddress } from "../contexts/AddressContext";
  
const FieldWrapper = ({ name, fieldRefs, children }) => {
  return (
    <div
      ref={(el) => {
        if (el && !fieldRefs.current[name]) {
          fieldRefs.current[name] = el;
        }
      }}
    >
      {children}
    </div>
  );
};

export default function AddressForm({onNext}) {
  const { addAddress } = useAddress();
  const fieldRefs = useRef({});
  

  const [formData, setFormData] = useState({
    city: "",
    addressType: "Office",
    Building: "",
    company: "",
    apartmentNumber: "",
    floor: "",
    street: "",
    phone: "",
    directions: "",
    label: "",
  });




  const [errors, setErrors] = useState({});

  const isNotEmpty = (val) => val.trim().length > 1;
  const isValidFloor = (val) => val.trim().length > 0;
  const isValidPhone = (val) => /^\+?[0-9]{7,15}$/.test(val.trim());

  const validate = () => {
    const newErrors = {};
    if (!isNotEmpty(formData.city)) newErrors.city = "city is required";
    if (!isNotEmpty(formData.Building)) newErrors.Building = "Building name is required";

    if (formData.addressType === "Office") {
      if (!isNotEmpty(formData.company)) newErrors.company = "Company is required";
      if (!isNotEmpty(formData.floor)) newErrors.floor = "Floor is required";
    } else if (formData.addressType === "Apartment") {
      if (!isValidFloor(formData.apartmentNumber)) newErrors.apartmentNumber = "Apartment number is required";
      if (!isValidFloor(formData.floor)) newErrors.floor = "Floor is required";
    }

    if (!isNotEmpty(formData.street)) newErrors.street = "Street is required";
    if (!isValidPhone(formData.phone)) newErrors.phone = "Valid phone number is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      addressType: type,
      company: "",
      floor: "",
      apartmentNumber: "",
    }));
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      fieldRefs.current[firstErrorKey]?.scrollIntoView({ behavior: "smooth", block: "center" });
      fieldRefs.current[firstErrorKey]?.focus();
      return;
    }

    const payload = { ...formData };
    addAddress(payload);
     onNext(); 
  };



  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto md:p-4 space-y-4 bg-white rounded-xl">
      <h2 className="text-xl font-semibold">New Address</h2>

      <FieldWrapper name="city" fieldRefs={fieldRefs}>
        <label className="block text-sm">Area</label>
        <Input name="city" value={formData.area} onChange={handleChange} placeholder="Al Rayyan" />
        {errors.area && <p className="text-sm text-red-500 mt-1">{errors.area}</p>}
      </FieldWrapper>

      <div className="flex gap-2">
        {["Apartment", "House", "Office"].map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`flex-1 border rounded px-2 py-1 text-sm ${formData.addressType === type ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <FieldWrapper name="Building" fieldRefs={fieldRefs}>
        <Input name="Building" value={formData.Building} onChange={handleChange} label="Building Number" />
        {errors.Building && <p className="text-sm text-red-500 mt-1">{errors.Building}</p>}
      </FieldWrapper>

      {formData.addressType === "Office" && (
        <div className="grid grid-cols-2 gap-2">
          <FieldWrapper name="company" fieldRefs={fieldRefs}>
            <Input name="company" value={formData.company} onChange={handleChange} label="Company" />
            {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company}</p>}
          </FieldWrapper>
          <FieldWrapper name="floor" fieldRefs={fieldRefs}>
            <Input name="floor" value={formData.floor} onChange={handleChange} label="Floor" />
            {errors.floor && <p className="text-sm text-red-500 mt-1">{errors.floor}</p>}
          </FieldWrapper>
        </div>
      )}

      {formData.addressType === "Apartment" && (
        <div className="grid grid-cols-2 gap-2">
          <FieldWrapper name="apartmentNumber" fieldRefs={fieldRefs}>
            <Input name="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} label="Apartment Number" />
            {errors.apartmentNumber && <p className="text-sm text-red-500 mt-1">{errors.apartmentNumber}</p>}
          </FieldWrapper>
          <FieldWrapper name="floor" fieldRefs={fieldRefs}>
            <Input name="floor" value={formData.floor} onChange={handleChange} label="Floor" />
            {errors.floor && <p className="text-sm text-red-500 mt-1">{errors.floor}</p>}
          </FieldWrapper>
        </div>
      )}

      <FieldWrapper name="street" fieldRefs={fieldRefs}>
        <Input name="street" value={formData.street} onChange={handleChange} label="Street" />
        {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
      </FieldWrapper>

      <FieldWrapper name="phone" fieldRefs={fieldRefs}>
        <Input name="phone" value={formData.phone} onChange={handleChange} label="Phone number" type="tel" />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
      </FieldWrapper>

      <Input name="directions" value={formData.directions} onChange={handleChange} label="Additional directions (optional)" />
      <Input name="label" value={formData.label} onChange={handleChange} label="Address label (optional)" />

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
        Save address
      </Button>
    </form>
  );
}
