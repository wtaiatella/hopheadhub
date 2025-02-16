import ThemeToggle from "@/components/themeToggle";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-[url('/bg-site.jpg')] bg-repeat dark:bg-none transition-colors duration-200">
      <p className="text-2xl font-bold mb-4">Project HHH</p>
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <ThemeToggle />
      </div>
    </div>
  );
}
