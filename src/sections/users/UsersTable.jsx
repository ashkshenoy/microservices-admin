import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UsersTable({ users, onView, onPromote, currentUser }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-600 text-white">Inactive</Badge>;
      default:
        return status;
    }
  };

  const getRoleBadge = (role) => {
    return (
      <Badge className="bg-gray-200 text-gray-800 capitalize">
        {role}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{getRoleBadge(u.role)}</TableCell>
            <TableCell>{getStatusBadge(u.status)}</TableCell>
            <TableCell className="text-right flex justify-end gap-2">

              <Button size="sm" variant="outline" onClick={() => onView(u)}>
                View
              </Button>

              {currentUser?.role === "owner" &&
                u.role !== "admin" && (
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white"
                    onClick={() => onPromote(u)}
                  >
                    Promote
                  </Button>
                )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
