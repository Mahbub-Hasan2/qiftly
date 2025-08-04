"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmailVerificationForm from "./EmailVerificationForm";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.includes("@")) errs.email = "Enter a valid email";
    if (formData.password.length < 6) errs.password = "Minimum 6 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowVerification(true);
    } else {
      const firstError = Object.keys(validationErrors)[0];
      inputRefs[firstError]?.current?.focus();
    }
  };

  const handleVerified = async () => {
    try {
      const res = await fetch("/api/create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.customer?.id) {
        setSubmitted(true);
        setShowVerification(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setErrors({ email: data?.error || "Account creation failed" });
      }
    } catch (err) {
      setErrors({ email: "Server error. Try again later." });
    }
  };

  if (showVerification) {
    return (
      <EmailVerificationForm
        email={formData.email}
        onVerified={handleVerified}
      />
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md p-6 md:p-12 rounded-xl shadow-md bg-white">
        <h2 className="text-xl font-semibold text-center mb-6">
          Create your Qiftly account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstName", "lastName", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <Input
                ref={inputRefs[field]}
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={formData[field]}
                onChange={handleChange}
                className={errors[field] ? "border-red-500" : ""}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>

        {submitted && (
          <p className="text-green-600 text-center mt-3">
            ✅ Account created successfully!
          </p>
        )}
      </div>
    </div>
  );
}
