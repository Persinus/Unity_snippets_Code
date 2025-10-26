'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser, useFirestore } from '@/firebase';
import { toast } from 'sonner';
import { BadgeCheck, Codepen, Star, Unlock } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';

interface ProActivationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRO_ACTIVATION_CODE = 'FaEE2405';

export default function ProActivationDialog({ open, onOpenChange }: ProActivationDialogProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !firestore) {
      toast.error('Bạn cần đăng nhập để thực hiện hành động này.');
      return;
    }
    if (code.trim() !== PRO_ACTIVATION_CODE) {
      toast.error('Mã kích hoạt không hợp lệ. Vui lòng thử lại.');
      return;
    }

    setIsLoading(true);
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, { isPro: true });
      
      toast.success('Chúc mừng! Tài khoản của bạn đã được nâng cấp lên PRO.');
      onOpenChange(false); // Close dialog on success
      
      // Force a reload to get new claims reflected everywhere
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      console.error("Error setting pro status:", error);
      toast.error(error.message || 'Không thể nâng cấp tài khoản. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: <Codepen className="h-5 w-5 text-primary" />, text: 'Truy cập các snippet độc quyền.' },
    { icon: <BadgeCheck className="h-5 w-5 text-primary" />, text: 'Huy hiệu PRO nổi bật trên hồ sơ.' },
    { icon: <Unlock className="h-5 w-5 text-primary" />, text: 'Mở khóa các tính năng cao cấp trong tương lai.' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center items-center mb-4">
             <div className="bg-primary/10 p-4 rounded-full w-fit">
                <Star className="h-10 w-10 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold">Kích hoạt Tài khoản PRO</DialogTitle>
          <DialogDescription className="text-center">
            Mở khóa toàn bộ tiềm năng của Unity Codex với các quyền lợi độc quyền.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <ul className="space-y-3 text-muted-foreground">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                        {benefit.icon}
                        <span>{benefit.text}</span>
                    </li>
                ))}
            </ul>
          <div className="space-y-2">
            <label htmlFor="activation-code" className="text-sm font-medium">Mã kích hoạt</label>
            <Input
              id="activation-code"
              placeholder="Nhập mã của bạn tại đây"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? 'Đang xử lý...' : 'Kích hoạt ngay'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
