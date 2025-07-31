"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentBillingSection from "@/components/Payment/PaymentBillingSection";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "+974",
    secretIdentity: false,
    newsletter: false,
    callRecipient: false,
    country: "qatar",
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryAddress: "",
    deliveryApartment: "",
    deliveryCity: "Mesaieed",
    deliveryPhone: "+974",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [billingOption, setBillingOption] = useState("same");
  const [billingData, setBillingData] = useState({
    country: "qatar",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // Refs for scroll targeting
  const fieldRefs = {
    email: useRef(null),
    name: useRef(null),
    phone: useRef(null),
    deliveryFirstName: useRef(null),
    deliveryLastName: useRef(null),
    deliveryAddress: useRef(null),
    deliveryPhone: useRef(null),
    billingFirstName: useRef(null),
    billingLastName: useRef(null),
    billingAddress: useRef(null),
    billingPhone: useRef(null),
  };

  const isNotEmpty = (value) => value.trim().length > 1;
  const isValidPhone = (val) => /^\+974\d{8}$/.test(val);
  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (name) {
        case "email":
          if (isValidEmail(newValue)) delete newErrors.email;
          break;
        case "name":
          if (isNotEmpty(newValue)) delete newErrors.name;
          break;
        case "phone":
          if (isValidPhone(newValue)) delete newErrors.phone;
          break;
        case "deliveryFirstName":
          if (isNotEmpty(newValue)) delete newErrors.deliveryFirstName;
          break;
        case "deliveryLastName":
          if (isNotEmpty(newValue)) delete newErrors.deliveryLastName;
          break;
        case "deliveryAddress":
          if (isNotEmpty(newValue)) delete newErrors.deliveryAddress;
          break;
        case "deliveryPhone":
          if (isValidPhone(newValue)) delete newErrors.deliveryPhone;
          break;
        default:
          break;
      }

      return newErrors;
    });
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (name) {
        case "firstName":
          if (isNotEmpty(value)) delete newErrors.billingFirstName;
          break;
        case "lastName":
          if (isNotEmpty(value)) delete newErrors.billingLastName;
          break;
        case "address":
          if (isNotEmpty(value)) delete newErrors.billingAddress;
          break;
        case "phone":
          if (isValidPhone(value)) delete newErrors.billingPhone;
          break;
        default:
          break;
      }

      return newErrors;
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!isValidEmail(formData.email)) newErrors.email = "Email is required";
    if (!isNotEmpty(formData.name)) newErrors.name = "Valid name required";
    if (!isValidPhone(formData.phone)) newErrors.phone = "Valid Qatar phone required";
    if (!isNotEmpty(formData.deliveryFirstName)) newErrors.deliveryFirstName = "First name required";
    if (!isNotEmpty(formData.deliveryLastName)) newErrors.deliveryLastName = "Last name required";
    if (!isNotEmpty(formData.deliveryAddress)) newErrors.deliveryAddress = "Address required";
    if (!isValidPhone(formData.deliveryPhone)) newErrors.deliveryPhone = "Valid delivery phone required";

    if (billingOption === "different") {
      if (!isNotEmpty(billingData.firstName)) newErrors.billingFirstName = "Billing first name required";
      if (!isNotEmpty(billingData.lastName)) newErrors.billingLastName = "Billing last name required";
      if (!isNotEmpty(billingData.address)) newErrors.billingAddress = "Billing address required";
      if (!isValidPhone(billingData.phone)) newErrors.billingPhone = "Valid billing phone required";
    }

    return newErrors;
  };

  const scrollToFirstError = (errorKeys) => {
    for (const key of errorKeys) {
      const ref = fieldRefs[key];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current.focus?.();
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      scrollToFirstError(Object.keys(validationErrors));
      return;
    }

    const payload = {
      ...formData,
      paymentMethod,
      billingOption,
      billingData: billingOption === "different" ? billingData : null,
    };

    console.log("✅ Final Form Data:", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 p-4 max-w-screen-lg mx-auto">
        <div className="lg:col-span-3 space-y-6">
          <Card className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Sender Details</h2>
            <Input ref={fieldRefs.email} label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Checkbox label="Email me with news and offers" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
            <Checkbox label="Keep my identity secret" name="secretIdentity" checked={formData.secretIdentity} onChange={handleChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input ref={fieldRefs.name} label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
              <Input ref={fieldRefs.phone} label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
            </div>
          </Card>

          <Card className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Delivery</h2>
            <Checkbox label="Call Recipient to Get Address" name="callRecipient" checked={formData.callRecipient} onChange={handleChange} />
            <div>
              <label className="text-sm mb-1 block">Country/Region</label>
              <select name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 rounded p-2 text-sm">
                <option value="qatar">Qatar</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input ref={fieldRefs.deliveryFirstName} label="First Name" name="deliveryFirstName" value={formData.deliveryFirstName} onChange={handleChange} error={errors.deliveryFirstName} />
              <Input ref={fieldRefs.deliveryLastName} label="Last Name" name="deliveryLastName" value={formData.deliveryLastName} onChange={handleChange} error={errors.deliveryLastName} />
            </div>
            <Input ref={fieldRefs.deliveryAddress} label="Address" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} error={errors.deliveryAddress} />
            <Input label="Apartment, suite, etc." name="deliveryApartment" value={formData.deliveryApartment} onChange={handleChange} />
            <Input label="City" name="deliveryCity" value={formData.deliveryCity} onChange={handleChange} />
            <Input ref={fieldRefs.deliveryPhone} label="Phone" name="deliveryPhone" value={formData.deliveryPhone} onChange={handleChange} error={errors.deliveryPhone} />
            <Checkbox label="Save this information for next time" name="saveInfo" checked={formData.saveInfo} onChange={handleChange} />
          </Card>

          <PaymentBillingSection
            billingOption={billingOption}
            setBillingOption={setBillingOption}
            billingData={billingData}
            setBillingData={setBillingData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            errors={errors}
            handleBillingChange={handleBillingChange}
            fieldRefs={fieldRefs}
          />
        </div>

        <div className="lg:col-span-2 bg-[#FFFBF7] border border-gray-100 rounded-xl">
          <OrderSummary />
          <div className="p-4">
            <Button type="submit" className="w-full">
              {paymentMethod === "card" ? "Pay Now" : "Complete Order"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
