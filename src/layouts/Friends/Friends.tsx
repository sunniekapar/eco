import Chart from '@/components/Chart';
import StyledCard, {
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/StyledCard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { RiArrowDropDownLine } from 'react-icons/ri';

type TTableStats = {
  name: string;
  emissions: string;
  donations: string;
  score: string;
}

type TPastStats = {
  [indexof: string]: {
    dataKey: string;
    xAxisKey: string;
    data: {
      name: string;
      kg: number;
    }[];
  }
}

export default function Friends() {
  const [selectedUser, setSelectedUser] = useState("Rahul");

  const [ pastStats, setPastStats ] = useState<TPastStats>({
    "Rahul": {
      dataKey: 'kg',
      xAxisKey: 'name',
      data: [
        {
          name: 'Jan.',
          kg: 4,
        },
        {
          name: 'Feb.',
          kg: 6,
        },
        {
          name: 'Mar.',
          kg: 3,
        },
        {
          name: 'Apr.',
          kg: 5,
        },
        {
          name: 'May',
          kg: 4,
        },
        {
          name: 'Jun.',
          kg: 3,
        },
      ],
    },
    "Yash": {
      dataKey: 'kg',
      xAxisKey: 'name',
      data: [
        {
          name: 'Jan.',
          kg: 10,
        },
        {
          name: 'Feb.',
          kg: 6,
        },
        {
          name: 'Mar.',
          kg: 3,
        },
        {
          name: 'Apr.',
          kg: 1,
        },
        {
          name: 'May',
          kg: 4,
        },
        {
          name: 'Jun.',
          kg: 3,
        },
      ],
    }
  });
  const [ tableData, setTableData ] = useState<TTableStats[]>([
    {
      name: 'Rahul',
      emissions: '10.2 CO2e',
      donations: '0',
      score: '4',
    },
    {
      name: 'Yash',
      emissions: '10 CO2e',
      donations: '0',
      score: '10',
    }
  ]);

  return (
    <>
      <h3 className="font-medium text-lg mb-2 text-muted-foreground">
        Your ECO points
      </h3>
      <h2 className="text-2xl font-bold mb-2">
        <span className='font-light'>lvl.11</span> 270
        <span className="text-primary text-sm">/300</span>
      </h2>
      <Progress value={90} className="w-52 h-2.5 mb-2" />
      <p className="font-medium mb-8">
        30 points until <span className="text-primary">lvl. 12</span>
      </p>

      <section className="grid grid-cols-10 gap-4">
        <div className="col-span-5">
          <StyledCard className="h-full">
            <CardHeader>
              <CardTitle>Friends List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of all your friends</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Donation count</TableHead>
                    <TableHead>Carbon footprint</TableHead>
                    <TableHead className="text-right">Overall score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData && tableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.name}
                      </TableCell>
                      <TableCell>
                        {item.donations}
                      </TableCell>
                      <TableCell>
                        {item.emissions}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </StyledCard>
        </div>

        <div className="col-span-5">
          <StyledCard>
            <CardHeader>
              <CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-lg">
                      { selectedUser }
                      <RiArrowDropDownLine className="text-lg ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Friend list</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={selectedUser}
                      onValueChange={setSelectedUser}
                    >
                      {Object.keys(pastStats!).map((person, index) => (
                        <DropdownMenuRadioItem
                          key={index}
                          value={person}
                        >
                          {person}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart {...pastStats[selectedUser]} />
            </CardContent>
          </StyledCard>
        </div>
      </section>
    </>
  );
}
