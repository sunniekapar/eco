import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Friends from './layouts/Friends/Friends';
import Overview from './layouts/Overview/Overview';
import { GiGinkgoLeaf } from 'react-icons/gi';
import Recipes from './layouts/Recipes/Recipes';

function App() {
  return (
    <div className="relative mx-auto w-full flex h-[100vh] overflow-clip justify-center">
      <div className="absolute -z-10 h-full w-full ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_1px] [mask-image:radial-gradient(ellipse_60%_35%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute left-40 right-0 -top-16 h-[310px] w-[310px] rounded-full bg-green-700 opacity-20 blur-[100px]"></div>
      </div>
      <main className="w-full max-w-screen-2xl px-2.5 md:px-20 py-8 lg:pb-0 ">
        <nav className="flex items-center gap-4 text-4xl mb-8">
          <GiGinkgoLeaf className="-rotate-90" />

          <h1 className="font-medium">ECO</h1>
        </nav>
        <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
        <Tabs defaultValue="overview" className="h-[675px]">
          <div className="relative group w-min mb-4">
          <div className="absolute -inset-0.5 bg-gradient-to-r  to-green-900 from-green-700 rounded-lg blur-sm opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-500"></div>

            <TabsList className="relative ">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="friends">
            <Friends />
          </TabsContent>
          <TabsContent value="recipes">
            <Recipes />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
