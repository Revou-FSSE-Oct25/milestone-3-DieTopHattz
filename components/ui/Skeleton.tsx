import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
  animate?: boolean
}

export default function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-gray-200 dark:bg-gray-700',
        animate && 'animate-pulse',
        className
      )}
    />
  )
}