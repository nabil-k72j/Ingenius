import { Button } from "@/components/ui/button";
import Link from "next/link";

const landingPage = () => {
  return (
    <div className="h-full flex items-center justify-center gap-12 flex-col">
      <h1 className="text-5xl">genius</h1>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <Button>Sing In</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="destructive">Sing Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default landingPage;
