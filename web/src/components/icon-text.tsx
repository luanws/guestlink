import { LucideIcon } from 'lucide-react'

interface IconInfoProps {
  Icon: LucideIcon
  info: string
}

export function IconText({ Icon, info }: IconInfoProps) {
  return (
    <div className='flex items-center justify-start'>
      <Icon />
      <span className='ml-2'>
        {info}
      </span>
    </div>
  )
}