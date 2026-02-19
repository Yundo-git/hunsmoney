import { Navbar } from "../components/nav/Navbar";

export default function SettingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="lg:ml-64 lg:mt-20 p-4">
        <div className="max-w-6xl mx-auto">
          <h1>사용자 변경</h1>
          <p>현재 사용자: {""}</p>
          <select>
            <option value="">황도</option>
            <option value="">윤도</option>
          </select>
        </div>
      </main>
    </div>
  );
}
