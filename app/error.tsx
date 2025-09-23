"use client"


import text from "../public/locales/fa/common.json"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-red-600">{text.messages.error}</h1>
      <p className="text-gray-600 mb-6">{error.message || text.messages.unexpected_error}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        {text.buttons.retry}
      </button>
    </div>
  )
}
