import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { deleteInventoryItem } from "@/lib/endpoints";

export default function DeleteInventoryModal({ open, onOpenChange, product, onSuccess }) {
  
  if (!product) return null;

  const handleDelete = async () => {
    await deleteInventoryItem(product.id);
    onSuccess();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {product.productName}?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <p className="text-sm text-muted-foreground">
          This action cannot be undone.
        </p>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
