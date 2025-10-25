'use client';

import { useUser } from '@/firebase';
import { setAdminClaim } from '@/lib/admin';
import { useUserClaims } from '@/lib/user-claims';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import AdminDashboard from './admin-dashboard';
import AdminRoute from '@/components/layout/admin-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { useState } from 'react';

const ADMIN_EMAIL = 'procnttdzaivl@gmail.com';

export default function AdminPage() {
  const { user } = useUser();
  const { claims, isLoading: claimsLoading } = useUserClaims();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimAdmin = async () => {
    if (user?.email !== ADMIN_EMAIL) {
      toast({
        variant: 'destructive',
        title: 'Không được phép',
        description: 'Chỉ chủ sở hữu trang web mới có thể thực hiện hành động này.',
      });
      return;
    }

    setIsClaiming(true);
    try {
      const result = await setAdminClaim(ADMIN_EMAIL);
      toast({
        title: 'Thành công!',
        description: result.message,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Đã xảy ra lỗi',
        description: error.message,
      });
    } finally {
      setIsClaiming(false);
    }
  };

  // If user is not the designated admin, show nothing.
  // The AdminRoute will handle redirection for non-admins.
  if (user && user.email !== ADMIN_EMAIL && !claims?.admin) {
     return (
        <AdminRoute> 
            <div></div>
        </AdminRoute>
     );
  }

  // Show the grant admin UI if the user is the designated admin but doesn't have the claim yet.
  if (user?.email === ADMIN_EMAIL && !claims?.admin) {
    return (
        <div className="container mx-auto flex items-center justify-center py-20">
            <Card className="max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <Shield className="h-12 w-12 text-primary"/>
                    </div>
                    <CardTitle className="mt-4 text-2xl">Cấp quyền Quản trị viên</CardTitle>
                    <CardDescription>
                        Bạn đã đăng nhập với tài khoản admin. Nhấn nút bên dưới để cấp quyền quản trị viên cho tài khoản của bạn.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleClaimAdmin} disabled={isClaiming} className="w-full">
                        {isClaiming ? 'Đang xử lý...' : 'Cấp quyền Admin cho tôi'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  // If user is an admin, show the dashboard, protected by AdminRoute.
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
}
