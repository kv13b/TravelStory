import {
  MdAdd,
  MdClose,
  MdDeleteOutline,
  MdDragHandle,
  MdUpdate,
} from "react-icons/md";
import DataSelector from "../../../component/input/DataSelector";
import { useState } from "react";
import ImageSelector from "../../../component/input/ImageSelector";
import TagInput from "../../../component/input/TagInput";
import axiosinstance from "../../../utils/axiosinstance";
import moment from "moment";
import { toast } from "react-toastify";
import UploadImage from "../../../utils/UploadImage";

function AddEditTravelStories({
  type,
  storyInfo,
  onClose,
  getAllTravelStories,
}) {
  const [title, setTitle] = useState("");
  const [storyImg, setStoryImg] = useState(null);
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [visitedDate, setVisitedDate] = useState(null);
  const [error, setError] = useState("");
  console.log(type);

  const UpdateTravelStory = async () => {};

  const AddNewTravelStory = async () => {
    try {
      let imageurl = "";
      if (storyImg) {
        const imgupload = await UploadImage(storyImg);
        imageurl = imgupload.imageurl || "";
      }

      const response = await axiosinstance.post("/add-travel-story", {
        title,
        story,
        imageUrl: imageurl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });
      if (response.data && response.data.story) {
        toast.success("Story added successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddOrUpdateClick = () => {
    console.log(title);
    console.log(story);
    console.log("data", { title, story });
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!story) {
      setError("Please enter the story");
      return;
    }
    setError("");
    if (type === "Add") {
      AddNewTravelStory();
    } else {
      UpdateTravelStory();
    }
  };

  const handleDeleteImage = () => {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "Add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "Add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
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
          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 pt-4">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="A day in a wonderful Place"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="my-3">
        <DataSelector date={visitedDate} setdate={setVisitedDate} />
      </div>

      <ImageSelector
        image={storyImg}
        setimage={setStoryImg}
        handleDeleteImage={handleDeleteImage}
      />
      <div className="flex flex-col  gap-2 mt-4">
        <label className="input-label">STORY</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Your Story"
          rows={10}
          value={story}
          onChange={({ target }) => setStory(target.value)}
        />
      </div>
      <div className="pt-3">
        <label className="input-label">VISITED LOCATION</label>
        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
      </div>
    </div>
  );
}

export default AddEditTravelStories;
