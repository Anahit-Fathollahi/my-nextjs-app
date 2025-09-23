/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src="/images/not-found-image.jpg"
        alt={"not-found"}
        width={600}
        height={400}
        className="object-cover rounded-lg"
        />
      <h1 className="text-4xl font-bold mb-4">صفحه مورد نظر پیدا نشد</h1>
      <p className="text-gray-600">لطفا آدرس را بررسی کنید یا به صفحه اصلی برگردید.</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        بازگشت به خانه
      </a>
    </div>
  )
}
