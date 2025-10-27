import { Metadata } from 'next';
import MainLayout from '../../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng - Quant Blog',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ Quant Blog',
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Điều khoản sử dụng
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Có hiệu lực từ: {new Date().toLocaleDateString('vi-VN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Chấp nhận điều khoản</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Bằng việc truy cập và sử dụng Quant Blog ("Dịch vụ", "Website", "Nền tảng"),
                  bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện này
                  ("Điều khoản"). Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này,
                  bạn không được phép sử dụng dịch vụ.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Tài khoản người dùng</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">2.1. Đăng ký tài khoản</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Bạn phải từ 16 tuổi trở lên để tạo tài khoản</li>
                  <li>Thông tin đăng ký phải chính xác, đầy đủ và cập nhật</li>
                  <li>Bạn chịu trách nhiệm về mọi hoạt động dưới tài khoản của mình</li>
                  <li>Không được chia sẻ mật khẩu hoặc cho người khác sử dụng tài khoản</li>
                  <li>Thông báo ngay cho chúng tôi nếu phát hiện việc sử dụng trái phép</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">2.2. Chấm dứt tài khoản</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản của bạn nếu:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Vi phạm các điều khoản này</li>
                  <li>Tham gia hoạt động gian lận, lừa đảo</li>
                  <li>Đăng nội dung vi phạm pháp luật</li>
                  <li>Lạm dụng hoặc quấy rối người dùng khác</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Nội dung người dùng</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-3">3.1. Quyền sở hữu</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Bạn giữ quyền sở hữu đối với nội dung bạn đăng tải ("Nội dung người dùng").
                  Tuy nhiên, bằng việc đăng tải, bạn cấp cho chúng tôi giấy phép toàn cầu,
                  không độc quyền, miễn phí, có thể chuyển nhượng để:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Sử dụng, sao chép, phân phối nội dung</li>
                  <li>Hiển thị công khai nội dung</li>
                  <li>Tạo nội dung phái sinh (ví dụ: thumbnail)</li>
                  <li>Cho phép người dùng khác xem và chia sẻ</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">3.2. Nội dung cấm</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Bạn không được đăng nội dung:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Vi phạm pháp luật hoặc quyền của người khác</li>
                  <li>Khiêu dâm, bạo lực, phân biệt đối xử</li>
                  <li>Spam, quảng cáo không được phép</li>
                  <li>Chứa virus, mã độc</li>
                  <li>Giả mạo, lừa đảo, thông tin sai lệch</li>
                  <li>Vi phạm bản quyền, nhãn hiệu</li>
                  <li>Xâm phạm quyền riêng tư</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3">3.3. Kiểm duyệt</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Chúng tôi có quyền (nhưng không có nghĩa vụ) xem xét, chỉnh sửa hoặc xóa
                  nội dung vi phạm điều khoản này mà không cần thông báo trước.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Quyền sở hữu trí tuệ</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Dịch vụ và nội dung gốc (bao gồm nhưng không giới hạn ở phần mềm, văn bản,
                  đồ họa, logo, biểu tượng, hình ảnh, đoạn audio và video) là tài sản của
                  Quant Blog và được bảo vệ bởi luật bản quyền quốc tế.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Bạn không được sao chép, sửa đổi, phân phối, bán hoặc cho thuê bất kỳ phần nào
                  của dịch vụ mà không có sự cho phép bằng văn bản.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Hành vi cấm</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Khi sử dụng dịch vụ, bạn không được:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                  <li>Cố gắng truy cập trái phép hệ thống, máy chủ</li>
                  <li>Can thiệp vào hoạt động bình thường của dịch vụ</li>
                  <li>Thu thập dữ liệu người dùng khác (scraping, crawling)</li>
                  <li>Giả mạo nguồn gốc nội dung</li>
                  <li>Tạo nhiều tài khoản để spam hoặc lạm dụng</li>
                  <li>Sử dụng bot, script tự động mà không được phép</li>
                  <li>Reverse engineer, decompile phần mềm</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Liên kết bên thứ ba</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Dịch vụ có thể chứa liên kết đến website hoặc dịch vụ bên thứ ba.
                  Chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung,
                  chính sách bảo mật hoặc thực tiễn của bất kỳ website hoặc dịch vụ nào của bên thứ ba.
                  Bạn tự chịu rủi ro khi truy cập các liên kết này.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Từ chối bảo đảm</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Dịch vụ được cung cấp trên cơ sở "NGUYÊN TRẠNG" và "CÓ SẴN".
                  Chúng tôi không đảm bảo rằng:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Dịch vụ sẽ không bị gián đoạn hoặc không có lỗi</li>
                  <li>Kết quả thu được từ dịch vụ là chính xác hoặc đáng tin cậy</li>
                  <li>Chất lượng sản phẩm, dịch vụ đáp ứng kỳ vọng của bạn</li>
                  <li>Mọi lỗi trong phần mềm sẽ được sửa chữa</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Giới hạn trách nhiệm</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Trong mọi trường hợp, Quant Blog và các đối tác, giám đốc, nhân viên,
                  đại lý không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp,
                  ngẫu nhiên, đặc biệt, hậu quả hoặc mang tính trừng phạt nào phát sinh từ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Việc sử dụng hoặc không thể sử dụng dịch vụ</li>
                  <li>Chi phí mua hàng hóa, dịch vụ thay thế</li>
                  <li>Truy cập trái phép hoặc thay đổi dữ liệu của bạn</li>
                  <li>Tuyên bố hoặc hành vi của bên thứ ba trên dịch vụ</li>
                  <li>Bất kỳ vấn đề nào khác liên quan đến dịch vụ</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Bồi thường</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Bạn đồng ý bồi thường, bảo vệ và giữ cho Quant Blog và các chi nhánh,
                  đối tác, giám đốc, nhân viên, đại lý không bị tổn hại trước bất kỳ và
                  tất cả các khiếu nại, thiệt hại, nghĩa vụ, tổn thất, trách nhiệm pháp lý,
                  chi phí hoặc nợ, và chi phí (bao gồm cả phí luật sư) phát sinh từ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                  <li>Việc bạn sử dụng và truy cập dịch vụ</li>
                  <li>Vi phạm điều khoản này</li>
                  <li>Vi phạm bất kỳ quyền nào của bên thứ ba</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Luật áp dụng và giải quyết tranh chấp</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Các điều khoản này sẽ được điều chỉnh và hiểu theo pháp luật Việt Nam.
                  Bất kỳ tranh chấp nào phát sinh liên quan đến các điều khoản này sẽ được
                  giải quyết tại tòa án có thẩm quyền ở Việt Nam.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Trước khi khởi kiện, các bên đồng ý cố gắng giải quyết tranh chấp thông qua
                  thương lượng thiện chí trong vòng 30 ngày.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Thay đổi điều khoản</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Chúng tôi có quyền sửa đổi hoặc thay thế các điều khoản này bất cứ lúc nào.
                  Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo ít nhất 30 ngày trước
                  khi các điều khoản mới có hiệu lực.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi có nghĩa là bạn chấp nhận
                  các điều khoản mới.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Điều khoản chung</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Toàn bộ thỏa thuận:</strong> Điều khoản này cấu thành toàn bộ thỏa thuận giữa bạn và chúng tôi</li>
                  <li><strong>Tính phân tách:</strong> Nếu bất kỳ điều khoản nào vô hiệu, các điều khoản còn lại vẫn có hiệu lực</li>
                  <li><strong>Từ bỏ quyền:</strong> Việc không thực thi quyền không được coi là từ bỏ quyền đó</li>
                  <li><strong>Chuyển nhượng:</strong> Bạn không được chuyển nhượng quyền theo điều khoản này</li>
                  <li><strong>Ngôn ngữ:</strong> Phiên bản tiếng Việt là phiên bản chính thức</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>13. Liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn có câu hỏi về điều khoản sử dụng này, vui lòng liên hệ:
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
