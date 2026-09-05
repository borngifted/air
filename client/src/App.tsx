import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Curriculum from "./pages/Curriculum";
import PathDetail from "./pages/PathDetail";
import Lesson from "./pages/Lesson";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import CommunityPost from "./pages/CommunityPost";
import Profile from "./pages/Profile";
import TrainerKnowledge from "./pages/TrainerKnowledge";
import TrainerResource from "./pages/TrainerResource";
import MediaAdmin from "./pages/MediaAdmin";
import { OnboardingGate } from "./components/OnboardingGate";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCommunity from "./pages/AdminCommunity";
import CameraLab from "./pages/CameraLab";
import PresentationMode from "./pages/PresentationMode";
import LaunchStatus from "./pages/LaunchStatus";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/curriculum"} component={Curriculum} />
      <Route path="/paths/:slug">{params => <PathDetail slug={params.slug} />}</Route>
      <Route path="/learn/:slug">{params => <Lesson slug={params.slug} />}</Route>
      <Route path={"/onboarding"} component={Onboarding} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/community"} component={Community} />
      <Route path={"/studio"} component={CameraLab} />
      <Route path={"/present"} component={PresentationMode} />
      <Route path={"/launch"} component={LaunchStatus} />
      <Route path="/community/:id">{params => <CommunityPost id={Number(params.id)} />}</Route>
      <Route path="/members/:id">{params => <Profile id={Number(params.id)} />}</Route>
      <Route path={"/trainers"} component={TrainerKnowledge} />
      <Route path="/trainers/:slug">{params => <TrainerResource slug={params.slug} />}</Route>
      <Route path={"/admin/media"} component={MediaAdmin} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin/community"} component={AdminCommunity} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const routerBase = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={routerBase}><OnboardingGate><Router /></OnboardingGate></WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
