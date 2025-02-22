import CategoryCard from '@/components/categoryCard'

export default function CategorySection() {
   return (
      <div className="container mx-auto flex justify-evenly mt-16">
         <CategoryCard
            imagePath="/assets/cat-networking.jpeg"
            categoryGroupName="Enthusiastic"
            categoryGroupDescription="Find tournments, classes, and more"
         />
         <CategoryCard
            imagePath="/assets/cat-networking.jpeg"
            categoryGroupName="Enthusiastic"
            categoryGroupDescription="Find tournments, classes, and more"
         />
         <CategoryCard
            imagePath="/assets/cat-networking.jpeg"
            categoryGroupName="Enthusiastic"
            categoryGroupDescription="Find tournments, classes, and more"
         />
      </div>
   )
}
