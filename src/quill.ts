//@ts-nocheck
// import Quill from "quill";
// import "react-quill-new/dist/quill.snow.css";


// const Link = Quill.import("formats/link") as any;

// Link.sanitize = (url: string) => url;

// Link.create = (value: string) => {
//   const node = document.createElement("a");
//   node.setAttribute("href", value);
//   node.setAttribute("target", "_self");
//   node.setAttribute("rel", "noopener noreferrer");
//   node.textContent = value;
//   return node;
// };


// Quill.register(Link, true);


//@ts-nocheck
import Quill from "quill";
import "react-quill-new/dist/quill.snow.css";

const Link = Quill.import("formats/link");

// Allow all URLs
Link.sanitize = (url: string) => url;

Link.create = (value: string) => {
  const node = document.createElement("a");
  node.setAttribute("href", value);

  const APP_DOMAIN = window.location.origin; 
  const isInternal =
    value.startsWith("/") ||
    value.startsWith(APP_DOMAIN);

  node.setAttribute("target", isInternal ? "_self" : "_blank");

  if (!isInternal) {
    node.setAttribute("rel", "noopener noreferrer");
  }

  node.textContent = value;
  return node;
};

Quill.register(Link, true);
