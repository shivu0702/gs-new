import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="mt-3">
          Thank you for your purchase 🎉
        </p>

        <Link href="/">
          <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
} 