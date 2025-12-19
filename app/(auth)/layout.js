export default function AuthLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
