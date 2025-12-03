import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import OrdersTable from "@/sections/orders/OrdersTable";
import OrderDetailsModal from "@/sections/orders/OrderDetailsModal";

export default function Orders() {
  const [orders] = useState([
    { id: 1, customer: "Ashwin", total: 1299, status: "pending", date: "2025-01-08" },
    { id: 2, customer: "Rhea", total: 499, status: "completed", date: "2025-01-12" },
    { id: 3, customer: "John", total: 899, status: "cancelled", date: "2025-01-10" },
    { id: 4, customer: "Meera", total: 1999, status: "pending", date: "2025-01-15" },
    { id: 5, customer: "Karan", total: 2999, status: "completed", date: "2025-01-11" },
    { id: 6, customer: "Priya", total: 249, status: "pending", date: "2025-01-14" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // FILTER & SEARCH
  const filtered = useMemo(() => {
    let data = [...orders];

    if (search) {
      data = data.filter((o) =>
        o.customer.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      data = data.filter((o) => o.status === filter);
    }

    return data;
  }, [orders, search, filter]);

  // PAGINATION
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (page > totalPages) setPage(totalPages);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const openDetails = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-64"
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
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <OrdersTable orders={paged} onView={openDetails} />

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

      {/* Details Modal */}
      <OrderDetailsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        order={selectedOrder}
      />
    </div>
  );
}
