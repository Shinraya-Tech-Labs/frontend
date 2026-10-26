import FadeContent from "@/components/approved/FadeContent";

// App Router templates remount on navigation; the sourced fade plays on entry.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <FadeContent
      duration={0.32}
      initialOpacity={0.35}
      threshold={0}
      className="route-entry"
    >
      {children}
    </FadeContent>
  );
}
