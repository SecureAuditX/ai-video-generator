import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="h-20 border-b border-white/5 bg-black/10 backdrop-blur-md sticky top-0 z-20 w-full flex items-center justify-end px-8">
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
