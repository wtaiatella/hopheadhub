'use client';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

export default function HeroSection() {
  const [iframeWidth, setIframeWidth] = useState(0);
  const [iframeHeight, setIframeHeight] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);

  const handleResize = useCallback(() => {
    console.log('chamada handleResize');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    console.log('Window height:', windowHeight);
    console.log('Window width:', windowWidth);

    const infoElement = document.getElementById('heroInfo');
    let infoHeight = 0;
    let infoTop = 0;
    let infoBottom = 0;

    if (infoElement) {
      infoHeight = infoElement.clientHeight;
      infoTop = infoElement.offsetTop;
      infoBottom = infoTop + infoHeight;
      console.log('Info height:', infoHeight);
      console.log('Info top:', infoTop);
      console.log('Info bottom:', infoBottom);
    }

    let heroSectionHeight = windowHeight;
    if (windowHeight < infoBottom) heroSectionHeight = infoBottom;
    setHeroHeight(heroSectionHeight);
    console.log('Hero height:', heroSectionHeight);

    const windowsResolutionRate = window.innerWidth / heroSectionHeight;
    if (windowsResolutionRate < 1.77) {
      setIframeWidth(heroSectionHeight * (16 / 9));
      setIframeHeight(heroSectionHeight);
      console.log('Set iframe height:', heroSectionHeight);
      console.log('Set iframe width:', heroSectionHeight * (16 / 9));
    } else {
      setIframeWidth(window.innerWidth);
      setIframeHeight(window.innerWidth / (16 / 9));
      console.log('Set iframe height:', window.innerWidth / (16 / 9));
      console.log('Set iframe width:', window.innerWidth);
    }
  }, []);

  useEffect(() => {
    handleResize();
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [iframeWidth, iframeHeight, handleResize]);

  return (
    <section>
      <div
        id="heroIframe"
        className="relative w-[100vw-18px] h-screen overflow-hidden"
        style={{ height: `${heroHeight}px` }}
      >
        <div className="absolute top-0 left-0 w-full h-full  ">
          <iframe
            className="absolute top-1/2 left-1/2 m-0 -z-10 opacity-80 brightness-50 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `"${iframeWidth}"`,
              height: `"${iframeHeight}"`,
            }}
            width={iframeWidth}
            height={iframeHeight}
            src="https://www.youtube.com/embed/OLHK9fa8evM?autoplay=1&mute=1&controls=0&loop=1&playlist=OLHK9fa8evM&showinfo=0&modestbranding=1&mode=transparent&playsinline=0&autohide=0&iv_load_policy=3"
            title="Beer short loop"
            allow="accelerometer; autoplay; gyroscope;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
          ></iframe>
        </div>
        <div style={{ height: `${heroHeight}px` }}>
          <div
            id="heroInfo"
            className="text-white text-center justify-items-center flex flex-col items-center"
          >
            <h1
              className={cn(
                'mt-44 px-4 leading-4 w-full text-[42px] font-serif',
                '2sm:text-5xl 2sm:mt-48 md:text-6xl'
              )}
            >
              YOUR BEER{' '}
              <span
                className="text-highlight leading-1 font-bold text-[48px]
            2sm:text-6xl md:text-7xl"
              >
                COMMUNITY
              </span>{' '}
              AWAITS!
            </h1>

            <p
              className="mt-8 w-full max-w-3xl text-3xl px-4
            2sm:text-4xl 2sm:mt-12
            sm:px-8 md:text-5xl"
            >
              <span className="text-highlight font-bold text-4xl 2sm:text-5xl md:text-6xl">
                Find
              </span>{' '}
              events,{' '}
              <span className="text-highlight font-bold text-4xl 2sm:text-5xl md:text-6xl">
                share
              </span>{' '}
              your brewing secrets, and{' '}
              <span className="text-highlight font-bold text-4xl 2sm:text-5xl md:text-6xl">
                explore
              </span>{' '}
              the world of craft beer.
            </p>

            <p
              className="mt-10 w-full max-w-3xl text-3xl  px-4 pb-10
            2sm:text-4xl 2sm:mt-14
            sm:px-8 md:text-5xl"
            >
              Join{' '}
              <span className="text-highlight font-bold text-4xl 2sm:text-5xl md:text-6xl">
                Hop Head Hub
              </span>{' '}
              and connect with a community of beer lovers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
