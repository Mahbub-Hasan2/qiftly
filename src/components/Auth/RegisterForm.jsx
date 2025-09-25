// src/components/Auth/RegisterForm.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmailVerificationForm from "./EmailVerificationForm";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ firstName:"", lastName:"", email:"", password:"", confirmPassword:"" });
  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const otpSentRef = useRef(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    if(errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  }

  const validate = () => {
    const errs = {};
    if(!formData.firstName.trim()) errs.firstName="First name required";
    if(!formData.lastName.trim()) errs.lastName="Last name required";
    if(!formData.email.includes("@")) errs.email="Enter valid email";
    if(formData.password.length<6) errs.password="Minimum 6 chars";
    if(formData.password !== formData.confirmPassword) errs.confirmPassword="Passwords do not match";
    return errs;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length===0) setShowVerification(true);
  }

  const handleVerified = async () => {
    try{
      const res = await fetch("/api/register", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(formData)});
      const data = await res.json();
      console.log('registrd data= ', data) // {customer: {…}}customer: email: "alubuluqatar@gmail.com"id: "gid://shopify/Customer/8752101884161"[[Prototype]]: Object[[Prototype]]: Object
      if(res.ok) {
        setSubmitted(true);
        setShowVerification(false);
        setFormData({ firstName:"", lastName:"", email:"", password:"", confirmPassword:"" });
        otpSentRef.current = false; // reset for next time
      } else setErrors({ email: data.error || "Registration failed" });
    } catch(err){ setErrors({ email:"Server error" }); }
  }

  // When showVerification toggles true — send OTP (only once)
  useEffect(() => {
    if (showVerification && formData.email && !otpSentRef.current) {
      (async () => {
        try {
          const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });
          const data = await res.json();
          console.log("OTP send response:", data);
          otpSentRef.current = true;
        } catch (err) {
          console.error("Error sending OTP from RegisterForm:", err);
        }
      })();
    }
  }, [showVerification, formData.email]);

  if (showVerification) return <EmailVerificationForm errors={errors} email={formData.email} onVerified={handleVerified} />

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      {["firstName","lastName","email","password","confirmPassword"].map((field)=>(
        <div key={field} className="mb-3">
          <Input type={field.includes("password")?"password":"text"} name={field} placeholder={field} value={formData[field]} onChange={handleChange} />
          {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
        </div>
      ))}
      <Button type="submit" className="w-full">Continue</Button>
      {submitted && <p className="text-green-600 mt-2">Account created successfully!</p>}
    </form>
  );
}
