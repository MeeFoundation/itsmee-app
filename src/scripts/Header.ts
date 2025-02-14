import { appendConnections, filterConnections } from "./ConnectionsList";
import { AvatarHelper } from "mee-components";
import type { User } from "@utils/types";
import initProfileModal from "./ProfileModal";
import { getConnectionsData } from "@store/ConnectionsStore";
import { getUserData, subscribeUserData } from "@store/UserStore";

export default function initHeader() {
  const addConnectionButton = document.getElementById("add-connection");
  const filterButton = document.getElementById("filter");
  const clearFilterButton = document.getElementById("clear-filter");

  addConnectionButton?.addEventListener("click", () => {
    window.location.hash = "#create-connection";
  });

  const clearFilterConnections = () => {
    if (searchInput) {
      searchInput.value = "";
    }
    if (emailInput) {
      emailInput.value = "";
    }
    if (passwordCheck) {
      passwordCheck.checked = false;
    }
    if (phoneCheck) {
      phoneCheck.checked = false;
    }
    appendConnections(getConnectionsData());
  };
  const searchInput = document.getElementById(
    "search",
  ) as HTMLInputElement | null;
  const emailInput = document.getElementById(
    "email-input",
  ) as HTMLInputElement | null;
  const passwordCheck = document.getElementById(
    "password-check",
  ) as HTMLInputElement | null;
  const phoneCheck = document.getElementById(
    "phone-check",
  ) as HTMLInputElement | null;

  searchInput?.addEventListener("change", () => {
    filterConnections(getConnectionsData());
  });
  filterButton?.addEventListener("click", () => {
    filterConnections(getConnectionsData());
  });
  clearFilterButton?.addEventListener("click", clearFilterConnections);

  let isFilterModalOpened = false;
  const filterModal = document.getElementById("filter-modal");
  const openFilterModal = document.getElementById("open-filter-modal");
  const toggleFilter = () => {
    if (isFilterModalOpened) {
      filterModal?.classList.remove("flex");
      filterModal?.classList.add("hidden");
    } else {
      filterModal?.classList.remove("hidden");
      filterModal?.classList.add("flex");
    }

    isFilterModalOpened = !isFilterModalOpened;
  };
  openFilterModal?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFilter();
  });

  const setUserData = (user?: User) => {
    if (user) {
      AvatarHelper.setAvatar(
        "#profile-image-preview",
        `${user.name.first} ${user.name.last}`,
        user.picture.medium,
      );
    }
  };

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#filter-modal") && isFilterModalOpened) {
      toggleFilter();
    }
  });
  setUserData(getUserData());
  subscribeUserData(setUserData);
  initProfileModal();
}
