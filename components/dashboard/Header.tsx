import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="h-20 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-20 w-full flex items-center justify-end px-8">
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "h-10 w-10"
          }
        }}
        afterSignOutUrl="/" 
      />
    </header>
  );
}
