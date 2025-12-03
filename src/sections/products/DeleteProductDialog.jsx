import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/lib/endpoints";
export default function DeleteProductDialog({
  open,
  onOpenChange,
  onSuccess,
  product,
}) {
  

const handleDelete = async () => {
  try {
    await deleteProduct(product.id);
    onOpenChange(false);
     onSuccess();
  } catch (err) {
    console.error("Delete failed", err);
  }
};


  if (!product) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {product.name}?
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
