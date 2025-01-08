import { DayPicker } from "react-day-picker";
import moment from "moment";
import { MdOutlineDateRange } from "react-icons/md";

const DataSelector = ({ date, setdate }) => {
  return (
    <div>
      <button
        className="inline-flex  items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-200/40 hover:bg-sky-200/70 rounded-px-2 py-1 cursor-pointer"
        onClick={() => {}}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>
    </div>
  );
};

export default DataSelector;
