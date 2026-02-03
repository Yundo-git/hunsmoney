import { Summation } from "./components/Summation";
import { Navbar } from "./ui/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Summation />
      </main>
    </div>
  );
}
