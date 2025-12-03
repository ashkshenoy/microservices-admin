import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { updateProduct } from "@/lib/endpoints";

export default function EditProductModal({ open, onOpenChange, product, onSuccess }) {
  const [values, setValues] = useState({
    name: "",
    price: "",
   
    description: "",
  });

  useEffect(() => {
    if (product) {
      setValues({
        name: product.name,
        price: product.price,
        
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

 

const handleSave = async () => {
  try {
    await updateProduct(product.id, {
      name: values.name,
      price: Number(values.price),
      
      description: values.description,
    });

    onOpenChange(false);
    onSuccess();
  } catch (err) {
    console.error("Failed to update product", err);
  }
};


  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Product name"
            onChange={handleChange}
            value={values.name}
          />

          <Input
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            value={values.price}
          />

         
          <Input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={values.description}
          />

          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
