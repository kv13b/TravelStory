import { DayPicker } from "react-day-picker";
import moment from "moment";
import { MdClose, MdOutlineDateRange } from "react-icons/md";
import { useState } from "react";

const DataSelector = ({ date, setdate }) => {
  const [OpenDatePicker, setOpenDatePicker] = useState(false);
  return (
    <div>
      <button
        className="inline-flex  items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-200/40 hover:bg-sky-200/70 rounded-px-2 py-2 cursor-pointer w-50"
        style={{ width: "100px" }}
        onClick={() => {}}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>

      <div className="overflow-y-scroll p-5 bg-sky-50/80 relative pt-9">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100 hover:bg-sky-100 absolute top-2 right-2"
          onClick={() => {
            setOpenDatePicker(false);
          }}
        >
          <MdClose className="text-xl text-sky-600" />
        </button>
        <DayPicker captionLayout="dropdown-buttons" mode="single" />
      </div>
    </div>
  );
};

export default DataSelector;
