import Chart from '@/components/Chart';
import StyledCard, {
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/StyledCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import FoodList from './components/FoodList';
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL="https://ebsamovagbktsulxqrzi.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVic2Ftb3ZhZ2JrdHN1bHhxcnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNDA0NTMsImV4cCI6MjAyMzcxNjQ1M30.MgTZj2K4a7HydhTDNdVDDEKqtT8aSHkkCGPECvrJ-GM"

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

type TListData = {
    item: string;
    expiryDate: string;
    count: number;
}[]

export default function Overview() {

  const chartDataDefault = {
    dataKey: 'kg',
    xAxisKey: 'name',
    data: [
      {
        name: 'Jan.',
        kg: 0,
      },
      {
        name: 'Feb.',
        kg: 0,
      },
      {
        name: 'Mar.',
        kg: 0,
      },
      {
        name: 'Apr.',
        kg: 0,
      },
      {
        name: 'May',
        kg: 0,
      },
      {
        name: 'June',
        kg: 0,
      },
      {
        name: 'July',
        kg: 0,
      },
      {
        name: 'August',
        kg: 0,
      },
      {
        name: 'Sept.',
        kg: 0,
      },
      {
        name: 'Oct.',
        kg: 0,
      },
      {
        name: 'Nov.',
        kg: 0,
      },
      {
        name: 'Dec.',
        kg: 0,
      }
    ],
  };
  const [ chartData, setChartData ] = useState(chartDataDefault);
  const [ listData, setListData ] = useState<TListData|null>(null);

  useEffect(() => {
    updateChartData();
    updateListData();
  }, []);

  async function updateChartData() {
    const { data } = await supabase
      .from("user_data")
      .select("history")
      .eq("name", "Test user 0");

    const nextChartData: {
        name: string;
        kg: number;
    }[] = chartDataDefault.data.map((month, idx) => ({
      name: month.name,
      kg: data ? data[0].history[idx] : 0
    }));

    setChartData(prevState => {
      const newState = prevState;
      newState.data = nextChartData;
      return newState;
    })

    console.log("Updated chart.");
  }


  async function updateListData() {
    const { data } = await supabase
      .from("food")
      .select("item_name, expire_at, item_count", { count: "estimated" })
      .eq("item_owner", "Test user 0");

    if (!data) {
      console.log("Returned data list is null.");
      return;
    }

    const newData: TListData = data.map(d => ({
      item: d.item_name,
      expiryDate: (new Date(d.expire_at)).toDateString(),
      count: d.item_count
    }));

    setListData(newData);
  }

  return (
    <>
      <main className="grid gap-4 xl:grid-cols-10">
        <section className="xl:order-2 xl:col-span-3 ">
          <StyledCard className="h-full w-full">
            <CardHeader>
              <CardTitle>Item list</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px]">
                <FoodList data={listData} />
              </ScrollArea>
            </CardContent>
          </StyledCard>
        </section>
        <section className="xl:order-1 xl:col-span-7">
          <div className="grid gap-4 xl:grid-cols-4 mb-4">
            <StyledCard>
              <CardHeader>
                <CardTitle className="text-md">Carbon Footprint</CardTitle>
                <h2 className="text-2xl font-bold">40%</h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  Some description idk rn
                </p>
              </CardHeader>
            </StyledCard>

            <StyledCard>
              <CardHeader>
                <CardTitle className="text-md">Ranking</CardTitle>
                <h2 className="text-2xl font-bold">2</h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  {' '}
                  &#9650; 2 ranks
                </p>
              </CardHeader>
            </StyledCard>

            <StyledCard>
              <CardHeader>
                <CardTitle className="text-md">Donations</CardTitle>
                <h2 className="text-2xl font-bold">10</h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  In the last week
                </p>
              </CardHeader>
            </StyledCard>

            <StyledCard>
              <CardHeader>
                <CardTitle className="text-md">Expiring items</CardTitle>
                <h2 className="text-2xl font-bold">1</h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  Expiring in the next 3 days
                </p>
              </CardHeader>
            </StyledCard>
          </div>

          <StyledCard>
            <CardHeader>
              <CardTitle>Food waste??</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart {...chartData} />
            </CardContent>
          </StyledCard>
        </section>
      </main>
    </>
  );
}
