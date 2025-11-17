import { Metadata } from 'next';
import MainLayout from '../../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật - Quant Blog',
  description: 'Chính sách bảo mật và quyền riêng tư của người dùng tại Quant Blog',
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chính sách bảo mật
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Thông tin chúng tôi thu thập</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">1.1. Thông tin cá nhân</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Khi bạn đăng ký tài khoản trên Quant Blog, chúng tôi có thể thu thập các thông tin sau:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Họ và tên</li>
                  <li>Địa chỉ email</li>
                  <li>Tên đăng nhập (username)</li>
                  <li>Ảnh đại diện (nếu bạn tải lên)</li>
                  <li>Thông tin hồ sơ cá nhân (bio, website, mạng xã hội)</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">1.2. Thông tin tự động</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Khi bạn sử dụng dịch vụ, chúng tôi tự động thu thập:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Địa chỉ IP</li>
                  <li>Loại trình duyệt và phiên bản</li>
                  <li>Hệ điều hành</li>
                  <li>Thời gian truy cập</li>
                  <li>Trang được xem</li>
                  <li>Cookies và dữ liệu tương tự</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Cách chúng tôi sử dụng thông tin</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi sử dụng thông tin của bạn để:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Cung cấp và duy trì dịch vụ</li>
                  <li>Xác thực danh tính người dùng</li>
                  <li>Cá nhân hóa trải nghiệm người dùng</li>
                  <li>Gửi thông báo về bài viết mới, cập nhật hệ thống</li>
                  <li>Phân tích và cải thiện dịch vụ</li>
                  <li>Phát hiện và ngăn chặn gian lận</li>
                  <li>Tuân thủ nghĩa vụ pháp lý</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Chia sẻ thông tin</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Tuy nhiên, chúng tôi có thể chia sẻ thông tin trong các trường hợp sau:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Với sự đồng ý của bạn:</strong> Khi bạn cho phép chia sẻ</li>
                  <li><strong>Nhà cung cấp dịch vụ:</strong> Các đối tác giúp vận hành website (hosting, email, analytics)</li>
                  <li><strong>Yêu cầu pháp lý:</strong> Khi luật pháp yêu cầu hoặc để bảo vệ quyền lợi hợp pháp</li>
                  <li><strong>Chuyển nhượng kinh doanh:</strong> Trong trường hợp sáp nhập, mua bán công ty</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Bảo mật thông tin</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin của bạn:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Mã hóa dữ liệu truyền tải (HTTPS/SSL)</li>
                  <li>Mã hóa mật khẩu (bcrypt)</li>
                  <li>Kiểm soát truy cập hạn chế</li>
                  <li>Sao lưu dữ liệu định kỳ</li>
                  <li>Giám sát hệ thống liên tục</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Tuy nhiên, không có phương thức truyền tải qua Internet hoặc lưu trữ điện tử nào là 100% an toàn.
                  Chúng tôi không thể đảm bảo an ninh tuyệt đối.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Quyền của bạn</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Bạn có các quyền sau đối với thông tin cá nhân:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Truy cập:</strong> Yêu cầu xem thông tin chúng tôi lưu trữ về bạn</li>
                  <li><strong>Sửa đổi:</strong> Cập nhật thông tin cá nhân trong tài khoản</li>
                  <li><strong>Xóa:</strong> Yêu cầu xóa tài khoản và dữ liệu</li>
                  <li><strong>Từ chối:</strong> Từ chối nhận email marketing (vẫn nhận email hệ thống)</li>
                  <li><strong>Di chuyển:</strong> Yêu cầu xuất dữ liệu của bạn</li>
                  <li><strong>Khiếu nại:</strong> Liên hệ cơ quan bảo vệ dữ liệu nếu có vi phạm</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Để thực hiện các quyền này, vui lòng liên hệ: <strong>hoanyttv@gmail.com</strong>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies và công nghệ theo dõi</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi sử dụng cookies và công nghệ tương tự để:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Duy trì phiên đăng nhập</li>
                  <li>Ghi nhớ tùy chọn (theme, ngôn ngữ)</li>
                  <li>Phân tích lưu lượng truy cập</li>
                  <li>Cải thiện trải nghiệm người dùng</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Bạn có thể quản lý cookies qua cài đặt trình duyệt. Xem thêm tại <a href="/cookies" className="text-blue-600 hover:underline">Chính sách Cookie</a>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Lưu trữ dữ liệu</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi lưu trữ thông tin của bạn:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Trong thời gian tài khoản của bạn còn hoạt động</li>
                  <li>Theo yêu cầu của luật pháp</li>
                  <li>Để giải quyết tranh chấp và thực thi thỏa thuận</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Khi bạn xóa tài khoản, dữ liệu cá nhân sẽ được xóa trong vòng 30 ngày,
                  trừ khi luật pháp yêu cầu lưu trữ lâu hơn.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Người dùng dưới 16 tuổi</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Dịch vụ của chúng tôi không dành cho người dưới 16 tuổi. Chúng tôi không cố ý thu thập
                  thông tin từ trẻ em. Nếu bạn là phụ huynh và phát hiện con bạn đã cung cấp thông tin,
                  vui lòng liên hệ để chúng tôi xóa dữ liệu.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Thay đổi chính sách</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Chúng tôi có thể cập nhật chính sách này theo thời gian. Các thay đổi quan trọng sẽ được
                  thông báo qua email hoặc thông báo trên website. Ngày "Cập nhật lần cuối" ở đầu trang
                  sẽ được thay đổi khi có cập nhật.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">Quant Blog</p>
                  <p className="text-gray-700 dark:text-gray-300">Email: hoanyttv@gmail.com</p>
                  <p className="text-gray-700 dark:text-gray-300">Địa chỉ: Hà Nội, Việt Nam</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
