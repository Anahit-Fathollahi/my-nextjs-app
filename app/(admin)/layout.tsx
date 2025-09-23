import text from "../../public/locales/fa/common.json"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">{text.dashboard_management}</h1>
      <p className="mt-4">{text.post_management}</p>

      <div className="mt-6">{children}</div>
    </div>
  )
}
