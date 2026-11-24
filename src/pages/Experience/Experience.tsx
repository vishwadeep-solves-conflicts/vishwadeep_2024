import { PropsWithChildren } from "react";
import styled from "styled-components";
import ContentDiv from "../../components/styled/Content";
import ExperienceRow from "../../components/ExperienceRow/ExperienceRow";
import media from "../../styled/breakpoints";

type NotFoundProps = PropsWithChildren<{ props?: any }>;

const data = [{
  date: "Aug 2022 - Present",
  company_name: "SLEEKSKY",
  position: "Senior Software Engineer",
  desc: `Full-stack engineer on a US healthcare platform for at-home lab testing and health-plan programs, working across a Node.js API and four React apps.
  Built lab-ordering integrations and webhooks, moved large eligibility uploads to async processing, and rebuilt health-plan analytics on SQL materialized views.
  Worked on messaging compliance (TCPA send windows, opt-outs) and security fixes, upgraded the React app to Vite, and cut the React test suite from 704 s to ~185 s.
  Earlier (2022–23): backends for client products with NestJS, Azure and Keycloak.`,
  tech:["Node.js", "React", "Vite", "TanStack", "MUI", "SQL", "Twilio", "AWS S3", "NestJS", "Azure", "Keycloak"]
},
{
  date: "Dec 2020 - Aug 2022",
  company_name: "FLOCKALONG",
  position: "Web developer",
  desc: `While at FlockAlong, I worked with Gatsby, Node.js, Netlify
  Functions, C#, Auth0, Google Maps, Algolia, Cypress.
  I was responsible for developing Gatsby based Front-End which
  served as a platform for customers to create, join and manage
  trips.
  Helped develop parts of the Back-End written in C# and Node.
  Implemented Algolia search engine and automated data
  upload/update to Algolia servers.
  Implemented authentication/authorization flow with Auth0.`,
  tech:["Gatsby", "Nodejs", "Netlify Functions", "C#", "Auth0", "Google Maps", "Algolia", "Cypress"]
},
{
  date: "Aug 2018 - Nov 2019",
  company_name: "KHAOBAO",
  position: "Operations Manager",
  desc: `I was responsible for development of Android Apps - Customer
  Side and Delivery Guy app.
  In parallel I was handling day to day operations including
  signing new restaurants, improving customer experience and
  launching new services.
  Completed 40k+ successful orders.`,
  tech:["Java", "Android", "Javascript", "Firebase", "Power BI", "Photoshop"]
}]

type Experience = {
  date: string;
  company_name: string;
  position: string;
  desc: string;
  tech: string[]
}

function Experience({ props, ...rest }: NotFoundProps) {
  return (
    <ContentDiv {...rest} id="experience">
      <div className="sectionTitle">Experience</div>
      <>
      {data.map((dataE: Experience, index: number)=>
        <ExperienceRow key={index} props={dataE}/>
      )}</>
    </ContentDiv>
  );
}

export default styled(Experience)`
  padding: 60px 42px;
  overflow: auto;

  .sectionTitle{
    font-size: 18px;
    text-transform: uppercase;
    color: ${props=> props.theme.colors.primary};
    font-weight: 600;
  }

  ${media.md`
    padding: 60px 12px;
  `}
`;
