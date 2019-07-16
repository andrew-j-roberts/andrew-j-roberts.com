import React from "react";
import { AboutMe, Art, Code, TechnicalArticles } from "./pages";

export const routes = [
  {
    path: "/",
    exact: true,
    main: props => <div>home!</div>
  },
  {
    path: "/about-me",
    exact: true,
    main: props => <AboutMe {...props} />
  },
  {
    path: "/technical-articles",
    exact: true,
    main: props => <TechnicalArticles {...props} />
  },
  {
    path: "/code",
    exact: true,
    main: props => <Code {...props} />
  },
  {
    path: "/art",
    exact: true,
    main: props => <Art {...props} />
  }
];
