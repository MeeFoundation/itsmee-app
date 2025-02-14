import config from "@config";
import { getUserData, subscribeUserData } from "@store/UserStore";
import type { User } from "@utils/types";
import { AvatarHelper, Cookie } from "mee-components";

export default function initProfileModal() {
  const profileModal = document.getElementById("profile-modal");
  const profileName = document.getElementById("profile-name");
  const openProfileModal = document.getElementById("open-profile-modal");
  const signOutButton = document.getElementById("sign-out");
  let isProfileModalOpened = false;
  const toggleProfile = () => {
    if (isProfileModalOpened) {
      openProfileModal && delete openProfileModal.dataset.active;

      profileModal?.classList.remove("flex");
      profileModal?.classList.add("hidden");
    } else {
      openProfileModal && (openProfileModal.dataset.active = "true");
      profileModal?.classList.remove("hidden");
      profileModal?.classList.add("flex");
    }

    isProfileModalOpened = !isProfileModalOpened;
  };
  openProfileModal?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleProfile();
  });
  signOutButton?.addEventListener("click", () => {
    Cookie.deleteCookie("user", config.cookieDomain);
    window.location.hash = "#sign-in";
  });
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#profile-modal") && isProfileModalOpened) {
      toggleProfile();
    }
  });

  const setUser = (user?: User) => {
    if (user) {
      if (profileName) {
        profileName.innerHTML = user.email;
      }

      AvatarHelper.setAvatar(
        "#profile-image",
        `${user.name.first} ${user.name.last}`,
        user.picture.medium,
      );
    }
  };
  setUser(getUserData());
  subscribeUserData(setUser);
}
