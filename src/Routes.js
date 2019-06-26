import React from "react";
import { AboutMe, Art, Code, TechnicalArticles } from "./pages";

export const routes = [
  {
    path: "/",
    exact: true,
    sidebar: props => <div>home!</div>,
    main: props => <h2>{props.screenSize}</h2>
  },
  {
    path: "/about-me",
    exact: true,
    sidebar: props => <AboutMe {...props} />,
    main: props => <h2>{props.screenSize}</h2>
  },
  {
    path: "/technical-articles",
    exact: true,
    sidebar: props => <TechnicalArticles {...props} />,
    main: props => <h2>{props.screenSize}</h2>
  },
  {
    path: "/code",
    exact: true,
    sidebar: props => <Code {...props} />,
    main: props => <h2>{props.screenSize}</h2>
  },
  {
    path: "/art",
    exact: true,
    sidebar: props => <Art {...props} />,
    main: props => <h2>{props.screenSize}</h2>
  }
];
