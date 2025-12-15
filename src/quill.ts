//@ts-nocheck
import Quill from "quill";
import "react-quill-new/dist/quill.snow.css";


// Quill Link format
const Link = Quill.import("formats/link") as any;

// Override sanitize
Link.sanitize = (url: string) => url;

// Override create → open in same tab
Link.create = (value: string) => {
  const node = document.createElement("a");
  node.setAttribute("href", value);
  node.setAttribute("target", "_self");
  node.setAttribute("rel", "noopener noreferrer");
  node.textContent = value;
  return node;
};

// Register once globally
Quill.register(Link, true);
