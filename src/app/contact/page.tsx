
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Liên hệ | Unity Codex',
  description: 'Liên hệ với chúng tôi để đặt câu hỏi, góp ý hoặc hợp tác.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-lg text-muted-foreground">
          Chúng tôi luôn sẵn lòng lắng nghe từ bạn.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Hỗ trợ qua Email</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Đối với các câu hỏi chung, hợp tác hoặc hỗ trợ kỹ thuật, vui lòng gửi email cho chúng tôi. Chúng tôi sẽ cố gắng trả lời trong thời gian sớm nhất.
            </p>
            <Link href="mailto:contact@unitycodex.com" className="mt-4 inline-block font-semibold text-primary hover:underline">
              contact@unitycodex.com
            </Link>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Đóng góp Snippet</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Bạn có một đoạn code hay muốn chia sẻ? Chúng tôi rất hoan nghênh sự đóng góp của bạn để làm phong phú thêm kho tàng kiến thức của cộng đồng.
            </p>
             <Link href="mailto:submit@unitycodex.com" className="mt-4 inline-block font-semibold text-primary hover:underline">
              submit@unitycodex.com
            </Link>
          </CardContent>
        </Card>
      </div>

       <div className="text-center">
        <h2 className="font-headline text-3xl font-bold">Câu hỏi thường gặp</h2>
        <p className="mt-2 text-muted-foreground">Trước khi liên hệ, có thể bạn sẽ tìm thấy câu trả lời tại đây.</p>
        
        <div className="mt-8 flex justify-center">
            <Card className="max-w-2xl text-left">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-primary"/>
                        <span>Làm thế nào để tìm kiếm snippet hiệu quả?</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Bạn có thể sử dụng thanh tìm kiếm ở đầu trang để tìm theo tiêu đề hoặc mô tả. Ngoài ra, hãy tận dụng các bộ lọc theo Nền tảng (Category) và Tag để thu hẹp kết quả tìm kiếm một cách chính xác nhất.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
