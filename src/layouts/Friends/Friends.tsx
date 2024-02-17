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
import { useEffect, useState } from 'react';
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

import { PostgrestResponse, createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL="https://ebsamovagbktsulxqrzi.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVic2Ftb3ZhZ2JrdHN1bHhxcnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNDA0NTMsImV4cCI6MjAyMzcxNjQ1M30.MgTZj2K4a7HydhTDNdVDDEKqtT8aSHkkCGPECvrJ-GM"

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

type TTableStats = {
  name: string;
  emissions: number;
  donations: number;
  score: number;
}

type TPastStats = {
  dataKey: string;
  xAxisKey: string;
  data: {
    name: string;
    kg: number;
  }[];
}

export default function Friends() {
  const [selectedUser, setSelectedUser] = useState("Rahul");

  const [ pastStats, setPastStats ] = useState(new Map<string, TPastStats>());
  const [ tableData, setTableData ] = useState<TTableStats[]>([
    {
      name: 'Rahul',
      emissions: 10,
      donations: 0,
      score: 4,
    },
    {
      name: 'Yash',
      emissions: 8,
      donations: 0,
      score: 9,
    }
  ]);

  async function updateEverything() {
    const { data } = await supabase
      .from("user_data")
      .select("name, footprint, num_donations, num_points, history") as PostgrestResponse<{
        name: string,
        footprint: number,
        num_donations: number,
        num_points: number,
        history: number[]
    }>;

    if (!data) {
      console.log("updateEverything() returned null");
      return;
    }

    const nextTableData = data.map(d => ({
      name: d.name,
      emissions: d.footprint*1.9,
      donations: d.num_donations,
      score: d.num_points,
    }));
    setTableData(nextTableData);
    setSelectedUser(data[0].name);

    const m = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec"]

    data.map(d => {

      const nextData: {
        name: string,
        kg: number
      }[] = d.history.map((h, i) => ({
        name: m[i],
        kg: h
      }));

      const nextStateElem = {
        dataKey: 'kg',
        xAxisKey: 'name',
        data: nextData,
      }

      setPastStats(prevState => prevState.set(d.name, nextStateElem));
    })

    
  }

  useEffect(() => {
    updateEverything();
  }, [])

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
                      {Array.from(pastStats).map((m) => (
                        <DropdownMenuRadioItem
                          key={m[0]}
                          value={m[0]}
                        >
                          {m[0]}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Chart {...pastStats.get(selectedUser)} />
            </CardContent>
          </StyledCard>
        </div>
      </section>
    </>
  );
}
