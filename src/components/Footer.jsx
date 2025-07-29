import { FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import QiftlyLogo from "../assets/images/Qiftly_logo__2_.png"
import Image from "next/image";
import WhatsappButton from "./ui/WhatsappButton";

export default function Footer() {
  return (
    <footer className="bg-[#FFFBF7] text-gray-900 px-6 py-10 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Qiftly Info */}
        <div>
          <Link
            href="/"
          >
            <Image
              src={QiftlyLogo}
              width={120}
              height={40}
              alt="Qiftly Logo"
              priority
              className="mb-2"
            />
          </Link>
          <p className="text-sm">
            Personalized gifts made with love in Qatar. Order mugs, frames,
            Islamic gifts and more. Fast delivery & beautiful packaging!
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
            <FiMail /> Newsletter
          </h3>
          <p className="text-sm font-semibold mb-2 text-secondary">Get 10% instant discount on your first order!</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full text-black rounded-l bg-white outline-0 border border-gray-200"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary text-white px-4 rounded-r cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-extrabold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-md text-gray-400 ">
            <li><a href="#" className="hover:underline hover:text-gray-900">About Us</a></li>
            <li><a href="#" className="hover:underline hover:text-gray-900">Contact</a></li>
            <li><a href="#" className="hover:underline hover:text-gray-900">FAQ</a></li>
            <li><a href="#" className="hover:underline hover:text-gray-900">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-extrabold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-yellow-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Qiftly. All rights reserved.
      </div>

      <WhatsappButton />
    </footer>
  );
}
