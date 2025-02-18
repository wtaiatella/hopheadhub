"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function HeroSection() {
  const [iframeWidth, setIframeWidth] = useState(0);
  const [iframeHeight, setIframeHeight] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);

  const handleResize = useCallback(() => {
    console.log("chamada handleResize");
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    console.log("Window height:", windowHeight);
    console.log("Window width:", windowWidth);

    const infoElement = document.getElementById("heroInfo");
    let infoHeight = 0;
    let infoTop = 0;
    let infoBottom = 0;

    if (infoElement) {
      infoHeight = infoElement.clientHeight;
      infoTop = infoElement.offsetTop;
      infoBottom = infoTop + infoHeight;
      console.log("Info height:", infoHeight);
      console.log("Info top:", infoTop);
      console.log("Info bottom:", infoBottom);
    }

    let heroSectionHeight = windowHeight;
    if (windowHeight < infoBottom) heroSectionHeight = infoBottom;
    setHeroHeight(heroSectionHeight);
    console.log("Hero height:", heroSectionHeight);

    const windowsResolutionRate = window.innerWidth / heroSectionHeight;
    if (windowsResolutionRate < 1.77) {
      setIframeWidth(heroSectionHeight * (16 / 9));
      setIframeHeight(heroSectionHeight);
      console.log("Set iframe height:", heroSectionHeight);
      console.log("Set iframe width:", heroSectionHeight * (16 / 9));
    } else {
      setIframeWidth(window.innerWidth);
      setIframeHeight(window.innerWidth / (16 / 9));
      console.log("Set iframe height:", window.innerWidth / (16 / 9));
      console.log("Set iframe width:", window.innerWidth);
    }
  }, []);

  useEffect(() => {
    handleResize();
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [iframeWidth, iframeHeight, handleResize]);

  return (
    <section>
      <div className="relative w-[100vw-18px] h-fit ">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <Image
            src="/assets/event-beer-party.jpeg"
            objectFit="cover"
            fill={true}
            alt="Beer party image"
            className="-z-10 opacity-80 brightness-[.25]"
          />
        </div>

        <div className="container">
          <div
            id="heroInfo"
            className="text-white text-center justify-items-center flex flex-col items-center"
          >
            <h1
              className={cn(
                "mt-44 px-4 leading-4 w-full tracking-wide text-[42px] font-serif",
                "2sm:text-4xl 2sm:mt-40 md:text-5xl"
              )}
            >
              <span
                className="text-highlight leading-1 font-bold text-[48px]
            2sm:text-5xl md:text-6xl"
              >
                FIND
              </span>{" "}
              YOUR NEXT FAVORITE{" "}
              <span
                className="text-highlight leading-1 font-bold text-[48px]
            2sm:text-5xl md:text-6xl"
              >
                BEER
              </span>{" "}
              EVENT HERE!
            </h1>

            <p
              className="mt-8 w-full max-w-4xl text-2xl px-4
            2sm:text-3xl 2sm:mt-4
            sm:px-8 md:text-4xl"
            >
              <span className="text-highlight font-bold text-3xl 2sm:text-4xl md:text-5xl">
                Discover
              </span>{" "}
              workshops, tasting events, parties and courses{" "}
              <span className="text-highlight font-bold text-3xl 2sm:text-4xl md:text-5xl">
                happening
              </span>{" "}
              right now.
            </p>

            <div
              className="flex justify-evenly w-full my-10 text-3xl px-4 
                2sm:text-4xl 2sm:mt-4 
                sm:px-8 
                md:text-5xl"
            >
              <div>
                <p>52</p>
                <p className="text-highlight font-bold">Workshop</p>
              </div>
              <div>
                <p>89</p>
                <p className="text-highlight font-bold">Parties</p>
              </div>
              <div>
                <p>35</p>
                <p className="text-highlight font-bold">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
