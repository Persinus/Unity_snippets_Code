
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Về chúng tôi | Unity Codex',
  description: 'Tìm hiểu thêm về Unity Codex, sứ mệnh và mục tiêu của chúng tôi trong việc xây dựng cộng đồng chia sẻ kiến thức Unity C#.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Về Unity Codex
        </h1>
        <p className="text-lg text-muted-foreground">
          Xây dựng một kho tàng kiến thức dành cho các nhà phát triển game Unity.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Sứ mệnh của chúng tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Sứ mệnh của Unity Codex là tạo ra một nền tảng tập trung, chất lượng cao, nơi các nhà phát triển Unity có thể dễ dàng tìm kiếm, chia sẻ và thảo luận về các đoạn mã (snippet) hữu ích. Chúng tôi tin rằng việc chia sẻ kiến thức sẽ thúc đẩy sự sáng tạo và giúp mọi người cùng nhau phát triển nhanh hơn.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Unity Codex là gì?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Unity Codex không chỉ là một blog hay một diễn đàn. Nó là một kho lưu trữ có tổ chức, được quản lý cẩn thận với các đoạn code snippet thực tế, kèm theo giải thích rõ ràng và các thẻ (tag) phân loại chi tiết. Từ những người mới bắt đầu đến các lập trình viên có kinh nghiệm, ai cũng có thể tìm thấy giá trị tại đây.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold">Gặp gỡ đội ngũ</h2>
        <p className="mt-2 text-muted-foreground">Chúng tôi là những nhà phát triển đam mê với mong muốn xây dựng cộng đồng.</p>
        
        <div className="mt-8 flex justify-center">
            <Card className="max-w-sm">
                <CardHeader className="items-center">
                     <div className="rounded-full bg-primary/10 p-4">
                        <Users className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Cộng đồng Unity Việt Nam</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">
                        Unity Codex được xây dựng và duy trì bởi một đội ngũ các nhà phát triển game đầy nhiệt huyết, với hy vọng đóng góp một phần nhỏ vào sự phát triển của cộng đồng Unity tại Việt Nam và trên toàn thế giới.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
