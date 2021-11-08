import axios from "axios";
import { ApplicationType } from "./components/ApplicationList/ApplicationList";

export const determineBtnColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "blue.400";
    // break;
    case "Rejected":
      return "red.400";
    // break;
    case "Interview":
      return "green.400";
    // break;
    default:
      return "blue.400";
  }
};

export const determineBadgeColor = (jobType: string) => {
  switch (jobType) {
    case "Remote":
      return "blue";
    case "On-site/Hybrid":
      return "orange";
    default:
      return "blue";
  }
};

export const getDescriptionFromLinkedin = async (link: string | undefined) => {
  if (link === undefined) {
    return undefined;
  }
  const description = await axios
    .post("/api/getlinkedin", { link })
    .then((res) => {
      const htmlStr = res.data;
      if (res.data === undefined) {
        return;
      }
      const parser = new DOMParser();
      const parsedHTML = parser.parseFromString(htmlStr, "text/html");

      const appOutlet = parsedHTML.getElementsByClassName(
        "show-more-less-html__markup show-more-less-html__markup--clamp-after-5"
      );
      return appOutlet[0].innerHTML;
    })
    .catch((err) => console.log(err));

  return description;
};

export const handleSort = (sortingBy: string, data: ApplicationType[]) => {
  switch (sortingBy) {
    case "Status":
      data.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      });
      return data;
    case "Date":
      data.sort((a, b) => {
        if (a.date === undefined || b.date === undefined) {
          return -1;
        }
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      return data;
    default:
      return data;
  }
};
