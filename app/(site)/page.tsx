import ThemeDivider from "@/components/ThemeDivider"
import text from "../../public/locales/fa/common.json";
import Image from "next/image";


export default function HomePage() {

  return (
    <ThemeDivider>
      <h1 className="text-4xl font-bold text-center text-purple-600">{text.messages.welcome}</h1>

      <div className="flex justify-center mt-6">
      
      </div>



    <div className="flex flex-col md:flex-row items-center md:justify-between p-4  rounded">
      <div className="md:w-3/4 text-lg font-semibold ml-3 mb-4 md:mb-0 text-justify whitespace-pre-line">
      {text.hero_section_text}
      </div>
      <div className="md:w-1/4 flex justify-center md:justify-end overflow-hidden rounded">
      <Image
        src="/images/coffee-article.jpg"
        alt="coffee-article"
        width={350}
        height={150}
        className="object-cover w-full h-full"
      />
    </div>
    </div>




    <div className="flex flex-col md:flex-row items-center md:justify-between p-4  rounded">
      <div className="md:w-1/4 flex justify-center md:justify-end overflow-hidden rounded">
      <Image
        src="/images/man-article.jpg"
        alt="coffee-article"
        width={350}
        height={150}
        className="object-cover w-full h-full"
      />
    </div>

      <div className="md:w-3/4 text-lg font-semibold mr-6 mb-4 md:mb-0 text-justify whitespace-pre-line">
      {text.hero_section_text}
      </div>
    </div>



    </ThemeDivider>
    
  )
}
