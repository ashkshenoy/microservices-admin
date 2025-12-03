import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InventoryTable({ products = [], onOpenAdjust, onOpenDelete  }) {
  // Helper to decide status & badge variant
  const getStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" };
    if (stock > 0 && stock < 10) return { label: "Low Stock", variant: "warning" };
    return { label: "In Stock", variant: "default" };
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-sm text-muted-foreground">
              No items found.
            </TableCell>
          </TableRow>
        ) : (
          products.map((p) => {
            const status = getStatus(p.stock);
            return (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.productName}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  {/* badge variants depend on shadcn badge setup; adapt classes if needed */}
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button size="sm" onClick={() => onOpenAdjust(p)}>Adjust</Button>
                  <Button size="sm" variant="destructive" onClick={() => onOpenDelete(p)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
