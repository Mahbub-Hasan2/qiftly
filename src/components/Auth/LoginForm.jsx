"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
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
    setServerError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.includes("@")) errs.email = "Enter a valid email";
    if (!formData.password || formData.password.length < 6)
      errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch("/api/login-customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok && data?.success) {
          setSubmitted(true);
          setFormData({ email: "", password: "" });
        } else {
          setServerError(data?.error || "Login failed. Please try again.");
        }
      } catch (err) {
        setServerError("Server error. Try again later.");
      }
    } else {
      const firstError = Object.keys(validationErrors)[0];
      inputRefs[firstError]?.current?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md p-6 md:p-12 rounded-xl shadow-md bg-white">
        <h2 className="text-xl font-semibold text-center mb-6">
          Login to your Qiftly account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((field) => (
            <div key={field}>
              <Input
                ref={inputRefs[field]}
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
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
            Login
          </Button>

          {serverError && (
            <p className="text-red-600 text-center mt-3">{serverError}</p>
          )}

          {submitted && (
            <p className="text-green-600 text-center mt-3">
              ✅ Logged in successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
