import { Sidebar } from './sidebar';
import { Header } from './header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed on desktop, overlay on mobile */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
