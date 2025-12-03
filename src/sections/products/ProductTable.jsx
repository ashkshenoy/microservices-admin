import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/lib/endpoints";

export default function ProductTable({
  search,
  filter,
  refreshKey,
  setEditOpen,
  setDeleteOpen,
  setSelectedProduct,
}) {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // ======================
  // LOAD PRODUCTS
  // ======================
  const load = async () => {
    try {
      const res = await getProducts();
      setAllProducts([...res.data]);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    load();
  }, [refreshKey]);

  // ======================
  // FILTER + SEARCH
  // ======================
  const filtered = useMemo(() => {
    let data = [...allProducts];

    // Search
    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ❌ Removed stock filters completely
    // if (filter === "low-stock") ...
    // if (filter === "high-stock") ...

    return data;
  }, [allProducts, search, filter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ======================
  // HANDLERS
  // ======================
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  return (
    <>
      {/* ========== CLEAN HEADING ========== */}
      

      {/* ========== TABLE ========== */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paged.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.description}</TableCell>

              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(p)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {paged.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ========== PAGINATION ========== */}
      <div className="flex justify-end mt-4 gap-2">
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
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </>
  );
}
