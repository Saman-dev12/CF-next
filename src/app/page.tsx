import Head from "@/components/Head";
import Model from "@/components/Model";

export default function Home() {
  return (
    <>
    <Head/>
    <div className="flex items-center justify-center gap-4 h-screen">
      <div className="flex w-1/2"><Model/></div>
      <div className="flex w-1/2">World</div>
    </div>
    </>
  );
}
