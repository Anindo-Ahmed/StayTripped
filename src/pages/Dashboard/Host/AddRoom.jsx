import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";

const AddRoom = () => {
    const { user } = useAuth()
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

// Date range handler

const handleDates = item => {
    console.log(item)
    setDates(item.selection)
}

// handle form submit
const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target;
    const location = form.location.value
    const title = form.title.value
    const price = form.price.value
    const total_guest = form.total_guest.value
    const bedrooms = form.bedrooms.value
    const bathrooms = form.bathrooms.value
    const description = form.description.value
    const category = form.category.value
    const from = ''
    const to = ''
    const image = form.image.files[0]
    const host = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
    }

    const newRoom = { location, title, price, total_guest, bedrooms, bathrooms, description, category}

    console.log(newRoom);
}





  return (
    <div>
      <AddRoomForm
      dates={ dates }
      handleDates={ handleDates }
      handleSubmit={handleSubmit}/>
    </div>
  );
};

export default AddRoom;
