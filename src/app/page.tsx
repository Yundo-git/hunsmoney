import { Summation } from "./components/home/Summation";
import { Navbar } from "./components/nav/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="lg:ml-64 p-4">
        <Summation />
      </main>
    </div>
  );
}
