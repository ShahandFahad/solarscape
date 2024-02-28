import React from "react";
import Contact from "../../pages/Contact";
import ContactUS from "../../assets/images/contact-us.svg";
import styled from "styled-components";
const Title = styled.h2`
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  margin: 0px auto 0.5em;
  line-height: 1.2em;
  color: #f97316;
  padding: 10px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;
export default function ConnectWithUs() {
  return (
    <>
      {/*  */}
      <Title>Connect With Us</Title>
      {/*  */}
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        {/*  */}
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8">
            <div class="flex-1 bg-gray-50 rounded-lg shadow-xl p-8">
              <p class="mt-2 text-gray-700 flex justify-center">
                <img alt="" src={ContactUS} class="object-cover h-auto w-100" />
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8">
            <div class="flex-1 bg-white p-8">
              {/*  */}
              <Contact />
              {/*  */}
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
}
