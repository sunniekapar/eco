import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Background from './components/Background';
import { PiLeafFill } from 'react-icons/pi';
import { SiDiscord } from 'react-icons/si';

import Overview from './layouts/Overview';
import Friends from './layouts/Friends';
import Inventory from './layouts/Inventory';

import { useEffect, useState } from 'react';
import { UserDataProps, ItemTableProps, RecipeProps } from './types';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Set up supabase
const SUPABASE_PROJECT_URL = 'https://ebsamovagbktsulxqrzi.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVic2Ftb3ZhZ2JrdHN1bHhxcnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNDA0NTMsImV4cCI6MjAyMzcxNjQ1M30.MgTZj2K4a7HydhTDNdVDDEKqtT8aSHkkCGPECvrJ-GM';
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

// Set up OpenAI
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export default function App() {
  //Data states
  const [userData, setUserData] = useState<UserDataProps[] | []>([]);
  const [itemData, setItemData] = useState<ItemTableProps | []>([]);
  const [recipeData, setRecipeData] = useState<RecipeProps | {}>({});

  //Loading States
  const [userFetched, setUserFetched] = useState<boolean>(false);
  const [itemFetched, setItemFetched] = useState<boolean>(false);
  const [recipeFetched, setRecipeFetched] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
    fetchItemData();
  }, []);

  //All API calls
  async function fetchUserData() {
    setUserFetched(false);

    const response = await supabase
      .from('user_data')
      .select('name, footprint, num_donations, num_points, history');

    if (!response || !response.data) {
      console.log('updateEverything() returned null');
      return;
    }

    const months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May,',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];

    const data: UserDataProps[] = response.data.map((user) => ({
      name: user.name,
      footprint: Number((user.footprint * 1.9).toPrecision(2)),
      num_donations: user.num_donations,
      num_points: user.num_points,
      history: user.history.map((weight: number, i: number) => ({
        name: months[i],
        kg: weight,
      })),
    }));
    setUserData([...data]);
    setUserFetched(true);
  }

  async function fetchItemData() {
    setItemFetched(false);
    const { data } = await supabase
      .from('food')
      .select('item_name, expire_at, item_count', { count: 'estimated' })
      .eq('item_owner', 'Test user 0');

    if (!data) {
      console.log('Returned data list is null.');
      return;
    }

    const newData: ItemTableProps = data.map((d) => ({
      item: d.item_name,
      expiryDate: new Date(d.expire_at).toDateString(),
      count: d.item_count,
    }));

    setItemData(newData);
    setItemFetched(true);
    fetchRecipeData(newData.map((item) => item.item));
  }

  async function fetchRecipeData(ingredients: string[]) {
    setRecipeFetched(false);
    const newRecipe = await promptRecipeData(ingredients);
    setRecipeData(newRecipe);
    setRecipeFetched(true);
  }

  //Called in fetchItemData
  async function promptRecipeData(ingredients: any) {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Generate a recipe with ${ingredients.toString()}, returning a JSON without codeblocks. Format the JSON as so: 
          dish:[Title of dish], 
          description:[10 word description of dish], 
          cookTime:[Cook time in minutes rounded to the nearest integer], 
          prepTime:[Time it takes to prepare the dish in minutes rounded to the nearest integer], 
          ingredients:[Ingredients], 
          instructions:[Instructions to cook the dish]`,
        },
      ],
      model: 'gpt-4-turbo-preview',
    });
    if (response.choices[0].message.content !== null) {
      try {
        const jsonData = JSON.parse(response.choices[0].message.content);
        return jsonData;
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    } else {
      console.error('Response content is null');
      return null;
    }
  }

  return (
    <>
      {!userFetched && !itemFetched ? (
        <></>
      ) : (
        <div className="relative mx-auto w-full flex min-h-[100vh] justify-center">
          <Background />
          <main className="w-full max-w-screen-2xl px-2.5 md:px-20 py-8 lg:pb-0 ">
            <nav className="flex items-center gap-4 mb-8 text-4xl">
              <PiLeafFill className="text-2xl mt-2.5 -mr-2.5 text-green-700" />
              <h1 className="font-medium">eco</h1>
            </nav>
            <h2 className="mb-4 text-3xl font-semibold">Dashboard</h2>
            <Tabs defaultValue="overview" className="min-h-[625px]">
              <div className="relative mb-4 group w-min">
                <div className="absolute -inset-0.5 bg-gradient-to-r  to-green-900 from-green-700 rounded-lg blur-sm opacity-20 group-hover:opacity-25 transition duration-1000 group-hover:duration-500"></div>

                <TabsList className="relative ">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview">
                <Overview userData={userData} userFetched={userFetched} />
              </TabsContent>
              <TabsContent value="friends">
                <Friends userData={userData} userFetched={userFetched} />
              </TabsContent>
              <TabsContent value="inventory">
                <Inventory
                  itemData={itemData}
                  recipeData={recipeData}
                  itemFetched={itemFetched}
                  recipeFetched={recipeFetched}
                  handleRefresh={fetchItemData}
                />
              </TabsContent>
            </Tabs>
            <footer className="flex gap-2.5 items-center py-4">
              <p className="text-sm text-muted-foreground">
                Come join our community!
              </p>
              <a target="_blank" href="https://discord.gg/rwXnd4G2fv">
                <SiDiscord className="transition hover:fill-green-700 hover:cursor-pointer" />
              </a>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}
