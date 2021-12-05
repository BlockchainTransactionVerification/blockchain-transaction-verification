import { BASE_URL } from "../constants/URLConstant";
import axios from "axios";

export async function Verify(props) {
  try {
    const token = props.match.params.id;

    if (token) {
      await axios
        .post("api/verify", {
          token: token,
        })
        .then(() => {
          setTimeout(function () {
            window.location.href = BASE_URL;
          }, 20000);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(function () {
            window.location.href = BASE_URL;
          }, 20000);
          window.location.href = BASE_URL;
        });
    } else {
      console.log("token is not here");
    }
  } catch (error) {}
}
