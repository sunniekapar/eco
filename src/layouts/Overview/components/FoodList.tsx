import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  item: string,
  expiryDate: string,
  count: number
}

export default function FoodList({ data }: { data: Props[] | null }) {
  return (
    <Table>
      <TableCaption>A list of all the items in your fridge.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Food</TableHead>
          <TableHead>Expiry date</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.item}</TableCell>
            <TableCell>{item.expiryDate}</TableCell>
            <TableCell className="text-right">{item.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  );
}
