import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function FoodList() {
  const data = [
    {
      item: 'Lettuce',
      expiryDate: 'Mar. 2023',
      count: '1'
    }
  ]
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
        {data.map((item, index) => (
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
