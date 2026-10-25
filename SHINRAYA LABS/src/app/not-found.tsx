import Link from "next/link";
import { PageIntro } from "@/components/editorial";
export default function NotFound() {
  return (
    <>
      <PageIntro
        number="404"
        title="An unexplored path."
        description="This page could not be found. The research is still here."
      />
      <div className="shell not-found-actions">
        <Link href="/" className="button">
          Return to the lab →
        </Link>
      </div>
    </>
  );
}
