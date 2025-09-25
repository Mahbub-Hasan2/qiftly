"use client";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter a valid email");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        console.log('datta', res)
        setMessage("Server returned invalid response");
        return;
      }

      if (data.error) {
        setMessage(data.error);
      } else if (data.newsletterSubscriberCreate?.userErrors?.length) {
        setMessage(data.newsletterSubscriberCreate.userErrors[0].message);
      } else {
        setMessage("Subscribed successfully!");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Subscription failed. Try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
        <FiMail /> Newsletter
      </h3>
      <p className="text-sm font-semibold mb-2 text-secondary">
        Get 10% instant discount on your first order!
      </p>
      <form className="flex" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Your email"
          className="p-2 w-full text-black rounded-l bg-white outline-0 border border-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary text-white px-4 rounded-r cursor-pointer"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </div>
  );
}
