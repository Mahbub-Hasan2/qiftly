export default function UserSidebar({ active = "My Occassions" }) {
  const menuItems = [
    "Personal Information",
    "My Orders",
    "Saved Addresses",
    "My Occassions",
    "Logout",
    "Delete Account",
  ];

  return (
    <div className="w-full md:w-1/4 border-r border-gray-200">
      <div className="bg-olive-600 text-white rounded-t-xl py-4 px-4">
        <h2 className="font-bold">Hey Munir Uddin Mahbub</h2>
      </div>
      <ul className="bg-white">
        {menuItems.map((item) => (
          <li
            key={item}
            className={`py-3 px-5 text-sm border-b hover:bg-gray-50 cursor-pointer ${
              active === item ? "text-olive-700 font-semibold" : "text-gray-600"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
