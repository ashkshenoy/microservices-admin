import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createInventory, getProducts } from "@/lib/endpoints";

export default function AddInventoryModal({ open, onOpenChange, onSuccess }) {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stock, setStock] = useState("");

  // Load product dropdown list once
  useEffect(() => {
    if (open) {
      loadProducts();
    }
  }, [open]);

  const loadProducts = async () => {
    try {
      const res = await getProducts(); // <-- You already have this endpoint
      setProductList(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const handleAdd = async () => {
    if (!selectedProduct) return;

    try {
      await createInventory({
        productId: selectedProduct.id,   // real ID
        stock: Number(stock),
      });

      onOpenChange(false);
      onSuccess();
      setSelectedProduct(null);
      setStock("");
    } catch (err) {
      console.error("Failed to create inventory item", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Inventory Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* PRODUCT DROPDOWN */}
          <select
            className="border rounded-md px-3 py-2 w-full"
            value={selectedProduct?.id || ""}
            onChange={(e) => {
              const p = productList.find((x) => x.id === Number(e.target.value));
              setSelectedProduct(p || null);
            }}
          >
            <option value="">Select product...</option>
            {productList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {/* product name from Product service */}
              </option>
            ))}
          </select>

          {/* STOCK INPUT */}
          <Input
            placeholder="Initial stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <Button className="w-full" onClick={handleAdd}>
            Add Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
