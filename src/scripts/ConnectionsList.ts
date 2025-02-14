import type { Connection } from "@utils/types";
export const filterConnections = (connections?: Connection[]) => {
  const loading = document.getElementById("loading");
  loading?.classList.remove("hidden");
  const searchInput = document.getElementById(
    "search",
  ) as HTMLInputElement | null;
  const emailInput = document.getElementById(
    "email-input",
  ) as HTMLInputElement | null;
  const filterValue = searchInput?.value;
  const emailFilterValue = emailInput?.value;

  if (connections) {
    if (filterValue || emailFilterValue) {
      let filterData = filterValue
        ? connections.filter((item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase()),
          )
        : connections;
      filterData = emailFilterValue
        ? connections.filter(
            (item) =>
              item.details &&
              item.details.email
                .toLowerCase()
                .includes(emailFilterValue.toLowerCase()),
          )
        : filterData;
      appendConnections(filterData);
    } else {
      appendConnections(connections);
    }
  }
};

export const appendConnections = (connections?: Connection[]) => {
  const connectionsContainer = document.getElementById("connections-container");
  const revokeAccess = document.getElementById("revoke-access");
  const viewDetails = document.getElementById("view-details");
  const arrowRight = document.getElementById("arrow-right");
  if (connectionsContainer && connections) {
    const loading = document.getElementById("loading");
    loading?.classList.add("hidden");
    connectionsContainer.innerHTML = "";
    connections.forEach((connection, i: number) => {
      const connectionHash = "#connections/" + i;

      const div = document.createElement("div");
      div.className =
        "flex w-full flex-row items-center justify-between gap-6 border-b border-solid border-b-grey-200 p-6 last:border-b-0 gap-6 cursor-pointer";

      const divName = document.createElement("div");

      divName.className = "flex items-center gap-6";
      const divTitle = document.createElement("div");
      divTitle.className =
        "font-semibold text-base md:text-xl md:tracking-0.02";
      const divTitleContent = document.createTextNode(connection.name);
      divTitle.appendChild(divTitleContent);

      const img = document.createElement("img");
      img.className =
        "isolate flex h-16 w-16 flex-col items-center justify-center rounded-none p-0";
      img.src = connection.image_url || "/images/empty-logo.png";
      divName.appendChild(img);
      divName.appendChild(divTitle);

      const divActions = document.createElement("div");
      divActions.className = "flex items-end gap-4";

      const viewDetailsButton =
        viewDetails &&
        viewDetails.children[0] &&
        (viewDetails.children[0].cloneNode(true) as HTMLButtonElement);

      if (viewDetailsButton) {
        viewDetailsButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.hash = connectionHash;
        };
      }
      const arrowRightIcon = arrowRight && arrowRight.cloneNode(true);
      const revokeAccessButton =
        revokeAccess &&
        revokeAccess.children[0] &&
        revokeAccess.children[0].cloneNode(true);
      viewDetailsButton && divActions.appendChild(viewDetailsButton);
      revokeAccessButton && divActions.appendChild(revokeAccessButton);
      arrowRightIcon && divActions.appendChild(arrowRightIcon);
      div.appendChild(divName);
      div.appendChild(divActions);
      div.onclick = () => {
        window.location.hash = connectionHash;
      };
      connectionsContainer.appendChild(div);
    });
  }
};
