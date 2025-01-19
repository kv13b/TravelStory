import axiosinstance from "./axiosinstance";

const UploadImage = async (imageFile) => {
  const formdata = new FormData();

  formdata.append("image", imageFile);
  try {
    const response = await axiosinstance.post("/image-upload", formdata, {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error Uploading the file", error);
    throw error;
  }
};

export default UploadImage;
