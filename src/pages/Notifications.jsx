import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import NotificationsTable from "@/sections/notifications/NotificationsTable";

export default function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      type: "info",
      message: "New order #234 created",
      service: "Orders",
      time: "10:21 AM"
    },
    {
      id: 2,
      type: "warning",
      message: "Low stock: AirPods Pro",
      service: "Inventory",
      time: "10:19 AM"
    },
    {
      id: 3,
      type: "error",
      message: "Payment failed for order #228",
      service: "Payments",
      time: "10:15 AM"
    },
    {
      id: 4,
      type: "info",
      message: "User Karan logged in",
      service: "Auth",
      time: "10:10 AM"
    },
    {
      id: 5,
      type: "info",
      message: "Product catalog updated",
      service: "Products",
      time: "9:55 AM"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // SEARCH + FILTER
  const filtered = useMemo(() => {
    let data = [...notifications];

    if (search) {
      data = data.filter((n) =>
        n.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      data = data.filter((n) => n.type === filter);
    }

    return data;
  }, [notifications, search, filter]);

  // PAGINATION
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (page > totalPages) setPage(totalPages);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="Search notifications..."
          className="w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border px-3 py-2 rounded-md"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Table */}
      <NotificationsTable notifications={paged} />

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <button
          className="border px-3 py-2 rounded-md text-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`border px-3 py-2 rounded-md text-sm ${
              page === i + 1 ? "bg-primary text-white" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="border px-3 py-2 rounded-md text-sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
