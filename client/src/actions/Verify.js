import axios from "axios";

export async function Verify(props) {
  try {
    const token = props.match.params.id;

    if (token) {
      await axios
        .post("https://blkchn-trxn-verif.herokuapp.com/api/verify", {
          token: token,
        })
        .then(() => {
          setTimeout(function () {
            window.location.href = "https://blkchn-trxn-verif.herokuapp.com/";
          }, 20000);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(function () {
            window.location.href = "https://blkchn-trxn-verif.herokuapp.com/";
          }, 20000);
          window.location.href = "https://blkchn-trxn-verif.herokuapp.com/";
        });
    } else {
      console.log("token is not here");
    }
  } catch (error) {}
}
