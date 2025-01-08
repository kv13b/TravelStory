import {
  MdAdd,
  MdClose,
  MdDeleteOutline,
  MdDragHandle,
  MdUpdate,
} from "react-icons/md";
import DataSelector from "../../../component/input/DataSelector";

function AddEditTravelStories({
  type,
  storyInfo,
  onClose,
  getAllTravelStories,
}) {
  console.log(type);
  const handleAddOrUpdateClick = () => {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "Add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "Add" ? (
              <button
                className="btn-small"
                onClick={() => {
                  handleAddOrUpdateClick;
                }}
              >
                <MdAdd className="text-lg" />
                ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" />
                  UPDATE STORY
                </button>
                <button className="btn-small btn-delete" onClick={onClose}>
                  <MdDeleteOutline className="text-lg" />
                  DELETE
                </button>
              </>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 pt-4">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="A day in a wonderful Place"
        />
      </div>
      <div className="my-3">
        <DataSelector />
      </div>
    </div>
  );
}

export default AddEditTravelStories;
