import Image from "next/image";
import TextSection from "./textSection";
import Title from "@/components/commom/title";
import ImageSection from "./imageSection";
import { Button } from "antd";

export default function EventSection() {
  return (
    <div className="mt-16 lg:mt-20 container grid grid-cols-1 justify-items-center items-center gap-4 text-center md:grid-cols-2">
      <ImageSection
        className="order-2 mt-4 md:order-1 md:row-span-3"
        width={1200}
        height={800}
        imageSrc="/assets/event-beer-party.jpeg"
        imageAlt="events Image"
      />

      <Title className="order-1 md:order-2" hasLogo>
        Hoppy Happenings
      </Title>
      <TextSection className="order-3">
        At Hop Head Hub, we&apos;re all about connecting bee lovers with the
        best suppliers. Explore, find, and visit your nearest store for
        everything you need, supplies, gifts, accessories, and more!
      </TextSection>
      <div className="order-4 flex justify-around gap-4 w-full">
        <Button type="primary">Create an event</Button>
        <Button type="primary">Find an event</Button>
      </div>
    </div>
  );
}
