import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment/moment";

const TravelstoryCard = ({
  imageUrl,
  title,
  date,
  story,
  visitedLoaction,
  isFav,
  onFavClick,
  onClick,
}) => {
  console.log(visitedLoaction);
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover rounded-lg"
        onClick={onclick}
      />

      <div className="p-4" onClick={onclick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="flex-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-x5 text-slate-600 mt-2">{story?.slice(0, 60)}</p>
        {/* <div className="">
          <GrMapLocation className="text-sm" />
          {visitedLoaction.map((item, index) =>
            visitedLoaction.length == index + 1 ? `${item}` : `${item}`
          )}
        </div> */}
      </div>
    </div>
  );
};

export default TravelstoryCard;
