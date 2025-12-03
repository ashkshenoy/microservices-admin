import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdjustStockModal({ open, onOpenChange, product, onAdjust }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (product) setValue(product.stock); // preload current stock
  }, [product]);

  if (!product) return null;

  const saveStock = () => {
    const newStock = Math.max(0, Number(value));
    onAdjust(product.id, newStock);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set New Stock — {product.productName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Current stock
            </label>
            <div className="text-lg font-semibold">{product.stock}</div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              New Stock Value
            </label>
            <Input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={saveStock}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
