import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

const TravelstoryCard = ({
  imgUrl,
  title,
  date,
  story,
  visitedLoaction,
  isFav,
  onFavClick,
}) => {
  return (
    <div>
      <img
        src={imgUrl}
        alt={title}
        className="w-full object-cover rounded-lg"
        onClick={onclick}
      />
    </div>
  );
};

export default TravelstoryCard;
