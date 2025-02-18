"use client";
import { proportionalValue } from "@/lib/proportionalValue";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export default function AnimatedTextSection() {
  const [marginLeftText1, setMarginLeftText1] = useState(0);
  const [marginRightText3, setMarginLeftText3] = useState(0);
  const [fontSizeText, setFontSizeText] = useState(0);

  const handleAnimationText = useCallback(() => {
    const divElement = document.getElementById("animatedText");
    const text1Element = document.getElementById("text1");
    const text3Element = document.getElementById("text2");
    const windowWidth = window.innerWidth;
    let divTopWindow = 0;

    if (divElement && text1Element && text3Element) {
      divTopWindow = divElement.getBoundingClientRect().top;
      const divWidth = divElement.offsetWidth;
      const text1Width = text1Element.offsetWidth;
      const text3Width = text3Element.offsetWidth;

      const animationEnd = window.innerHeight * 0.3;
      const animationStart = window.innerHeight * 0.9;

      const text1MarginLeft = (divWidth - text1Width) / 2;
      const text2MarginRight = (divWidth - text3Width) / 2;

      console.log("Div width:", divWidth);
      console.log("Text1 width:", text1Width);
      console.log("Text2 width:", text3Width);
      console.log("Text top window:", divTopWindow);
      console.log("Window Height:", window.innerHeight);
      console.log("Text1 margin left:", text1MarginLeft);
      console.log("Text2 margin right:", text2MarginRight);

      let marginLeftText1 = proportionalValue(
        divTopWindow,
        animationEnd,
        animationStart,
        text1MarginLeft,
        0
      );
      let marginRightText3 = proportionalValue(
        divTopWindow,
        animationEnd,
        animationStart,
        text2MarginRight,
        0
      );
      let fontSizeText = proportionalValue(
        divTopWindow,
        animationEnd,
        animationStart,
        2,
        1
      );

      if (windowWidth > 640) {
        fontSizeText = fontSizeText * 1.5;
      }

      if (windowWidth > 1024) {
        fontSizeText = fontSizeText * 1.5;
      }

      setMarginLeftText1(marginLeftText1);
      setFontSizeText(fontSizeText);
      setMarginLeftText3(marginRightText3);
    }
    console.log("Margin left text1:", marginLeftText1);
    console.log("Font size text1:", fontSizeText);
  }, [marginLeftText1, fontSizeText]);

  useEffect(() => {
    handleAnimationText();
  });

  useEffect(() => {
    window.addEventListener("scroll", handleAnimationText);
    window.addEventListener("resize", handleAnimationText);
    return () => {
      window.removeEventListener("scroll", handleAnimationText);
      window.removeEventListener("resize", handleAnimationText);
    };
  }, [handleAnimationText]);

  return (
    <div
      className={cn(
        "mt-16 grid  text-primary font-serif font-semibold leading-[2rem]", 
        "sm:leading-[3rem]",
        "lg:leading-[4rem]"
      )}
      id="animatedText"
    >
      <p
        id="text1"
        className={cn("w-max")}
        style={{
          fontSize: `${fontSizeText}rem`,
          marginLeft: `${marginLeftText1}px`,
        }}
      >
        Create an event
      </p>
      <p
        className="w-max mx-auto"
        style={{
          fontSize: `${fontSizeText}rem`,
        }}
      >
        Register your business
      </p>
      <p
        id="text2"
        className="justify-self-end"
        style={{
          fontSize: `${fontSizeText}rem`,
          marginRight: `${marginRightText3}px`,
        }}
      >
        Analyses your recipe
      </p>
    </div>
  );
}
