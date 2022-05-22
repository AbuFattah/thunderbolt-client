import { AiOutlineStar as EmptyStarIcon } from "react-icons/ai";
import { AiFillStar as FullStarIcon } from "react-icons/ai";

function Ratings(props) {
  let { rating } = props;
  let stars = [];
  let i = 1;
  while (i <= 5) {
    if (i <= rating) {
      stars.push(
        <FullStarIcon
          key={Math.random().toString()}
          className="inline w-6 h-6 text-orange-300"
        ></FullStarIcon>
      );
    } else {
      stars.push(
        <EmptyStarIcon
          key={Math.random().toString()}
          className="inline w-5 h-5 text-orange-300"
        ></EmptyStarIcon>
      );
    }
    i++;
  }

  return <span {...props}>{stars}</span>;
}

export default Ratings;
