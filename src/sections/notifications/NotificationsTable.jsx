import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default function NotificationsTable({ notifications }) {
  const getTypeBadge = (type) => {
    switch (type) {
      case "info":
        return <Badge className="bg-blue-500 text-white">Info</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return type;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Service</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notifications.map((n) => (
          <TableRow key={n.id}>
            <TableCell>{n.time}</TableCell>
            <TableCell>{getTypeBadge(n.type)}</TableCell>
            <TableCell>{n.message}</TableCell>
            <TableCell>{n.service}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
