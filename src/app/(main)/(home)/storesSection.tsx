import Image from "next/image";
import TextSection from "./textSection";
import Title from "@/components/commom/title";
import ImageSection from "./imageSection";
import { Button } from "antd";

export default function StoresSection() {
  return (
    <div className="mt-16 lg:mt-20 container grid grid-cols-1 justify-items-center items-center gap-4 text-center md:grid-cols-2">
      <ImageSection
        className="order-2 mt-4 md:order-2 md:row-span-3"
        width={1200}
        height={800}
        imageSrc="/assets/beer-store.jpg"
        imageAlt="Beer Store Image"
      />

      <Title className="order-1 md:order-1" hasLogo>
        Hoppy Stores
      </Title>
      <TextSection className="order-3">
        Help our community grow, register your business and help us create the
        best hub for all things beer.
      </TextSection>
      <div className="order-4 flex justify-around gap-4 w-full">
        <Button type="primary">Register your business</Button>
        <Button type="primary">Find a store</Button>
      </div>
    </div>
  );
}
