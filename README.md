# Unity Codex - Kho Tàng Snippet Dành Cho Lập Trình Viên Unity

![Unity Codex Homepage](https://github.com/user-attachments/assets/860e9b7a-8638-48c4-a91e-32b779956ad0)

## 📜 Giới thiệu

**Unity Codex** là một nền tảng web hiện đại, được xây dựng với mục tiêu trở thành một kho lưu trữ tập trung, chất lượng cao dành cho cộng đồng lập trình viên game Unity. Tại đây, các nhà phát triển có thể dễ dàng tìm kiếm, khám phá, chia sẻ và lưu trữ những đoạn mã (code snippet) C# hữu ích, từ những giải pháp đơn giản cho người mới bắt đầu đến những kiến trúc phức tạp cho các dự án lớn.

## ✨ Tính năng nổi bật

- **🎨 Giao diện hiện đại & responsive:** Trải nghiệm mượt mà trên cả máy tính và thiết bị di động với chế độ Sáng/Tối (Light/Dark mode).
- **🔍 Tìm kiếm & Lọc thông minh:** Dễ dàng tìm kiếm snippet theo tiêu đề, mô tả và lọc kết quả một cách chính xác theo Nền tảng (2D, 3D, Mobile...) và Tags (Physics, UI, AI, Animation...).
- **💻 Hiển thị code chuyên nghiệp:** Các đoạn mã được làm nổi bật cú pháp (syntax highlighting) rõ ràng, đi kèm nút "Sao chép" tiện lợi.
- **👤 Hệ thống người dùng:** Đăng nhập nhanh chóng và an toàn qua tài khoản Google.
- **🔖 Đánh dấu (Bookmark):** Lưu lại những snippet yêu thích vào trang hồ sơ cá nhân để xem lại bất cứ lúc nào.
- **💬 Thảo luận & Bình luận:** Để lại bình luận, đặt câu hỏi hoặc chia sẻ kinh nghiệm ngay dưới mỗi snippet.
- **🚀 Tối ưu SEO:** Tự động tạo `sitemap.xml` và `robots.txt` để các công cụ tìm kiếm dễ dàng lập chỉ mục tất cả các trang và bài viết.
- **♿ Đảm bảo khả năng tiếp cận (Accessibility):** Tuân thủ các tiêu chuẩn cơ bản về Web Accessibility, giúp trang web thân thiện hơn với người dùng sử dụng trình đọc màn hình.

## 🚀 Công nghệ sử dụng

Dự án được xây dựng trên một nền tảng công nghệ hiện đại và mạnh mẽ:

| Công nghệ         | Vai trò                                       |
| ----------------- | ---------------------------------------------- |
| **Next.js**       | Framework React cho ứng dụng full-stack.       |
| **React**         | Thư viện xây dựng giao diện người dùng.       |
| **TypeScript**    | Ngôn ngữ lập trình giúp tăng cường độ tin cậy. |
| **Tailwind CSS**  | Framework CSS utility-first để tạo style nhanh. |
| **shadcn/ui**     | Bộ sưu tập component UI đẹp và dễ tùy chỉnh.   |
| **Firebase**      | Nền tảng backend (Authentication, Firestore).   |
| **Genkit (AI)**   | Framework để tích hợp các tính năng AI (dự phòng). |
| **Lucide React**  | Bộ sưu tập icon gọn nhẹ và nhất quán.         |

[![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

## 🎯 Đối tượng sử dụng

- **Người mới bắt đầu học Unity:** Tìm kiếm các đoạn mã mẫu cho các chức năng cơ bản như di chuyển nhân vật, tạo vật thể, xử lý va chạm.
- **Lập trình viên Unity có kinh nghiệm:** Lưu trữ các giải pháp cá nhân, khám phá các kỹ thuật mới và các mẫu thiết kế (design pattern) hiệu quả.
- **Các đội nhóm phát triển game:** Xây dựng một thư viện code nội bộ để tái sử dụng và chia sẻ kiến thức trong team.

## 🌊 Luồng hoạt động của trang web

1.  **Khám phá:** Người dùng truy cập trang chủ, xem danh sách các snippet mới nhất.
2.  **Tìm kiếm & Lọc:** Người dùng sử dụng thanh tìm kiếm hoặc các bộ lọc để tìm snippet mình cần.
3.  **Xem chi tiết:** Người dùng nhấp vào một snippet để xem mã nguồn, mô tả chi tiết và các bình luận.
4.  **Tương tác (yêu cầu đăng nhập):**
    - Người dùng đăng nhập bằng Google.
    - Sau khi đăng nhập, họ có thể **đánh dấu** snippet để lưu vào trang cá nhân.
    - Họ cũng có thể **viết bình luận** để thảo luận về snippet.
5.  **Quản lý cá nhân:** Người dùng truy cập trang hồ sơ (`/profile`) để xem lại danh sách các snippet đã đánh dấu.

## 🛠️ Cách sử dụng (For Developers)

1.  **Clone repository:**
    ```bash
    git clone https://your-repository-url.git
    cd your-project-folder
    ```
2.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```
3.  **Cấu hình Firebase:**
    - Tạo một dự án trên [Firebase Console](https://console.firebase.google.com/).
    - Kích hoạt **Authentication** (với Google Provider) và **Firestore Database**.
    - Lấy thông tin cấu hình của dự án và cập nhật vào tệp `src/firebase/config.ts`.
4.  **Chạy ứng dụng ở môi trường development:**
    ```bash
    npm run dev
    ```
    Mở trình duyệt và truy cập `http://localhost:9002`.

## 🔚 Kết luận

Unity Codex không chỉ là một công cụ, mà còn là một nỗ lực để xây dựng một cộng đồng chia sẻ kiến thức, giúp các lập trình viên Unity tại Việt Nam và trên thế giới cùng nhau tiến bộ. Dự án được thiết kế với khả năng mở rộng trong tương lai, chẳng hạn như cho phép người dùng tự đóng góp snippet, tạo hệ thống đánh giá, và tích hợp sâu hơn các tính năng AI.

## ❤️ Cảm ơn

Xin chân thành cảm ơn bạn đã quan tâm đến dự án Unity Codex. Mọi sự đóng góp và phản hồi đều vô cùng quý giá!
