import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Api/Utils";
import { toast } from "react-hot-toast";

const AddRoom = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [imageText, setImageText] = useState("");

  const { user } = useAuth();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Date range handler

  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const price = form.price.value;
    const total_guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const category = form.category.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    try {
      const image_url = await imageUpload(image);
      // console.log(image_url);

      const roomData = {
        location,
        title,
        price,
        total_guest,
        bedrooms,
        bathrooms,
        description,
        category,
        to,
        from,
        host,
        image: image_url,
      };
      console.log(roomData);
      toast.success("Room has scuccessfully added");
    } catch (error) {
      console.log(error.message);
    }
  };

//  Image preview
const handleImagePreview = (e) =>{
    console.log(e.target.files);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
}

  return (
    <div>
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        handleImagePreview={handleImagePreview}
      />
    </div>
  );
};

export default AddRoom;
