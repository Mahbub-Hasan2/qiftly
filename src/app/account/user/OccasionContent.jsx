import Image from "next/image";
import SectionHeader from "./SectionHeader";
import icon_bell from "@/assets/icon_bell.svg";
import { useState } from "react";
import Modal from "./Modal";
import InputField from "@/components/InputField";
import { EllipsisVertical } from "lucide-react";

const occasions = [
  {
    name: "Abir Hasan",
    occasion: "Birthday",
    date: "17th july 2025",
    note: "This is note",
  },
  {
    name: "Abir Hasan",
    occasion: "Birthday",
    date: "17th july 2025",
    note: "This is note",
  },
  {
    name: "Abir Hasan",
    occasion: "Birthday",
    date: "17th july 2025",
    note: "This is note",
  },
];

export default function OccasionContent() {
  const [activeModal, setActiveModal] = useState("");
  const [newOccationData, setNewOccationData] = useState({});
  const [selectedOccation, setSelectedOccation] = useState("");

  const handleChange = (e) => {
    setNewOccationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(newOccationData);

    // todo
  };

  return (
    <div className="">
      <div className="flex md:items-center justify-between flex-col md:flex-row">
        <SectionHeader>Your Occassions Ahsanul Haque</SectionHeader>
        <button
          className="button-primary mb-3"
          onClick={() => setActiveModal("add_occation")}
        >
          Add new Occasion
        </button>
      </div>

      {occasions.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {occasions.map((occasion, idx) => (
            <OccationCard key={idx} occasion={occasion}></OccationCard>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <Image
            src={icon_bell}
            alt="No Reminders"
            className="mx-auto w-30 mb-3 select-none"
            draggable={false}
          />
          <h3 className="text-gray-600 font-semibold text-lg">No Reminders</h3>
          <p className="text-md text-gray-400">You Have No Occasion Reminder</p>
        </div>
      )}

      <Modal
        isOpen={activeModal === "add_occation"}
        onClose={() => setActiveModal(null)}
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-5">
            <InputField
              label="Recipient Name"
              placeholder="Recipient Name"
              name="name"
              onChange={handleChange}
            />
            <div className="w-full">
              <label
                htmlFor="occation"
                className="text-gray-800 font-semibold text-sm mb-2 block"
              >
                Occasion
              </label>
              <select
                id="occation"
                className="input-field font-normal"
                name="occation"
                onChange={(e) => {
                  handleChange(e);
                  setSelectedOccation(e.target.value);
                }}
              >
                <option value="">Select an Occation</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>

          {selectedOccation === "other" && (
            <input
              type="text"
              onChange={handleChange}
              name="occation"
              className="input-field"
              placeholder="Other..."
              autoFocus
            />
          )}

          <div className="w-full">
            <label
              htmlFor="date"
              className="text-gray-800 font-semibold text-sm mb-2 block"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              className="input-field"
              name="date"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="note"
              className="text-gray-800 font-semibold text-sm mb-2 block"
            >
              Notes
            </label>
            <textarea
              id="note"
              name="note"
              onChange={handleChange}
              className="input-field"
            ></textarea>
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={() => setActiveModal(null)}
              className="button-primary bg-transparent border border-primary text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary border border-primary px-6"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const OccationCard = ({ occasion }) => {
  return (
    <div className="border border-gray-200 rounded-md">
      <div className="p-3 border-b border-b-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold  uppercase mb-1.5">{occasion.name}</h2>
          <EllipsisVertical
            size={18}
            className="text-gray-600 cursor-pointer hover:text-primary"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <p className="uppercase">{occasion.occasion}</p>-{" "}
          <span>{occasion.date}</span>
        </div>
        <p className="text-sm text-gray-500">{occasion.note}</p>
      </div>
      <button className="text-primary uppercase py-3 px-2.5 font-bold text-center w-full hover:bg-gray-100 cursor-pointer duration-200">
        Schedule Gift
      </button>
    </div>
  );
};
