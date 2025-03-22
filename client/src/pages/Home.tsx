import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/Header/ThemeChanger";
import Profile from "../components/Header/Profile";
import SidebarOptions from "../components/SidebarOptions";
import { Bell, Menu, Clapperboard, Search,GithubIcon } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Outlet } from "react-router-dom";

import { Button } from "../components/ui/button";
 import {
  Card,
  CardContent
 
} from "../components/ui/card"; 

import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";


export const HomePage: FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();  

  
  const handleSearch = (value: string) => {
    setSearch(value);
  }

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);  
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Clapperboard className="h-6 w-6" />
              <span className="">Video Hub</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <SidebarOptions />
          </div>
           <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              {/* <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader> */}
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link to="https://github.com/SarojKumarRanjan/Videotube">
                <Button size="sm" className="w-full">
                  <GithubIcon className="h-4 w-4 mr-2" />
                  Github
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div> 
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SidebarOptions />
               <div className="mt-auto">
                <Card>
                  {/* <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader> */}
                  <CardContent>
                  <Link to="https://github.com/SarojKumarRanjan/Videotube">
                <Button size="sm" className="w-full">
                  <GithubIcon className="h-4 w-4 mr-2" />
                  Github
                </Button>
                </Link>
                  </CardContent>
                </Card>
              </div> 
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form onSubmit={handleSubmit}>  {/* Handle form submit */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}  // Update search value on change
                />
              </div>
            </form>
          </div>

          <Profile />
          <ModeToggle />
        </header>
        <main className="w-full">
          <ScrollArea className="h-[calc(100vh-60px)]">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};
