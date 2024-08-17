## Giải thích Invoice partitioning


- Partition Function (pfInvoiceDate):
Range LEFT FOR VALUES chỉ định rằng mỗi phân vùng sẽ bao gồm các giá trị nhỏ hơn hoặc bằng giá trị ranh giới được định nghĩa.
Trong trường hợp này, các phân vùng được chia cho mỗi tháng trong năm 2024. Dữ liệu sẽ được phân vào các phân vùng như sau:
Phân vùng 1: Trước 2024-01-01.
Phân vùng 2: Từ 2024-01-01 đến 2024-01-31.
Phân vùng 3: Từ 2024-02-01 đến 2024-02-29 (hoặc 2024-02-28 nếu không phải năm nhuận).
Cứ tiếp tục như vậy cho đến tháng 12.

- Partition Scheme (psInvoiceDate):

Partition Scheme này chỉ định nơi lưu trữ các phân vùng đã được định nghĩa trong Partition Function.
Trong đoạn code của bạn, tất cả các phân vùng được lưu trữ trên cùng một FileGroup là PRIMARY.

- Tạo bảng Invoices với phân vùng:

Bảng Invoices được tạo với cột InvoiceDate làm khóa phân vùng.
Dữ liệu trong bảng này sẽ được chia thành các phân vùng dựa trên giá trị của InvoiceDate.
Điều này có nghĩa là mỗi tháng trong năm 2024 sẽ tương ứng với một phân vùng riêng biệt trong bảng Invoices.


## Giải thích History Banking partitioning


Giải thích chi tiết:
Partition Function (pfInvoiceDate):

Đây là một Partition Function định nghĩa các giá trị ranh giới cho các phân vùng (partitions) dựa trên cột InvoiceDate.
Range LEFT FOR VALUES chỉ định rằng mỗi phân vùng sẽ bao gồm các giá trị nhỏ hơn hoặc bằng giá trị ranh giới được định nghĩa.
Trong trường hợp này, các phân vùng được chia cho mỗi tháng trong năm 2024. Dữ liệu sẽ được phân vào các phân vùng như sau:
Phân vùng 1: Trước 2024-01-01.
Phân vùng 2: Từ 2024-01-01 đến 2024-01-31.
Phân vùng 3: Từ 2024-02-01 đến 2024-02-29 (hoặc 2024-02-28 nếu không phải năm nhuận).
Cứ tiếp tục như vậy cho đến tháng 12.
Partition Scheme (psInvoiceDate):

Partition Scheme này chỉ định nơi lưu trữ các phân vùng đã được định nghĩa trong Partition Function.
Trong đoạn code của bạn, tất cả các phân vùng được lưu trữ trên cùng một FileGroup là PRIMARY.
Tạo bảng Invoices với phân vùng:

Bảng Invoices được tạo với cột InvoiceDate làm khóa phân vùng.
Dữ liệu trong bảng này sẽ được chia thành các phân vùng dựa trên giá trị của HistoryDate.
Mỗi tháng trong năm 2024 sẽ tương ứng với một phân vùng riêng biệt trong bảng Invoices.

