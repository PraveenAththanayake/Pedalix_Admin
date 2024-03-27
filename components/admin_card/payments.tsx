import useFirebaseData from "@/hooks/useFirebaseData";
import { CardWrapper } from "./card_wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Payments = () => {
  const { payments } = useFirebaseData();
  return (
    <CardWrapper headerLabel="Payments" desc="All the payments of users">
      <Table>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.email}>
              <TableCell className="font-medium">
                {Math.floor(Math.random() * payments.length) + 1}
              </TableCell>
              <TableCell>{payment.invoiceNo}</TableCell>
              <TableCell>{payment.email}</TableCell>
              <TableCell>{payment.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardWrapper>
  );
};

export default Payments;
