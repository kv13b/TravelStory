import { MdAdd } from "react-icons/md";

function AddEditTravelStories({
  type,
  storyInfo,
  setOpenAddEditModel,
  getAllTravelStories,
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
      </div>

      <div className="">
        <button className="btn-small" onClick={() => {}}>
          <MdAdd className="text-lg">ADD STORY</MdAdd>
        </button>
      </div>
    </div>
  );
}

export default AddEditTravelStories;
