import React, { Fragment } from "react";
import SolarPanelSvg from "../../assets/images/solar-panel.svg";
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
export default function AboutUs({ aboutUsTitle, aboutUsTitleAndDesc }) {
  return (
    <>
      {/*  */}
      {/*  */}
      <Title>{aboutUsTitle}</Title>
      {/*  */}
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8">
            <div className="flex-1 bg-white p-8">
              {aboutUsTitleAndDesc.map((info) => {
                return (
                  <Fragment key={info.title}>
                    <h4 className="text-xl text-gray-900 font-bold">
                      {info.title}
                    </h4>
                    {/*  */}
                    {/* <!-- start::Timeline item --> */}
                    <div className="flex items-center w-full my-6 -ml-1.5">
                      <div className="w-1/12 z-10">
                        <div className="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                      </div>
                      <div className="w-11/12">
                        <p className="text-sm">{info.desc}</p>
                      </div>
                    </div>
                    {/* <!-- end::Timeline item --> */}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8">
            <div className="flex-1 bg-gray-50 rounded-lg shadow-xl p-8">
              <p className="mt-2 text-gray-700 flex justify-center">
                <img
                  alt=""
                  src={SolarPanelSvg}
                  className="object-cover h-auto w-96"
                />
              </p>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
    </>
  );
}
