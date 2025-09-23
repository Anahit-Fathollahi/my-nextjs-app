
import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'
import Providers from './Providers'

import ThemeDivider from '@/components/ThemeDivider'
import { ScrollToTop } from './components/ScrollToTop';
import text from "../public/locales/fa/common.json"
import Header from '@/components/Header';

export const metadata = {
  title: text.site_title,
  description: text.site_description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <ThemeDivider>
          <Providers>
            <Header />
            <main>
               <ScrollToTop />
              {children}</main>
          </Providers>
          </ThemeDivider>
        </ThemeProvider>
      </body>
    </html>
  )
}
