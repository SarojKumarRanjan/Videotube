import SingleVideo from "../components/Video/Singlevideo";
import RecomendedVideo from "../components/Video/RecomendedVideo";

function SinglevideoPage() {
  return (
    <div className="container mx-auto lg:mx-4 px-4 py-8 flex flex-col lg:flex-row gap-8">
      <SingleVideo />
      
      <RecomendedVideo />
    </div>
  );
}

export default SinglevideoPage;
