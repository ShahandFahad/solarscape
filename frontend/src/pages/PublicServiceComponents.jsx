import React from "react";
import Navbar from "../components/navbar/Navbar";
import PublicFooter from "../components/footer/PublicFooter";
import Banner from "../components/publicservice/Banner";
import HowToUse from "../components/publicservice/HowToUse";
import SystemInfoDesc from "../components/publicservice/SystemInfoDesc";
import AboutUs from "../components/publicservice/AboutUs";
import ConnectWithUs from "../components/publicservice/ConnectWithUs";
import TeamMembers from "../components/publicservice/TeamMembers";
/**
 * STATIC DATA FOR HOW TO USE THIS APPLICATION
 */
const howToUseTitle = "How to use this application?";
const howToUseSubtitle1 = "Follow these steps: ";
const howToUseSubtitle2 =
  " In order to findout the amount of solar radiation for your location follow these steps in order.";

const howToUseSteps = [
  "Enter the your address in search bar.",

  "Customize the input fileds such as: System losses, Panel tilt, and Sun azimuth angel.",

  "Press the result button. A side window will open which contains all the information in detail.",

  "For further analysis press the download button, the data will be download in csv format.",

  "Press the advance GEE button to visit Earth engine app for further analysis.",

  "Press the profile button for updating your profile.",
];

/**
 * STATIC DATA FOR SYSTEM INFORMATION COMPONENT
 */

const systemInfoTitle = "System Information";

const SystemInfoTitleAndDescription = [
  {
    title: "Tilt:",
    desc: "Tilt refers to the angle at which solar panels are inclined or slanted. It is measured in degrees from the horizontal plane. A proper tilt angle allows panels to capture maximum sunlight throughout the day and year.",
  },

  {
    title: "Azimuth:",
    desc: "Azimuth is the compass direction solar panels face, determining the orientation. Choosing the right azimuth ensures panels receive optimal sunlight exposure for efficient energy production.It is measured in degrees from the north in a clockwise direction.",
  },

  {
    title: "DC System Size:",
    desc: "DC System Size refers to the maximum amount of electricity a solar system can generate under standard test conditions. It is measured in kilowatts (KW) and represents the system's overall capacity. The size is a crucial factor in determining the potential energy output of the solar installation.",
  },

  {
    title: "System Losses:",
    desc: "System Losses account for reductions in energy production due to various factors such as shading, temperature, and inverter inefficiencies. They represent the difference between the theoretical maximum output and the actual energy delivered. Minimizing system losses is important for optimizing the overall efficiency and performance of the solar power system.",
  },
];

/**
 * ABOUT US STATIC DATA
 */

const aboutUsTitle = "About Us";
const aboutUsTitleAndDesc = [
  {
    title: "Overview:",
    desc: "Welcome to our Software Engineering Final Year Project (FYP) - the culmination of our journey in the Department of Software Engineering! We're a team of enthusiastic students passionate about creating innovative solutions.",
  },

  {
    title: "Who We Are:",
    desc: "We are a diverse group of individuals brought together by our shared love for technology and the desire to make a positive impact. From coding wizards to design aficionados, our team brings a mix of skills and creativity to the table.",
  },

  {
    title: "Our Mission:",
    desc: "Our FYP focuses on developing a web project that not only showcases our technical skills but also addresses a real-world problem. We aim to create a user-friendly and efficient solution that adds value to the software engineering landscape.",
  },
];
export default function PublicServiceComponents() {
  return (
    <>
      {/* Banner */}
      <Banner />
      {/* How to use */}
      <HowToUse
        howToUseTitle={howToUseTitle}
        howToUseSubtitle1={howToUseSubtitle1}
        howToUseSubtitle2={howToUseSubtitle2}
        howToUseSteps={howToUseSteps}
      />

      {/* System Information */}
      <SystemInfoDesc
        systemInfoTitle={systemInfoTitle}
        SystemInfoTitleAndDescription={SystemInfoTitleAndDescription}
      />

      {/* About US */}
      <AboutUs
        aboutUsTitle={aboutUsTitle}
        aboutUsTitleAndDesc={aboutUsTitleAndDesc}
      />

      {/* Connect With Us */}
      <ConnectWithUs />

      {/* Team Members */}
      <TeamMembers />
    </>
  );
}
