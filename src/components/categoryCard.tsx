import Image from 'next/image'

interface CategoryCardProps {
   imagePath: string
   categoryGroupName: string
   categoryGroupDescription: string
}

export default function CategoryCard({ imagePath, categoryGroupName, categoryGroupDescription }: CategoryCardProps) {
   return (
      <div className="w-48 flex flex-col items-center justify-center">
         <Image
            src={imagePath}
            className="w-full h-36 object-cover rounded-2xl overflow-hidden"
            width={5436}
            height={3624}
            alt={categoryGroupName}
         />
         <p className="w-full h-7 mt-1 items-center justify-center flex font-semibold text-xl">
            {categoryGroupName}
         </p>
         <p className="w-full items-center justify-center flex text-sm text-center">
            {categoryGroupDescription}
         </p>
      </div>
   )
}
