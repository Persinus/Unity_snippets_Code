
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="bg-primary/10 p-6 rounded-full">
        <FileQuestion className="h-16 w-16 text-primary" />
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        404 - Không tìm thấy trang
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Quay về Trang chủ</Link>
      </Button>
    </div>
  )
}
