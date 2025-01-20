import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/input/Navbar";
import { useEffect, useState } from "react";
import axiosinstance from "../../../utils/axiosinstance";
import TravelstoryCard from "../../../component/input/cards/TravelstoryCard";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import AddEditTravelStories from "./AddEditTravelStories";
import ViewTravelStory from "./ViewTravelStory";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allstories, setAllStories] = useState([]);

  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });
  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosinstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  //get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosinstance.get("/get-travel-story");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("an unexpected error occured" + error);
    }
  };

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  const UpdateIsFav = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosinstance.put("/edit-isfav/" + storyId, {
        isFavourite: !storyData.isFavourite,
      });
      console.log(response);
      if (response.data && response.data.story) {
        toast.success("Story Updated successfully");
        getAllTravelStories();
      }
    } catch (error) {
      console.log("an unexpected error occured" + error);
    }
  };

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="cotainer mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allstories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allstories.map((item) => {
                  return (
                    <TravelstoryCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.createdOn}
                      visitedLocation={item.visitedLocation}
                      isFavorite={item.isFavourite}
                      // onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavoriteClick={() => UpdateIsFav(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <>Empty card here</>
            )}
            <div className="w-[320px]"></div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStories
          type={openAddEditModel.type}
          storyInfo={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>
      {/* view travel story */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          type={openViewModal.type}
          storyInfo={openViewModal.data || null}
        />
      </Modal>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModel({ isShown: true, type: "Add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <ToastContainer />
    </>
  );
};

export default Home;
