import { Metadata } from 'next';
import MainLayout from '../../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertCircle, Mail, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chính sách DMCA - Quant Blog',
  description: 'Quy trình xử lý khiếu nại vi phạm bản quyền theo DMCA tại Quant Blog',
};

export default function DMCAPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chính sách DMCA
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Digital Millennium Copyright Act - Chính sách xử lý vi phạm bản quyền
          </p>

          <div className="space-y-6">
            <Card className="border-l-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Quant Blog tôn trọng quyền sở hữu trí tuệ của người khác và yêu cầu người dùng
                      của chúng tôi cũng làm như vậy. Chúng tôi tuân thủ Đạo luật Bản quyền Thiên niên kỷ Kỹ thuật số
                      (Digital Millennium Copyright Act - DMCA) và sẽ phản hồi kịp thời các khiếu nại vi phạm bản quyền
                      theo quy định của pháp luật.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>1. Thông báo vi phạm bản quyền</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn tin rằng nội dung trên Quant Blog vi phạm bản quyền của bạn,
                  vui lòng gửi thông báo DMCA bằng văn bản đến Đại diện Bản quyền của chúng tôi
                  với các thông tin sau:
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Chữ ký điện tử hoặc vật lý
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Của người được ủy quyền hành động thay mặt cho chủ sở hữu quyền độc quyền bị cáo buộc vi phạm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Xác định tác phẩm có bản quyền
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Mô tả tác phẩm có bản quyền mà bạn cho rằng đã bị vi phạm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Xác định tài liệu vi phạm
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        URL hoặc vị trí cụ thể của nội dung vi phạm trên website
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">4</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Thông tin liên hệ
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Địa chỉ, số điện thoại và địa chỉ email của bạn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">5</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Tuyên bố thiện chí
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Tuyên bố rằng bạn tin tưởng một cách thiện chí rằng việc sử dụng tài liệu theo cách bị khiếu nại
                        không được chủ sở hữu bản quyền, đại lý của họ hoặc pháp luật cho phép
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">6</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        Tuyên bố chính xác
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Tuyên bố rằng thông tin trong thông báo là chính xác và dưới hình phạt khai man,
                        bạn được ủy quyền hành động thay mặt cho chủ sở hữu quyền độc quyền
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Gửi thông báo DMCA</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Đại diện Bản quyền
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200 mb-2">
                        <strong>Email:</strong> <a href="mailto:hoanyttv@gmail.com" className="hover:underline">hoanyttv@gmail.com</a>
                      </p>
                      <p className="text-blue-800 dark:text-blue-200">
                        <strong>Tiêu đề email:</strong> "DMCA Takedown Request - [Mô tả ngắn gọn]"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mt-4">
                  <p className="text-amber-900 dark:text-amber-200 text-sm">
                    <strong>⚠️ Lưu ý:</strong> Theo DMCA Section 512(f), bất kỳ ai cố ý khai man rằng
                    tài liệu hoặc hoạt động vi phạm bản quyền có thể phải chịu trách nhiệm về thiệt hại,
                    bao gồm chi phí và phí luật sư.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Quy trình xử lý</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Bước 1: Nhận thông báo (0-24 giờ)
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Chúng tôi sẽ xác nhận nhận được thông báo DMCA của bạn qua email trong vòng 24 giờ làm việc.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Bước 2: Xem xét (1-3 ngày làm việc)
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Chúng tôi sẽ xem xét thông báo để đảm bảo nó đáp ứng các yêu cầu của DMCA và xác định
                        tính hợp lệ của khiếu nại.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Bước 3: Hành động (Ngay lập tức sau xác minh)
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Nếu khiếu nại hợp lệ, chúng tôi sẽ:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm mt-2 space-y-1">
                        <li>Gỡ bỏ hoặc vô hiệu hóa quyền truy cập vào nội dung vi phạm</li>
                        <li>Thông báo cho người đăng tải về việc gỡ bỏ</li>
                        <li>Cung cấp bản sao thông báo DMCA cho người đăng tải</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Bước 4: Thông báo kết quả (1-2 ngày)
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Chúng tôi sẽ thông báo cho bạn về hành động đã thực hiện và cung cấp thông tin về
                        quyền của người đăng tải trong việc gửi thông báo phản đối (counter-notice).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Thông báo phản đối (Counter-Notice)</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Nếu bạn tin rằng nội dung của bạn đã bị gỡ bỏ nhầm hoặc do nhận dạng sai,
                  bạn có thể gửi thông báo phản đối với các thông tin sau:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Chữ ký điện tử hoặc vật lý của bạn</li>
                  <li>Xác định nội dung đã bị gỡ bỏ và vị trí trước đó của nó</li>
                  <li>Tuyên bố dưới hình phạt khai man rằng bạn tin tưởng một cách thiện chí rằng
                      nội dung đã bị gỡ bỏ hoặc vô hiệu hóa do nhận dạng sai hoặc sai sót</li>
                  <li>Tên, địa chỉ và số điện thoại của bạn</li>
                  <li>Tuyên bố rằng bạn đồng ý chấp nhận thẩm quyền của tòa án liên bang
                      tại địa điểm của bạn (hoặc nếu ở ngoài Hoa Kỳ, bất kỳ khu vực tài phán nào mà chúng tôi hoạt động)</li>
                </ul>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Gửi counter-notice đến cùng địa chỉ email: <strong>hoanyttv@gmail.com</strong>
                </p>

                <h3 className="text-lg font-semibold mb-3">Xử lý Counter-Notice</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Sau khi nhận được counter-notice hợp lệ, chúng tôi sẽ chuyển tiếp nó cho bên khiếu nại ban đầu.
                  Nếu họ không thông báo cho chúng tôi trong vòng 10-14 ngày làm việc rằng họ đã khởi kiện
                  để ngăn chặn hoạt động vi phạm, chúng tôi có thể khôi phục nội dung.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Chính sách vi phạm lặp lại</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Phù hợp với DMCA và các luật khác, chúng tôi đã áp dụng chính sách chấm dứt,
                  trong những trường hợp thích hợp và theo quyết định của chúng tôi,
                  tài khoản của người dùng là người vi phạm lặp lại.
                </p>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                  <p className="text-red-900 dark:text-red-200 text-sm">
                    <strong>Định nghĩa "Vi phạm lặp lại":</strong> Người dùng nhận được 3 hoặc nhiều hơn
                    thông báo DMCA hợp lệ trong vòng 12 tháng sẽ được coi là vi phạm lặp lại và có thể
                    bị chấm dứt tài khoản vĩnh viễn.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Miễn trừ trách nhiệm</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Chúng tôi không chịu trách nhiệm về:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                  <li>Bất kỳ thiệt hại nào phát sinh từ việc gỡ bỏ hoặc vô hiệu hóa nội dung</li>
                  <li>Hành động của người dùng vi phạm bản quyền</li>
                  <li>Khiếu nại DMCA sai hoặc khai man</li>
                  <li>Tranh chấp giữa chủ sở hữu bản quyền và người đăng tải nội dung</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Sử dụng hợp pháp và Fair Use</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Trước khi gửi thông báo DMCA, vui lòng xem xét xem việc sử dụng có thể được coi là "fair use"
                  (sử dụng hợp lý) theo luật bản quyền. Fair use có thể bao gồm:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Phê bình, bình luận</li>
                  <li>Báo chí, tin tức</li>
                  <li>Giảng dạy, học tập</li>
                  <li>Nghiên cứu, học thuật</li>
                  <li>Parody (nhại lại)</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Nếu không chắc chắn, vui lòng tham khảo ý kiến luật sư trước khi gửi thông báo DMCA.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Câu hỏi thường gặp</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Q: Tôi có thể gửi thông báo DMCA qua điện thoại không?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      A: Không. Theo DMCA, thông báo phải được gửi bằng văn bản (email hoặc thư).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Q: Mất bao lâu để nội dung bị gỡ?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      A: Thường trong vòng 1-3 ngày làm việc sau khi xác minh thông báo hợp lệ.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Q: Tôi có thể gửi thông báo ẩn danh không?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      A: Không. DMCA yêu cầu thông tin liên hệ đầy đủ và thông báo của bạn sẽ được
                      chuyển cho người đăng tải.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Q: Nếu tôi gửi thông báo sai thì sao?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      A: Bạn có thể phải chịu trách nhiệm pháp lý về thiệt hại, bao gồm chi phí và
                      phí luật sư theo DMCA Section 512(f).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Mọi thông báo DMCA và câu hỏi về bản quyền, vui lòng liên hệ:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">
                    Đại diện Bản quyền - Quant Blog
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Email:</strong> hoanyttv@gmail.com
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Địa chỉ:</strong> Hà Nội, Việt Nam
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                    <em>Vui lòng chỉ sử dụng email này cho các vấn đề liên quan đến bản quyền.
                    Các câu hỏi khác sẽ không được trả lời.</em>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
