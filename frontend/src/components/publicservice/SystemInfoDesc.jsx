import React from "react";
import styled from "styled-components";
import FillerMap from "../../assets/images/deco_map.png";

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

export default function SystemInfoDesc({
  systemInfoTitle,
  SystemInfoTitleAndDescription,
}) {
  return (
    <>
      {" "}
      <Title>{systemInfoTitle}</Title>
      {/*  */}
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8 ">
            <div class="flex-1 bg-gray-50 rounded-lg shadow-xl p-8">
              <p class="mt-2 text-gray-700 ">
                {/* <img
                  style={{ height: "356px" }}
                  className="rounded-lg"
                  src={FillerMap}
                  alt=""
                /> */}
                <img alt="" src={FillerMap} class="object-cover h-auto w-100" />
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col 2xl:w-2/4">
          <div className="flex-1 bg-white p-8">
            <div class="flex-1 bg-white p-8">
              {/*  */}
              {SystemInfoTitleAndDescription.map((info) => {
                return (
                  <>
                    <h4 class="text-xl text-gray-900 font-bold">
                      {info.title}
                    </h4>
                    {/*  */}
                    {/* <!-- start::Timeline item --> */}
                    <div class="flex items-center w-full my-6 -ml-1.5">
                      <div class="w-1/12 z-10">
                        <div class="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                      </div>
                      <div class="w-11/12">
                        <p class="text-sm">{info.desc}</p>
                      </div>
                    </div>
                    {/* <!-- end::Timeline item --> */}
                  </>
                );
              })}
              {/*  */}
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
}
