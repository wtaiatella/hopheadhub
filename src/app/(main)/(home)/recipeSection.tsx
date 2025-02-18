import Image from "next/image";
import TextSection from "./textSection";
import Title from "@/components/commom/title";
import { Button } from "antd";
import ImageSection from "./imageSection";

export default function RecipeSection() {
  return (
    <div className="mt-16 lg:mt-20 container grid grid-cols-1 justify-items-center items-center gap-4 text-center md:grid-cols-2">
      <ImageSection
        className="order-2 mt-4 md:order-1 md:row-span-3"
        width={1200}
        height={580}
        imageSrc="/assets/recipes-glasses-of-beer.jpeg"
        imageAlt="recipes Image"
      />

      <Title className="order-1 md:order-2" hasLogo>
        Hoppy Analysis
      </Title>
      <TextSection className="order-3">
        Discover the magic behind your brews as our AI decodes the flavors and
        aromas hidden in your ingredients.
      </TextSection>
      <div className="order-4 flex justify-around gap-4 w-full">
        <Button type="primary">Analyse your recipe</Button>
        <Button type="primary">Find an recipe</Button>
      </div>
    </div>
  );
}
