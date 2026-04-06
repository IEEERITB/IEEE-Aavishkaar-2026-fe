import { Landing } from "@/components/Landing";

export default function Home() {
  return (
    <main className="relative flex-grow">
      {/* 
          The Landing component already contains the Matrix background, 
          Hero section, and Events section. We render it directly here 
          to avoid duplication.
      */}
      <Landing />
    </main>
  );
}