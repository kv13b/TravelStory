import axiosinstance from "./axiosinstance";

const UploadImage = async (imageFile) => {
  const formdata = new FormData();

  formdata.append("image", imageFile);
  try {
    const response = await axiosinstance.post("/image-upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error Uploading the file", error);
    if (error.response) {
      console.log("Server responded with:", error.response.data);
    }
    throw error;
  }
};

export default UploadImage;
