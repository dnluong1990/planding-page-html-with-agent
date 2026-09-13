/**
 * Xây dựng system prompt cho AI
 */
export function buildSystemPrompt() {
  return `Bạn là Planding AI — chuyên gia thiết kế và lập trình landing page đẳng cấp hàng đầu thế giới. 
Bạn giao tiếp hoàn toàn bằng tiếng Việt thân thiện, súc tích và chuyên nghiệp.

Khi được yêu cầu tạo landing page, bạn tuân thủ nghiêm ngặt định dạng phản hồi sau:
1. Bạn có thể mở đầu bằng 2-3 câu chào và tóm tắt ý tưởng thiết kế (ngắn gọn, xúc tích).
2. Sau đó, BẮT BUỘC đặt TOÀN BỘ mã nguồn website vào duy nhất một block code markdown:
\`\`\`html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tên Trang Web</title>
  <!-- Nhúng Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* TOÀN BỘ CSS PHẢI TỰ CHỨA TRONG THẺ STYLE NÀY */
  </style>
</head>
<body>
  <!-- CÁC SECTION: HERO, FEATURES, SERVICES, ABOUT, TESTIMONIALS, CTA, FOOTER -->
</body>
</html>
\`\`\`
3. TUYỆT ĐỐI KHÔNG để bất kỳ đoạn text trò chuyện, lời chào hay giải thích nào bên trong mã HTML. Mã HTML phải sạch 100% để có thể mở trực tiếp trên trình duyệt.
4. Khi chỉnh sửa (edit mode), bạn cũng phải trả lại TOÀN BỘ mã nguồn HTML/CSS hoàn chỉnh trong block \`\`\`html ... \`\`\`.`;
}

/**
 * Xây dựng prompt sinh landing page từ thông tin đã thu thập
 */
export function buildGeneratePrompt(collectedInfo) {
  const { industry, brandName, slogan, purpose, style, colors, content } = collectedInfo;

  return `Hãy thiết kế và tạo mã nguồn một landing page hoàn chỉnh theo các yêu cầu sau:

- **Ngành nghề:** ${industry || 'Không xác định'}
- **Tên thương hiệu:** ${brandName || 'Thương hiệu của bạn'}
- **Slogan:** ${slogan || 'Đồng hành cùng thành công'}
- **Mục đích:** ${purpose || 'Giới thiệu sản phẩm và thu thập thông tin khách hàng'}
- **Phong cách thiết kế:** ${style || 'Hiện đại, tối giản, sang trọng'}
- **Màu sắc chủ đạo:** ${colors || 'Đề xuất bảng màu hài hòa, đẳng cấp'}
- **Nội dung chính:** ${content || 'Hero banner, giới thiệu dịch vụ/sản phẩm, ưu đãi, form liên hệ'}

Yêu cầu kỹ thuật:
- Mã HTML5 tự chứa (self-contained), toàn bộ CSS nằm trong thẻ <style> bên trong <head>.
- Responsive tối ưu cho cả Desktop, Tablet và Mobile.
- Dùng hình ảnh đẹp mắt từ Unsplash (https://images.unsplash.com/... hoặc https://picsum.photos/800/600).
- Toàn bộ mã nguồn phải nằm trọn vẹn trong block: \`\`\`html <!DOCTYPE html> ... </html> \`\`\``;
}

/**
 * Xây dựng prompt chỉnh sửa landing page
 */
export function buildEditPrompt(currentHTML, editRequest) {
  return `Đây là mã nguồn HTML hiện tại của landing page:

\`\`\`html
${currentHTML}
\`\`\`

Yêu cầu chỉnh sửa của người dùng:
"${editRequest}"

Hãy cập nhật lại landing page theo yêu cầu trên và trả lại TOÀN BỘ mã nguồn HTML/CSS đầy đủ trong duy nhất một block markdown:
\`\`\`html
<!DOCTYPE html>
...
</html>
\`\`\``;
}

/**
 * Trích xuất phần text trò chuyện / giải thích ý tưởng của AI (nếu có) trước block HTML
 * @param {string} response - Toàn bộ chuỗi phản hồi từ AI
 * @returns {string|null} - Đoạn text giải thích hoặc null
 */
export function extractChatExplanation(response) {
  if (!response || typeof response !== 'string') return null;

  // Tìm vị trí bắt đầu của block ```html hoặc <!DOCTYPE html
  const codeBlockIdx = response.indexOf('```html');
  const doctypeIdx = response.search(/<!DOCTYPE\s+html/i);
  const htmlTagIdx = response.search(/<html[\s>]/i);

  let cutIdx = -1;
  if (codeBlockIdx !== -1) {
    cutIdx = codeBlockIdx;
  } else if (doctypeIdx !== -1) {
    cutIdx = doctypeIdx;
  } else if (htmlTagIdx !== -1) {
    cutIdx = htmlTagIdx;
  }

  if (cutIdx > 0) {
    const textBefore = response.substring(0, cutIdx).trim();
    if (textBefore.length > 0) {
      return textBefore;
    }
  }

  return null;
}

/**
 * Trích xuất mã nguồn HTML sạch 100% từ response của AI (loại bỏ text giải thích mở đầu)
 * @param {string} response - Toàn bộ chuỗi phản hồi từ AI
 * @returns {string|null} - Mã HTML sạch hoặc null
 */
export function extractHTMLFromResponse(response) {
  if (!response || typeof response !== 'string') {
    return null;
  }

  let rawHTML = null;

  // Cách 1: Tìm block ```html ... (kể cả khi không có ``` đóng ở cuối)
  const codeBlockRegex = /```html\s*([\s\S]*?)(\s*```|$)/i;
  const match = response.match(codeBlockRegex);

  if (match && match[1] && match[1].trim()) {
    rawHTML = match[1].trim();
  } else {
    // Fallback: Tìm block ``` bất kỳ có chứa html/doctype
    const genericMatch = response.match(/```\s*([\s\S]*?)(\s*```|$)/i);
    if (genericMatch && genericMatch[1] && (genericMatch[1].includes('<!DOCTYPE') || genericMatch[1].includes('<html'))) {
      rawHTML = genericMatch[1].trim();
    }
  }

  // Nếu chưa lấy được từ code block, tìm trực tiếp trong chuỗi response
  if (!rawHTML) {
    rawHTML = response.trim();
  }

  // Cách 2: Tinh lọc tuyệt đối — Chỉ lấy từ thẻ <!DOCTYPE html> hoặc <html> đến </html> (hoặc đến hết chuỗi)
  const doctypeIndex = rawHTML.search(/<!DOCTYPE\s+html/i);
  const htmlTagIndex = rawHTML.search(/<html[\s>]/i);

  let startIndex = -1;
  if (doctypeIndex !== -1) {
    startIndex = doctypeIndex;
  } else if (htmlTagIndex !== -1) {
    startIndex = htmlTagIndex;
  }

  if (startIndex !== -1) {
    let cleanCode = rawHTML.substring(startIndex);

    // Nếu có thẻ đóng </html>, cắt lấy đến hết thẻ </html>
    const closingHtmlMatch = cleanCode.match(/<\/html>/i);
    if (closingHtmlMatch && closingHtmlMatch.index !== undefined) {
      cleanCode = cleanCode.substring(0, closingHtmlMatch.index + 7);
    } else {
      // Nếu không có thẻ đóng (bị cắt ngắn), loại bỏ bất kỳ dấu ``` thừa ở cuối
      cleanCode = cleanCode.replace(/```+\s*$/, '').trim();
    }

    return cleanCode.trim();
  }

  // Nếu không tìm thấy cấu trúc HTML hợp lệ
  return null;
}
