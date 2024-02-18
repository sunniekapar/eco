import StyledCard, {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/StyledCard';
import StyledSeparator from '@/components/StyledSeparator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LuRefreshCw } from 'react-icons/lu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AllDataProps } from '@/types';

interface InventoryProps
  extends Omit<AllDataProps, 'userFetched' | 'userData'> {
  handleRefresh: () => Promise<void>;
}

export default function Inventory({
  itemData,
  itemFetched,
  recipeData,
  recipeFetched,
  handleRefresh,
}: InventoryProps) {
  return (
    <>
      {itemFetched && (
        <section className="flex flex-col gap-4 xl:grid xl:grid-cols-11">
          <div className="col-span-4">
            <StyledCard className="w-full h-full">
              <CardHeader>
                <CardTitle>Item list</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px]">
                  <Table>
                    <TableCaption>
                      A list of all the items in your fridge.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Food</TableHead>
                        <TableHead>Expiry date</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itemData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.item}
                          </TableCell>
                          <TableCell>{item.expiryDate}</TableCell>
                          <TableCell className="text-right">
                            {item.count}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </StyledCard>
          </div>

          <div className="col-span-4">
            <StyledCard className="h-full">
              <CardHeader className="-mb-2">
                {!recipeFetched ? (
                  <>
                    <Skeleton className="h-6 w-[350px] mb-2" />
                    <Skeleton className="h-4 w-[300px]" />
                  </>
                ) : (
                  <>
                    <CardTitle className="flex items-center justify-between gap-4">
                      {recipeData.dish}
                      <Button
                        onClick={() => handleRefresh}
                        size="icon"
                        variant="ghost"
                      >
                        <LuRefreshCw />
                      </Button>
                    </CardTitle>
                    <CardDescription>{recipeData.description}</CardDescription>
                  </>
                )}
              </CardHeader>

              <CardContent>
                <StyledSeparator />
                <ScrollArea className="min-h-96">
                  {!recipeFetched ? (
                    <div className="h-full my-auto mt-16 space-y-4">
                      <Skeleton className="h-4 w-[350px]" />
                      <Skeleton className="h-6 w-[325px]" />
                      <Skeleton className="h-4 w-[350px]" />
                      <Skeleton className="h-4  w-[325px]" />
                      <Skeleton className="h-6 w-[325px]" />
                      <Skeleton className="h-4 w-[275px]" />
                      <Skeleton className="h-4  w-[325px]" />
                    </div>
                  ) : (
                    <>
                      <div className="mt-2 mb-6">
                        <p className="font-semibold">
                          Prep Time:{' '}
                          <span className="text-muted-foreground">
                            {recipeData.prepTime} Min
                          </span>
                        </p>

                        <p className="font-semibold">
                          Cook Time:{' '}
                          <span className="text-muted-foreground">
                            {recipeData.cookTime} Min
                          </span>
                        </p>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        Ingredients
                      </h3>
                      <ul className="mb-4 space-y-1">
                        {recipeData.ingredients.map(
                          (ingredient: string, index: number) => {
                            return <li key={index}>{ingredient}</li>;
                          }
                        )}
                      </ul>
                    </>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>See steps</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      {!recipeFetched ? (
                        <>
                          <Skeleton className="h-4 w-[325px]" />
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[300px]" />
                        </>
                      ) : (
                        <>
                          <AlertDialogTitle>{recipeData.dish}</AlertDialogTitle>
                          <AlertDialogDescription>
                            <ol className="ml-4 list-decimal space-y-1.5">
                              {recipeData.instructions.map(
                                (instruction: string, index: number) => {
                                  return <li key={index}>{instruction}</li>;
                                }
                              )}
                            </ol>
                          </AlertDialogDescription>
                        </>
                      )}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Exit</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </StyledCard>
          </div>

          <div className="col-span-3">
            <StyledCard className="h-full">
              <CardHeader>
                <CardTitle className="mb-8">
                  See what your friends made
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Pizza</p>
                    <p className="text-sm text-muted-foreground">Rakupookie</p>
                  </div>
                  <div className="ml-auto font-medium">1 day ago</div>
                </div>

                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>RB</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Butter Chicken
                    </p>
                    <p className="text-sm text-muted-foreground">Rizzlybae</p>
                  </div>
                  <div className="ml-auto font-medium">3 days ago</div>
                </div>

                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">PB & J</p>
                    <p className="text-sm text-muted-foreground">Sunnie</p>
                  </div>
                  <div className="ml-auto font-medium">3 days ago</div>
                </div>

                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>KP</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Mutter Paneer
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Krishipookie
                    </p>
                  </div>
                  <div className="ml-auto font-medium">5 days ago</div>
                </div>

                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>YK</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Apple Crumble Pie
                    </p>
                    <p className="text-sm text-muted-foreground">Yushu</p>
                  </div>
                  <div className="ml-auto font-medium">7+ days ago</div>
                </div>
              </CardContent>
            </StyledCard>
          </div>
        </section>
      )}
    </>
  );
}
