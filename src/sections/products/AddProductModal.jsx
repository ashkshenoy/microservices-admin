import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
  import { createProduct } from "@/lib/endpoints";
export default function AddProductModal({ open, onOpenChange, onSuccess }) {
  const [values, setValues] = useState({
    name: "",
    price: "",
   
    description:""
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };



const handleAdd = async () => {
  try {
    await createProduct({
      name: values.name,
      price: Number(values.price),
     
      description: values.description,
    });

    onOpenChange(false);
    
    onSuccess(); // callback to refresh table
  } catch (err) {
    console.error("Failed to add product", err);
  }
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
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

          <Button className="w-full" onClick={handleAdd}>
            Add Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
