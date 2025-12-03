import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from "@/sections/products/ProductTable";
import AddProductModal from "@/sections/products/AddProductModal";
import EditProductModal from "@/sections/products/EditProductModal";
import DeleteProductDialog from "@/sections/products/DeleteProductDialog";
import { useState } from "react";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setOpen(true)}>Add Product</Button>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">

        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72"
        />

        
      </div>
      <ProductTable
        search={search}
        filter={filter}
        refreshKey={refreshKey}
          setEditOpen={setEditOpen}
  setDeleteOpen={setDeleteOpen}
  setSelectedProduct={setSelectedProduct}

      />
      <AddProductModal open={open} onOpenChange={setOpen} onSuccess={() => setRefreshKey(k => k + 1)} />
      <EditProductModal
        open={editOpen}
        onOpenChange={setEditOpen}
        product={selectedProduct}
        onSuccess={() => setRefreshKey(k => k + 1)}
      />

      <DeleteProductDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={selectedProduct}
        onSuccess={() => setRefreshKey(k => k + 1)}
      />
     

    </div>
  );
}
