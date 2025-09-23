import text from "../../public/locales/fa/common.json"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col border-4 border-purple-200 rounded-xl p-6">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-purple-600">{text.layout.general_section}</h2>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-6 text-center text-gray-500">
        {text.layout.all_rights}
      </footer>
    </div>
  )
}
