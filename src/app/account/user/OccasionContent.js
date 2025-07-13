export default function OccasionContent() {
  return (
    <div className="w-full md:w-3/4 p-6">
      <h2 className="text-xl font-semibold text-olive-700 mb-4">
        Your Occassions Munir Uddin Mahbub
      </h2>
      <div className="text-center mt-10">
        <img
          src="https://fnp.qa/images/empty/occasion-reminder.svg"
          alt="No Reminders"
          className="mx-auto w-20 mb-3"
        />
        <h3 className="text-gray-600 font-semibold">No Reminders</h3>
        <p className="text-sm text-gray-400">You Have No Occasion Reminder</p>
        <button className="mt-5 bg-olive-600 text-white px-5 py-2 rounded hover:bg-olive-700">
          Add new Occasion
        </button>
      </div>
    </div>
  );
}
