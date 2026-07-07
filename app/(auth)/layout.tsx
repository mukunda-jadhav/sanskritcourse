export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-950 dark:to-amber-950/20 sanskrit-pattern px-4 py-12">
      {children}
    </div>
  );
}
