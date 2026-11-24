import { PropsWithChildren } from "react";
import styled from "styled-components";
import ContentDiv from "../../components/styled/Content";
import media from "../../styled/breakpoints";
import flockalong from "./../../assets/projects/flockalong.png";
import gupsgup from "./../../assets/projects/gupshup.png";
import indiaCommerce from "./../../assets/projects/india_commerce.jpg";
import khaobao from "./../../assets/projects/khaobao.jpg";
import portfolio from "./../../assets/projects/portfolio.jpg";
import target from "./../../assets/projects/target.png";
import jsonEditor from "./../../assets/projects/json-editor.png";
import rubix from "./../../assets/projects/rubix.png";
import WorkRow from "../../components/WorkRow/WorkRow";

type NotFoundProps = PropsWithChildren<{ props?: any }>;

const data = [
  {
    project_name: "Rubix",
    desc: "A web app as a one stop solution to allow hospitals to create and manage availabilities for schools and students all over the US. It can map different hospital branches, availabilities in different programs, different tiers of schools and student placements. I was involved in building its architecture and APIs from the ground up.",
    tech: ["NestJS", "Azure", "Keycloak", "Keyvault", "Azure Blob Storage"],
    github: null,
    url: null,
    image: rubix,
  },
  {
    project_name: "Visual JSON Editor",
    desc: "A highly tailored JSON editor made for one of our clients to help them manage 10k+ json files and 1M+ lines of data.",
    tech: ["NestJS", "React", "Azure", "Keycloak", "Tailwind", "MUI"],
    github: null,
    url: null,
    image: jsonEditor,
  },
  {
    project_name: "FlockAlong",
    desc: "A place where confident travel leaders can create trips for people who can surf through them and join any available trip. The trip creation involves a user-friendly multi-step form that allows to enter description, images, path on map, number of slots, pricing and more.",
    tech: [
      "Gatsby",
      "GraphQL",
      "Algolia",
      "Auth0",
      "Azure Functions",
      "Netlify Functions",
      "Google Maps API",
      "Google Images API",
      "Unsplash",
    ],
    github: null,
    url: "https://flockalong.com",
    image: flockalong,
  },
  {
    project_name: "Target",
    desc: "A small project where user can request goods transport services and track them. It included a driver app to track drivers, an admin panel to manage requests and send bills, and a user app to track goods.",
    tech: [
      "NodeJS",
      "React",
      "Android",
      "Google Maps API",
      "Auth0",
      "Azure Blob Storage",
      "Stripe",
      "MUI",
      "Tailwind",
    ],
    github: "https://github.com/vishwadeep-solves-conflicts/target-server",
    url: null,
    image: target,
  },
  {
    project_name: "KhaoBao",
    desc: "A food delivery application that allows customers to order from restaurants in their neighborhood, pay for their order and track their order.",
    tech: ["NodeJS", "Android", "Firebase"],
    github: "https://github.com/vishwadeep-solves-conflicts/KhaoBao",
    url: null,
    image: khaobao,
  },
  {
    project_name: "India Commerce",
    desc: "A personal endeavour to graph and plot all kinds of trade that India is or was involved in with different countries.",
    tech: [
      "NodeJS",
      "React",
      "Express",
      "Python",
      "Selenium",
      "CSS",
      "MongoDB",
    ],
    github: "https://github.com/vishwadeep-solves-conflicts/india-commerce",
    url: null,
    image: indiaCommerce,
  },
  {
    project_name: "Portfolio",
    desc: "This site: my playground for animation and visualization, built with React, TypeScript and GSAP.",
    tech: ["React", "TypeScript", "Vite", "styled-components", "GSAP"],
    github: "https://github.com/vishwadeep-solves-conflicts/vishwadeep_2024",
    url: null,
    image: portfolio,
  },
  {
    project_name: "GupShup - a social site",
    desc: "One of my very first projects working with back-end and front-end together. It had everything that a social site can offer apart from real-time messaging.",
    tech: ["NodeJS", "React", "Express", "MongoDB", "MUI"],
    github: "https://github.com/vishwadeep-solves-conflicts/gupshup",
    url: null,
    image: gupsgup,
  },
];

type WorksType = {
  project_name: string;
  desc: string;
  tech: string[];
  github: string | null;
  url: string | null;
  image: string;
};

function Work({ props, ...rest }: NotFoundProps) {
  return (
    <ContentDiv {...rest} id="works">
      <div className="sectionTitle">Works</div>
      <>
        {data.map((dataE: WorksType, index: number) => (
          <WorkRow key={index} props={dataE} />
        ))}
      </>
    </ContentDiv>
  );
}

export default styled(Work)`
  padding: 60px 42px;
  overflow: auto;

  .sectionTitle {
    font-size: 18px;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }

  ${media.md`
    padding: 60px 12px;
  `}
`;
