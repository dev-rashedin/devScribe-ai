import { revealVariants } from "../../lib/utils"
import { TimelineContent } from "./index"


const HomeSectionHeading = ({title, subtitle, ref} : HomeSectionHeadingProps) => {
  return (
         <article className='max-w-screen mx-auto text-center space-y-2 mb-16 lg:mb-20'>
            <TimelineContent
              as='h2'
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={ref}
            >
            {title}
            </TimelineContent>
      {subtitle && (
         <TimelineContent
              as='p'
              className='mx-auto md:text-lg text-muted'
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={ref}
            >
            {subtitle}
            </TimelineContent>
           )}
          </article>
  )
}
export default HomeSectionHeading