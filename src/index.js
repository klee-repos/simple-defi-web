import React from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes";
import "./css/index.scss";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<>{routes}</>);
