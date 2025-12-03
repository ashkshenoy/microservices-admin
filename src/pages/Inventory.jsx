import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InventoryTable from "@/sections/inventory/InventoryTable";
import AdjustStockModal from "@/sections/inventory/AdjustStockModal";
import { getInventory } from "@/lib/endpoints";
import AddInventoryModal from "@/sections/inventory/AddInventoryModal";
import DeleteInventoryModal from "@/sections/inventory/DeleteInventoryModal";
import { updateInventoryStock } from "@/lib/endpoints";

export default function Inventory() {
  // initial/mock product inventory (you can replace with API data later)
  const [products, setProducts] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
  loadInventory();
}, []);

const loadInventory = async () => {
  const res = await getInventory();
  setProducts(res.data);
};

  // UI state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all / in-stock / low-stock / out
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtering & search
  const filtered = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "in-stock") {
      data = data.filter((p) => p.stock >= 10);
    } else if (filter === "low-stock") {
      data = data.filter((p) => p.stock > 0 && p.stock < 10);
    } else if (filter === "out-stock") {
      data = data.filter((p) => p.stock === 0);
    }

    return data;
  }, [products, search, filter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  // Keep page in bounds if filtered length changes
  if (page > totalPages) setPage(totalPages);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const openAdjustModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
 

  const handleAdjust = async (id, newStock) => {
  await updateInventoryStock(id, newStock);
  await loadInventory();        // refresh list from backend
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setCreateOpen(true)}>Add Item</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">

          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-72"
          />

          <select
            className="border rounded-md px-3 py-2"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="in-stock">In Stock (≥ 10)</option>
            <option value="low-stock">Low Stock (1–9)</option>
            <option value="out-stock">Out of Stock (0)</option>
          </select>
        
      </div>

      {/* Table */}
      <InventoryTable
  products={paged}
  onOpenAdjust={openAdjustModal}
  onOpenDelete={(item) => {
    setDeleteItem(item);
    setDeleteOpen(true);
  }}
/>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>

        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Adjust Stock Modal */}
      <AdjustStockModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={selectedItem}
        onAdjust={(id, newStock) => {
          handleAdjust(id, newStock);
          setModalOpen(false);
        }}
      />
      <AddInventoryModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={loadInventory}
      />
      <DeleteInventoryModal
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  product={deleteItem}
  onSuccess={loadInventory}
/>
    </div>
  );
}
