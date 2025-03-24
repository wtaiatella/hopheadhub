"use client";

import React, { useState } from "react";
import { Table, Button, Tag, Space, Typography, Card, Input, Select, DatePicker } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { TableProps } from "antd/es/table";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "past" | "canceled";
  attendees: number;
}

// Mock data - in a real app, this would come from an API or store
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Craft Beer Festival",
    date: "2025-04-15",
    location: "Downtown Brewery",
    status: "upcoming",
    attendees: 45,
  },
  {
    id: "2",
    title: "IPA Tasting Night",
    date: "2025-03-10",
    location: "Hop House",
    status: "past",
    attendees: 28,
  },
  {
    id: "3",
    title: "Stout Appreciation Day",
    date: "2025-05-22",
    location: "Dark Malt Bar",
    status: "upcoming",
    attendees: 32,
  },
  {
    id: "4",
    title: "Homebrewing Workshop",
    date: "2025-02-18",
    location: "Brew Academy",
    status: "past",
    attendees: 15,
  },
  {
    id: "5",
    title: "Beer & Food Pairing",
    date: "2025-04-30",
    location: "Gastro Pub",
    status: "upcoming",
    attendees: 38,
  },
];

const MyEventsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const router = useRouter();

  const handleViewEvent = (id: string) => {
    router.push(`/events/${id}`);
  };

  const handleEditEvent = (id: string) => {
    router.push(`/events/${id}/edit`);
  };

  const handleDeleteEvent = (id: string) => {
    console.log("Delete event:", id);
    // In a real app, this would call an API to delete the event
  };

  const handleCreateEvent = () => {
    router.push("/events/create");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "green";
      case "past":
        return "gray";
      case "canceled":
        return "red";
      default:
        return "blue";
    }
  };

  const columns: TableProps<Event>["columns"] = [
    {
      title: "Event Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
      filters: [
        { text: "Upcoming", value: "upcoming" },
        { text: "Past", value: "past" },
        { text: "Canceled", value: "canceled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Attendees",
      dataIndex: "attendees",
      key: "attendees",
      sorter: (a, b) => a.attendees - b.attendees,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewEvent(record.id)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditEvent(record.id)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteEvent(record.id)}
          />
        </Space>
      ),
    },
  ];

  // Filter events based on search text
  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = searchText
      ? event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.location.toLowerCase().includes(searchText.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter ? event.status === statusFilter : true;
    
    const matchesDateRange = dateRange
      ? new Date(event.date) >= new Date(dateRange[0]) &&
        new Date(event.date) <= new Date(dateRange[1])
      : true;
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>My Events</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreateEvent}
          className="bg-indigo-800 hover:bg-indigo-700"
        >
          Create Event
        </Button>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            placeholder="Search events"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by status"
            allowClear
            style={{ width: "100%" }}
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="upcoming">Upcoming</Option>
            <Option value="past">Past</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
          <RangePicker 
            style={{ width: "100%" }}
            onChange={(dates) => {
              if (dates) {
                setDateRange([
                  dates[0]!.format("YYYY-MM-DD"),
                  dates[1]!.format("YYYY-MM-DD"),
                ]);
              } else {
                setDateRange(null);
              }
            }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredEvents}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default MyEventsPage;
