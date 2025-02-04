import { Cookie } from "mee-components";

export function checkUser(authPages?: boolean, signUpSoonPage?: boolean) {
  const signUpAvailable = Cookie.getCookie("sign-up-available");
  if (!signUpAvailable && !signUpSoonPage) {
    window.location.hash = "sign-up-soon";
    return false;
  } else if (signUpAvailable && signUpSoonPage) {
    window.location.hash = "sign-in";
    return false;
  }

  if (signUpSoonPage) {
    return false;
  }

  const user = Cookie.getCookie("user");
  if (!authPages && !user) {
    window.location.hash = "sign-in";
    return false;
  } else if (authPages === true && !!user) {
    window.location.hash = "connections";
    return false;
  }

  return true;
}
