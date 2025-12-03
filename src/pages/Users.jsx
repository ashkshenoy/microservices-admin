import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import UsersTable from "@/sections/users/UsersTable";
import UserDetailsModal from "@/sections/users/UserDetailsModal";

import {
  getAllUsers,
  updateUserRole,
  getCurrentUser,
} from "@/api/endpoints";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all / admin / user
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------------
  // LOAD USERS & CURRENT USER
  // ------------------------------
  useEffect(() => {
    async function load() {
      const me = await getCurrentUser();
      setCurrentUser(me.data);

      const res = await getAllUsers();
      setUsers(res.data);
    }

    load();
  }, []);

  // ------------------------------
  // SEARCH + FILTER
  // ------------------------------
  const filtered = useMemo(() => {
    let data = [...users];

    if (search) {
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      data = data.filter((u) => u.role === filter);
    }

    return data;
  }, [users, search, filter]);

  // ------------------------------
  // PAGINATION
  // ------------------------------
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (page > totalPages) setPage(totalPages);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // ------------------------------
  // OPEN DETAILS
  // ------------------------------
  const openDetails = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // ------------------------------
  // PROMOTE USER (OWNER ONLY)
  // ------------------------------
  const promoteUser = async (user) => {
    await updateUserRole(user.id, "admin");

    // Refresh users
    const res = await getAllUsers();
    setUsers(res.data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Users</h1>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-64"
          />

          <select
            className="border px-3 py-2 rounded-md"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        users={paged}
        onView={openDetails}
        onPromote={promoteUser}
        currentUser={currentUser}
      />

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <button
          className="border px-3 py-2 rounded-md text-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`border px-3 py-2 rounded-md text-sm ${
              page === i + 1 ? "bg-primary text-white" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="border px-3 py-2 rounded-md text-sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        user={selectedUser}
      />
    </div>
  );
}
