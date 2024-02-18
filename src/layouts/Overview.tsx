import Chart from '@/components/Chart';
import StyledCard, {
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/StyledCard';
import { AllDataProps } from '@/types';
import { IoFootsteps, IoTrophyOutline, IoTimeOutline } from 'react-icons/io5';
import { LiaHandsHelpingSolid } from 'react-icons/lia';

interface OverviewProps
  extends Pick<AllDataProps, 'userData' | 'userFetched'> {}

export default function Overview({ userData, userFetched }: OverviewProps) {
  return (
    <>
      {userFetched && (
        <>
          <section className="h-min">
            <div className="grid gap-4 mb-4 lg:grid-cols-4">
              <StyledCard>
                <CardHeader>
                  <CardTitle className="flex justify-between gap-4 text-md">
                    Carbon footprint
                    <IoFootsteps className="opacity-80" />
                  </CardTitle>
                  <h2 className="text-2xl font-bold">
                    {userData[0].footprint}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    kg of CO<sup>2</sup>
                  </p>
                </CardHeader>
              </StyledCard>

              <StyledCard className="h-full">
                <CardHeader>
                  <CardTitle className="flex justify-between gap-4 text-md">
                    Ranking
                    <IoTrophyOutline className="opacity-80" />
                  </CardTitle>
                  <h2 className="text-2xl font-bold">2</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    &#9650; 2 ranks
                  </p>
                </CardHeader>
              </StyledCard>

              <StyledCard className="h-full">
                <CardHeader>
                  <CardTitle className="flex justify-between gap-4 text-md">
                    Donations
                    <LiaHandsHelpingSolid className="opacity-80" />
                  </CardTitle>
                  <h2 className="text-2xl font-bold">
                    {userData[0].num_donations}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    In the last week
                  </p>
                </CardHeader>
              </StyledCard>

              <StyledCard className="h-full">
                <CardHeader>
                <CardTitle className="flex justify-between gap-4 text-md">
                    Expiring soon
                    <IoTimeOutline  className="opacity-80" />
                  </CardTitle>
                  <h2 className="text-2xl font-bold">1</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    item expiring in the next 3 days
                  </p>
                </CardHeader>
              </StyledCard>
            </div>

            <StyledCard className="h-full">
              <CardHeader>
                <CardTitle>Amount of food wasted <span className='opacity-75'>(kg)</span></CardTitle>
              </CardHeader>
              <CardContent>
                <Chart {...userData[0].history} />
              </CardContent>
            </StyledCard>
          </section>
        </>
      )}
    </>
  );
}
