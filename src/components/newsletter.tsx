import { cn } from "@/lib/utils";
import { Button, Input } from "antd";

export default function Newsletter() {
  return (
    <div className="container max-w-sm mt-16 lg:mt-20 mb-20">
      <h1
        className={cn(
          "mx-auto max-w-max font-serif text-4xl text-center leading-tight font-semibold text-primary"
        )}
      >
        Stay informed, join out newsletter!
      </h1>
      <div className="flex w-full max-w-lg items-center space-x-2 mx-auto mt-4">
        <Input type="email" placeholder="Email" />
        <Button type="primary">Subscribe</Button>
      </div>
    </div>
  );
}
