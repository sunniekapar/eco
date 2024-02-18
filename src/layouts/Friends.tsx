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
import { AllDataProps, UserDataProps } from '@/types';
import { useState } from 'react';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface FriendsProps extends Pick<AllDataProps, 'userData' | 'userFetched'> {}

export default function Friends({ userData, userFetched }: FriendsProps) {
  const [selectedUser, setSelectedUser] = useState<string>(userData[0].name);
  return (
    <>
      {userFetched && (
        <>
          <div className="transition animate-appear ">
            <div className="flex items-center text-muted-foreground">
              <h3 className="mb-2 text-lg font-medium ">Your ECO points</h3>
              <HoverCard>
                <HoverCardTrigger>
                  <IoMdHelpCircleOutline className="-mt-1.5 ml-2" />
                </HoverCardTrigger>
                <HoverCardContent className="w-64 text-sm">
                  You can gain ECO points by donating food and making new
                  recipes, and you will lose points for letting your food
                  expire.
                </HoverCardContent>
              </HoverCard>
            </div>

            <h2 className="mb-2 text-2xl font-bold">
              <span className="font-light mr-1.5">
                lvl.{userData[0].num_points % 10}
              </span>{' '}
              {userData[0].num_points}
              <span className="text-sm text-primary">/10</span>
            </h2>
            <Progress value={90} className="w-52 h-2.5 mb-2" />
            <p className="mb-8 font-medium">
              {10 - (userData[0].num_points % 10)} points until{' '}
              <span className="text-primary">
                lvl. {(userData[0].num_points % 10) + 1}
              </span>
            </p>
          </div>

          <section className="grid gap-4 xl:grid-cols-10">
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
                        <TableHead className="text-right">
                          Overall score
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.num_donations}</TableCell>
                          <TableCell>
                            {item.footprint}kg CO<sup>2</sup>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.num_points}
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
                    Amount of food
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2 mx-2 text-2xl">
                          {selectedUser}
                          <RiArrowDropDownLine className="ml-2 text-lg" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Friend list</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={selectedUser}
                          onValueChange={setSelectedUser}
                        >
                          {userData.map((user: UserDataProps) => (
                            <DropdownMenuRadioItem
                              key={user.name}
                              value={user.name}
                            >
                              {user.name}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    wasted <span className="opacity-75">(kg)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    {...userData[
                      userData.findIndex((user) => user.name === selectedUser)
                    ].history}
                  />
                </CardContent>
              </StyledCard>
            </div>
          </section>
        </>
      )}
    </>
  );
}
