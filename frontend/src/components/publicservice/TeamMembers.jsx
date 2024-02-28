import React from "react";
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
export default function TeamMembers() {
  return (
    <>
      <div className="flex-1 bg-orange-100 p-8 m-8 rounded-lg">
        <Title>Team Members</Title>
        <div className="flex gap-8 mt-8 items-center justify-center">
          <a
            href="##"
            className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
            title="View Profile"
          >
            <img
              src="https://img.freepik.com/premium-photo/composition-robot-profile-fractal-elements-technology-science-education-projects-3d_616159-135.jpg"
              className="w-24 rounded-full"
              alt=""
            />
            <p className="text-center font-bold text-sm mt-1">Shah Fahad</p>
            <p className="text-xs text-gray-500 text-center">
              Fullstack Developer
            </p>
          </a>
          <a
            href="##"
            className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
            title="View Profile"
          >
            <img
              src="https://img.freepik.com/premium-photo/composition-robot-profile-fractal-elements-technology-science-education-projects-3d_616159-135.jpg"
              className="w-24 rounded-full"
              alt=""
            />
            <p className="text-center font-bold text-sm mt-1">
              Ubaid-Ur-Rehman
            </p>
            <p className="text-xs text-gray-500 text-center">
              Frontend Developer
            </p>
          </a>{" "}
        </div>
      </div>
    </>
  );
}
