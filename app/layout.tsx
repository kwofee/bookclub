import type { Metadata } from "next";
import "@/styles/globals.css"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Book Club",
  description: "Book Club!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              
              <div className="flex min-h-screen w-full flex-col">
                
                <SidebarProvider>
                  <AppSidebar/>
                  <div className="flex flex-col flex-1">
                    <Header />
                    <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                      {children}
                    </main>
                  </div>
                </SidebarProvider>
              </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  );
}
