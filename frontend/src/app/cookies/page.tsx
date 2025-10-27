import { Metadata } from 'next';
import MainLayout from '../../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'Chính sách Cookie - Quant Blog',
  description: 'Thông tin về cách Quant Blog sử dụng cookies và công nghệ theo dõi',
};

export default function CookiePolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chính sách Cookie
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Cookie là gì?</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại, tablet)
                  khi bạn truy cập website. Cookies giúp website ghi nhớ thông tin về chuyến thăm của bạn,
                  như ngôn ngữ ưa thích, cài đặt và thông tin đăng nhập.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cookies có thể là "session cookies" (tạm thời, bị xóa khi đóng trình duyệt) hoặc
                  "persistent cookies" (lưu trữ lâu dài cho đến khi hết hạn hoặc bị xóa).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Các loại cookies chúng tôi sử dụng</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">2.1. Cookies cần thiết (Essential Cookies)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Những cookies này cần thiết để website hoạt động và không thể tắt.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-600">
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Cookie</th>
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Mục đích</th>
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Thời hạn</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">auth_token</td>
                        <td className="py-2">Xác thực đăng nhập</td>
                        <td className="py-2">30 ngày</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">session_id</td>
                        <td className="py-2">Duy trì phiên làm việc</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">csrf_token</td>
                        <td className="py-2">Bảo mật CSRF</td>
                        <td className="py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold mb-3">2.2. Cookies chức năng (Functional Cookies)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Ghi nhớ lựa chọn của bạn để cải thiện trải nghiệm.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-600">
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Cookie</th>
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Mục đích</th>
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Thời hạn</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">theme</td>
                        <td className="py-2">Ghi nhớ theme (light/dark)</td>
                        <td className="py-2">1 năm</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">language</td>
                        <td className="py-2">Ngôn ngữ ưa thích</td>
                        <td className="py-2">1 năm</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">font_size</td>
                        <td className="py-2">Kích thước chữ</td>
                        <td className="py-2">1 năm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold mb-3">2.3. Cookies phân tích (Analytics Cookies)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Giúp chúng tôi hiểu cách người dùng tương tác với website.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-600">
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Cookie</th>
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Mục đích</th>
                        <th className="text-left py-2 text-gray-900 dark:text-gray-100">Thời hạn</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 dark:text-gray-300">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">_ga</td>
                        <td className="py-2">Google Analytics - User ID</td>
                        <td className="py-2">2 năm</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">_ga_*</td>
                        <td className="py-2">Google Analytics - Session</td>
                        <td className="py-2">2 năm</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 font-mono text-xs">_gid</td>
                        <td className="py-2">Google Analytics - Session ID</td>
                        <td className="py-2">24 giờ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold mb-3">2.4. Cookies quảng cáo (Advertising Cookies)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <em className="text-amber-600 dark:text-amber-400">Hiện tại chúng tôi KHÔNG sử dụng cookies quảng cáo.</em>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cookies bên thứ ba</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Một số cookies được đặt bởi dịch vụ bên thứ ba xuất hiện trên trang của chúng tôi:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Google Analytics:</strong> Phân tích lưu lượng truy cập</li>
                  <li><strong>TradingView:</strong> Widgets tài chính (nếu bạn truy cập trang /news)</li>
                  <li><strong>Social Media:</strong> Nút chia sẻ Facebook, Twitter (nếu có)</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Chúng tôi không kiểm soát các cookies này. Vui lòng xem chính sách cookie của
                  bên thứ ba để biết thêm thông tin.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Mục đích sử dụng cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi sử dụng cookies để:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Duy trì trạng thái đăng nhập của bạn</li>
                  <li>Ghi nhớ các tùy chọn của bạn (theme, ngôn ngữ)</li>
                  <li>Cải thiện hiệu suất website</li>
                  <li>Phân tích cách người dùng sử dụng website</li>
                  <li>Bảo mật tài khoản (chống CSRF, session hijacking)</li>
                  <li>Hiểu xu hướng người dùng để cải thiện nội dung</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Cách quản lý cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">5.1. Cài đặt trình duyệt</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Hầu hết trình duyệt cho phép bạn kiểm soát cookies qua cài đặt:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Privacy, search and services → Cookies and site permissions</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">5.2. Tùy chọn của bạn</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Bạn có thể:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Chặn tất cả cookies</li>
                  <li>Chặn cookies bên thứ ba</li>
                  <li>Xóa cookies khi đóng trình duyệt</li>
                  <li>Cho phép cookies từ các website cụ thể</li>
                </ul>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mt-4">
                  <p className="text-amber-900 dark:text-amber-200 text-sm">
                    <strong>⚠️ Lưu ý:</strong> Chặn cookies cần thiết có thể khiến một số tính năng không hoạt động
                    (ví dụ: không thể đăng nhập, mất cài đặt theme).
                  </p>
                </div>

                <h3 className="text-lg font-semibold mb-3 mt-6">5.3. Opt-out khỏi Analytics</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Để từ chối Google Analytics:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Cài đặt <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                  <li>Sử dụng chế độ Incognito/Private browsing</li>
                  <li>Cài đặt extensions chặn tracker (uBlock Origin, Privacy Badger)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Do Not Track (DNT)</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Một số trình duyệt có tính năng "Do Not Track". Hiện tại chúng tôi chưa hỗ trợ tín hiệu DNT
                  vì không có tiêu chuẩn thống nhất trong ngành. Tuy nhiên, bạn vẫn có thể quản lý cookies
                  qua cài đặt trình duyệt như mô tả ở trên.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies trên thiết bị di động</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Trên thiết bị di động, bạn có thể quản lý cookies qua:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>iOS Safari:</strong> Settings → Safari → Block All Cookies</li>
                  <li><strong>Android Chrome:</strong> Settings → Site settings → Cookies</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Ngoài ra, bạn có thể reset Advertising ID:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>iOS:</strong> Settings → Privacy → Advertising → Reset Advertising Identifier</li>
                  <li><strong>Android:</strong> Settings → Google → Ads → Reset advertising ID</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Local Storage và Session Storage</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Ngoài cookies, chúng tôi cũng sử dụng Web Storage API:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>localStorage:</strong> Lưu cài đặt UI, draft bài viết</li>
                  <li><strong>sessionStorage:</strong> Dữ liệu tạm thời trong phiên làm việc</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Dữ liệu này chỉ lưu trữ trên thiết bị của bạn và không được gửi đến server.
                  Bạn có thể xóa qua Developer Tools của trình duyệt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Thay đổi chính sách</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Chúng tôi có thể cập nhật chính sách cookie này để phản ánh thay đổi trong
                  công nghệ, luật pháp hoặc thực tiễn kinh doanh. Chúng tôi khuyến khích bạn
                  xem lại chính sách này định kỳ.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Câu hỏi và liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn có câu hỏi về chính sách cookie, vui lòng liên hệ:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">Quant Blog</p>
                  <p className="text-gray-700 dark:text-gray-300">Email: hoanyttv@gmail.com</p>
                  <p className="text-gray-700 dark:text-gray-300">Địa chỉ: Hà Nội, Việt Nam</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Tóm tắt nhanh
              </h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                <li>✅ Chúng tôi sử dụng cookies cần thiết để website hoạt động</li>
                <li>✅ Cookies chức năng giúp ghi nhớ tùy chọn của bạn (optional)</li>
                <li>✅ Google Analytics giúp cải thiện dịch vụ (có thể opt-out)</li>
                <li>❌ Chúng tôi KHÔNG sử dụng cookies quảng cáo</li>
                <li>🔧 Bạn có thể quản lý cookies qua cài đặt trình duyệt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
