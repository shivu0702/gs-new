import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div
        className="h-[400px] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-3xl ml-10 font-bold">
          GS Enterprises - Fabrication Solutions
        </h1>
      </div>
    </div>
  );
}