import axios from "axios";

export function Verify(props) {
  try {
    const token = window.location.pathname.split("/")[2];
    if (token) {
      makeAPICall(token);
      // wait 5 seconds then redirect
      setTimeout(function () {
        window.location.href =
          "https://blkchn-trxn-verif.herokuapp.com/api/login";
      }, 1000);
    } else {
      console.log("token is not here");
    }
  } catch (error) {}
}
async function makeAPICall(token) {
  try {
    await axios.put("/api/verify", { token: token });
  } catch (error) {
    console.log("error", error);
  }
}
