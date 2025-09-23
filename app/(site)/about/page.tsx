import text from "../../../public/locales/fa/common.json"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-purple-600">درباره ما</h1>
      <p style={{ whiteSpace: "pre-line" }}>
        {text.about_text}
      </p>
    </div>
  )
}
