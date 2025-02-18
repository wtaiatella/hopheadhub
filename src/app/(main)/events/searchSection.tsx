import { Button, Input } from 'antd';
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react';

export default function SearchSection() {
  return (
    <section className="container">
      <div className="flex mt-10 px-4 gap-12 max-w-4xl mx-auto text-2xl">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="inline" size={24} />
          <span>Filter</span>
        </div>
        <Input type="email" placeholder="Search events" />
        <div className="flex items-center gap-2">
          <span>Order</span>
          <ArrowDownWideNarrow className="inline" size={24} />
        </div>
        <Button type="primary" className="flex items-center gap-2">
          filter <ArrowDownWideNarrow className="inline" size={24} />
        </Button>
      </div>
    </section>
  );
}
