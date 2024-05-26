import PropTypes from "prop-types";
import queryString from 'query-string';
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams();

  const category = params.get('category')
 
  const naviagte = useNavigate()
  const handleClick = () => {
    let currentQuery = { category: label}

    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery,
    })
    //  console.log(url)
    naviagte(url)
  }

  return (
    <div
    onClick={()=>handleClick()}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer 
  ${category === label && `border-b-neutral-700 text-neutral-600`}`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
