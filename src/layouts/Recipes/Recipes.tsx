import StyledCard, {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/StyledCard';
import StyledSeparator from '@/components/StyledSeparator';
import { Button } from '@/components/ui/button';
import { BiSolidArrowToRight } from 'react-icons/bi';

export default function Recipes() {
  return (
    <section className="grid grid-cols-4">
      <StyledCard>
        <CardHeader>
          <CardTitle className="mb-2">Sample Recipe</CardTitle>
          <StyledSeparator />
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="font-semibold">
              Prep Time: <span className="text-muted-foreground"> 30 Min</span>
            </p>

            <p className="font-semibold">
              Cook Time: <span className="text-muted-foreground"> 15 Min</span>
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc pl-4 mb-4">
            <li>
              Idk how we are going to get the recipe but i think we will use
              open ai
            </li>
            <li>
              This will just list the ingredients, i was thinking of checkbox
              but idk if thats feasable cause im tired
            </li>
            <li>
              But here we really want to emphasize the items they already have
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button>
            See steps 
          </Button>
        </CardFooter>
      </StyledCard>
    </section>
  );
}
