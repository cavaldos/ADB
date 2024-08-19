import Groq from 'groq-sdk';

const apiKey = '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';
const groq = new Groq({ apiKey: apiKey });


async function getGroqSummary(text) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful helper with the ability to succinctly turn off text. Please disable in the original language of the text provided.",
            },
            {
                role: "user",
                content: `Summarize the following text briefly, using the text's original language :\n\n${text}`,
            },
        ],
        model: "llama3-8b-8192",
        max_tokens: 150,
    });

    return chatCompletion.choices[0]?.message?.content || "";
}



async function main() {
    const text = `Từng được xem là làng quê đồng bằng Bắc Bộ thu nhỏ ở Ninh Bình, thu hút nhiều khách du lịch tới tham quan, "làng Việt cổ" Cố Viên Lầu hiện trở nên hoang tàn, đổ nát.
Cố Viên Lầu nằm trong khu du lịch Tam Cốc - Bích Động (xã Ninh Hải, huyện Hoa Lư, Ninh Bình). Nơi đây có hàng chục nhà cổ bằng gỗ được sưu tầm chủ yếu ở Ninh Bình và khu vực đồng bằng Bắc Bộ.
Theo tìm hiểu của PV, khu đất "làng Việt cổ" này có diện tích 22.000m2, với 22 nhà cổ. Bên trong những ngôi nhà có tràng kỷ, sập gụ, tủ chè. Nhà chủ yếu được xây dựng theo kiến trúc từ thời Nguyễn trở lại đây.
Trong đó, nhà cổ Lưu Phương có lịch sử hơn 100 năm, nhà cổ Ý Yên gần 150 năm, nhà cổ Thọ Xuân gần 200 năm, nhà cổ Ninh Sơn khoảng 400 năm...
Nơi đây được xem như làng quê Bắc Bộ thu nhỏ, khung cảnh yên bình với cây đa, giếng nước, sân đình, nhà lợp bằng tranh tre, sân có đống rơm, chum nước... mang đậm nét xưa.
Đây là điểm tham quan, phim trường nổi tiếng thu hút du khách trong nước, quốc tế khi tới Ninh Bình.Tuy nhiên, Cố Viên Lầu hiện trở nên nhếch nhác, đổ nát. Một phần là do doanh nghiệp sở hữu mang nơi đây đi thế chấp ngân hàng và không có khả năng chi trả nên bị ngân hàng phát mại. Từ 2018 đến nay, Cố Viên Lầu dừng hoạt động để giải quyết tranh chấp giữa doanh nghiệp và ngân hàng.
Ghi nhận thực tế cho thấy, toàn bộ khu đất của Cố Viên Lầu được dựng hàng rào tôn ngăn, chia thành các khu vực khác nhau làm bãi đỗ xe, nơi đổ chất thải xây dựng. Nhiều nhà cổ bị bỏ hoang, xuống cấp, mục nát, cỏ mọc um tùm khiến du khách không khỏi xót xa.
Bạn Đoàn Vân Anh, một du khách chia sẻ: “Tôi biết đến Cố Viên Lầu thông qua bạn bè, trên mạng xã hội, phim ảnh, thấy rất đẹp và yên bình đúng cảnh làng quê Bắc Bộ nên tôi cùng gia đình lựa chọn đến nơi này. Chứng kiến Cố Viên Lầu hoang tàn, đổ nát, tôi vô cùng thất vọng”.
Hiện tại, một phần nhỏ của Cố Viên Lầu bao gồm một số nhà cổ, thủy đình... vẫn mở cửa cho du khách tham quan.
`;
    const summary = await getGroqSummary(text);
    console.log("Tóm tắt:", summary);
}

main().catch(console.error);