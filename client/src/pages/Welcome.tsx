

import DisplayVideo from "../components/Video/DisplayVideo";
import { videos } from "../constant";


function Welcome() {
  return (
    <div>
      <DisplayVideo videos={videos}/>
    </div>
  );
}

export default Welcome;
