import text from "../../../public/locales/fa/common.json";

export default function ContactPage() {
  async function handleSubmit(formData: FormData) {
    "use server"

    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    console.log("پیام جدید:", { name, email, message })

  }

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded space-y-4">
      <h1 className="text-3xl font-bold text-purple-600">{text.contact_us}</h1>
      <form action={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={text.name}
          className="w-full border p-2 rounded placeholder-gray-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder={text.email}
          className="w-full border p-2 rounded placeholder-gray-500"
          required
        />
        <textarea
          name="message"
          placeholder={text.yourMessage}
          className="w-full border p-2 rounded placeholder-gray-500"
          rows={5}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
         {text.buttons.sendMessage}
        </button>
      </form>
    </div>
  )
}
