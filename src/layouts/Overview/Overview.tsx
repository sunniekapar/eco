import Chart from '@/components/Chart';
import StyledCard, {
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/StyledCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import FoodList from './components/FoodList';

export default function Overview() {
  const chartData = {
    dataKey: 'kg',
    xAxisKey: 'name',
    data: [
      {
        name: 'Jan.',
        kg: 10,
      },
      {
        name: 'Feb.',
        kg: 13,
      },
      {
        name: 'Mar.',
        kg: 18,
      },
      {
        name: 'Apr.',
        kg: 8,
      },
      {
        name: 'May',
        kg: 9,
      },
      {
        name: 'Jun.',
        kg: 6,
      },
    ],
  };

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
                <FoodList />
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
