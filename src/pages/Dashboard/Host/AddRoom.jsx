import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Api/Utils";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [imageText, setImageText] = useState("Upload Image");
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user} = useAuth();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post('/room', roomData);
      // console.log(data);
      return data;
    },
    onSuccess: () => {
      console.log("Data saved sucessfully");
      toast.success("Room added scuccessfully");
      navigate('/dashboard/my-listings');
      setLoading(false);
    }
  })

  // Date range handler
  const handleDates = (item) => {
    // console.log(item);
    setDates(item.selection);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    setLoading(true);
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
      // console.log(roomData);
      
      // Post a room data in db
      await mutateAsync(roomData);

      // reset form
      e.target.reset()

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

//  Image preview
const handleImagePreview = (image) =>{
    // console.log(image);
    setImagePreview(URL.createObjectURL(image));
    if(image.name.length > 20){
        const shortenName =  image.name.substr(0, 11) + '...' + image.name.substr(-11);
        // console.log(shortenName); 
        setImageText(shortenName)
    } else{
      setImageText(image.name)
    }  
}

  return (
    <div>
        <Helmet>
            <title>Add room | Dashboard</title>
        </Helmet>
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        handleImagePreview={handleImagePreview}
        imageText={imageText}
        loading= {loading}
      />
    </div>
  );
};

export default AddRoom;
