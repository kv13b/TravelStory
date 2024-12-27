import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

const TravelstoryCard = ({
  imageUrl,
  title,
  date,
  story,
  visitedLoaction,
  isFav,
  onFavClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover rounded-lg"
        onClick={onclick}
      />
    </div>
  );
};

export default TravelstoryCard;
