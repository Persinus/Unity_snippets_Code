
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách Bảo mật | Unity Codex',
  description: 'Chính sách bảo mật của Unity Codex, giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8 prose prose-invert">
      <h1>Chính sách Bảo mật</h1>

      <p>Cập nhật lần cuối: [Ngày]</p>

      <p>
        Chào mừng bạn đến với Unity Codex. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu cá nhân của bạn. Chính sách bảo mật này sẽ thông báo cho bạn về cách chúng tôi xử lý dữ liệu cá nhân của bạn khi bạn truy cập trang web của chúng tôi.
      </p>

      <h2>1. Dữ liệu chúng tôi thu thập</h2>
      <p>
        Chúng tôi có thể thu thập, sử dụng, lưu trữ và chuyển các loại dữ liệu cá nhân khác nhau về bạn như sau:
      </p>
      <ul>
        <li>
          <strong>Dữ liệu Danh tính:</strong> bao gồm tên, tên người dùng hoặc định danh tương tự. Khi bạn đăng nhập bằng Google, chúng tôi sẽ nhận được tên và địa chỉ email của bạn từ tài khoản Google của bạn.
        </li>
        <li>
          <strong>Dữ liệu Liên hệ:</strong> bao gồm địa chỉ email.
        </li>
        <li>
          <strong>Dữ liệu Kỹ thuật:</strong> bao gồm địa chỉ giao thức internet (IP), dữ liệu đăng nhập, loại và phiên bản trình duyệt.
        </li>
         <li>
          <strong>Dữ liệu Người dùng:</strong> bao gồm các bình luận bạn đăng và các snippet bạn đánh dấu.
        </li>
      </ul>

      <h2>2. Cách chúng tôi sử dụng dữ liệu của bạn</h2>
      <p>
        Chúng tôi sẽ chỉ sử dụng dữ liệu cá nhân của bạn khi pháp luật cho phép. Phổ biến nhất, chúng tôi sẽ sử dụng dữ liệu cá nhân của bạn trong các trường hợp sau:
      </p>
      <ul>
        <li>Để xác thực bạn với tư cách là người dùng và cho phép bạn bình luận hoặc đánh dấu các snippet.</li>
        <li>Để quản lý mối quan hệ của chúng tôi với bạn, bao gồm cả việc thông báo cho bạn về những thay đổi đối với các điều khoản hoặc chính sách bảo mật của chúng tôi.</li>
        <li>Để quản trị và bảo vệ doanh nghiệp và trang web này (bao gồm khắc phục sự cố, phân tích dữ liệu).</li>
      </ul>

      <h2>3. Chia sẻ dữ liệu của bạn</h2>
      <p>
        Chúng tôi không bán, phân phối hoặc cho thuê thông tin cá nhân của bạn cho các bên thứ ba trừ khi chúng tôi có sự cho phép của bạn hoặc được pháp luật yêu cầu làm như vậy.
      </p>

      <h2>4. Bảo mật dữ liệu</h2>
      <p>
        Chúng tôi đã đưa ra các biện pháp bảo mật phù hợp để ngăn dữ liệu cá nhân của bạn vô tình bị mất, bị sử dụng hoặc truy cập một cách trái phép, bị thay đổi hoặc bị tiết lộ.
      </p>

       <h2>5. Liên hệ với chúng tôi</h2>
      <p>
        Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi tại email: <a href="mailto:privacy@unitycodex.com" className="text-primary hover:underline">privacy@unitycodex.com</a>.
      </p>
    </div>
  );
}
