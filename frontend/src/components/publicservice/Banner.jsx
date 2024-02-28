import React from "react";
import styled from "styled-components";
import Bulb from "../../assets/images/solar-energy-llight-bulb.png";

const BannerBox = styled.div`
  --border-radius-hero: 24px;
  --height-shape-hero: calc(100% - 55px);
  --width-shape-hero: calc(100vw - 48px);

  height: 100%;
  padding: 24px 0;
  //   position: relative;
  width: 100%;
  background-color: #f8fafd;

  @media only screen and (min-width: 1024px) {
    padding: 32px 0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

// Image Generated Here: https://bgjar.com/simple-shiny
const BannerShape = styled.section`
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1013%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(249%2c 115%2c 22%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c536.422C98.691%2c536.398%2c156.184%2c425.502%2c240.632%2c374.43C328.316%2c321.401%2c463.475%2c324.312%2c505.363%2c230.792C547.297%2c137.168%2c465.054%2c35.765%2c436.445%2c-62.751C412.185%2c-146.292%2c396.896%2c-230.057%2c350.215%2c-303.463C297.436%2c-386.458%2c238.188%2c-467.96%2c150.468%2c-512.448C53.122%2c-561.818%2c-65.036%2c-606.79%2c-165.974%2c-565.254C-266.601%2c-523.846%2c-292.219%2c-396.039%2c-352.527%2c-305.466C-404.231%2c-227.816%2c-477.98%2c-162.895%2c-494.964%2c-71.165C-512.271%2c22.309%2c-493.973%2c121.506%2c-446.869%2c204.078C-401.771%2c283.133%2c-313.737%2c320.231%2c-240.706%2c374.545C-161.516%2c433.44%2c-98.69%2c536.446%2c0%2c536.422' fill='%23d35a05'%3e%3c/path%3e%3cpath d='M1440 1190.0259999999998C1557.851 1185.797 1660.509 1121.176 1761.255 1059.882 1864.357 997.154 1989.594 943.307 2031.524 830.14 2073.089 717.958 2012.618 596.639 1974.967 483.08299999999997 1942.999 386.669 1885.088 307.41999999999996 1829.9270000000001 222.12599999999998 1764.969 121.68299999999999 1736.978-26.86099999999999 1622.579-61.80600000000004 1508.353-96.69899999999996 1398.484 2.7350000000000136 1292.596 57.988 1205.27 103.555 1137.45 169.58100000000002 1060.737 231.36599999999999 965.015 308.46000000000004 794.371 343.349 786.031 465.973 777.466 591.895 967.79 637.05 1025.509 749.292 1078.906 853.1279999999999 1023.588 998.4259999999999 1103.579 1083.482 1185.831 1170.942 1320.016 1194.3310000000001 1440 1190.0259999999998' fill='%23fa934b'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1013'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");

  background-position: center;
  background-size: cover;
  border-radius: var(--border-radius-hero);
  height: var(--height-shape-hero);
  //   left: 50%;
  //   position: absolute;
  //   top: 50%;
  //   transform: translate(-50%, -51%);
  width: var(--width-shape-hero);

  @media only screen and (min-width: 1440px) {
    background-color: #d3e3fd;
    background-repeat: no-repeat;
    // background-size: 1600px 480px;
  }
`;

export default function Banner() {
  return (
    <BannerBox>
      <BannerShape className="text-gray-600 body-font bg-white dark:bg-orange-500">
        <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
              Solar Potential Assessment
            </h1>
            <p className="mb-8 md:pl-0  pl-2 pr-2 leading-relaxed dark:text-gray-200">
              Findout solar potential for your specfied location by searching
              your location.
            </p>
            <div className="flex justify-center">
              <a
                href="/login"
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-8 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={Bulb}
            />
          </div>
        </div>
      </BannerShape>
    </BannerBox>
  );
}
