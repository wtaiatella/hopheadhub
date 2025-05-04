import Link, { LinkProps } from 'next/link'
import { motion } from 'framer-motion'

interface HeaderLinkProps extends LinkProps {
   className?: string
   children: React.ReactNode
   isSelected?: boolean
   animationProps?: {
      layoutId?: string
      transition?: object
   }
}

export default function HeaderLink({ 
   className, 
   children, 
   isSelected = false, 
   animationProps = {
      layoutId: "underline",
      transition: { type: 'spring', stiffness: 500, damping: 30 }
   },
   ...rest 
}: HeaderLinkProps) {
   return (
      <Link
         className={`relative text-header-text hover:text-header-hover ${className || ''}`}
         {...rest}
      >
         {children}
         {isSelected && (
            <motion.div
               className="absolute bottom-0 left-0 right-0 h-1 bg-header-hover rounded"
               layoutId={animationProps.layoutId}
               initial={false}
               transition={animationProps.transition}
            />
         )}
      </Link>
   )
}
