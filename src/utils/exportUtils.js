/**
 * Tạo filename an toàn từ brand name (loại bỏ dấu tiếng Việt, ký tự đặc biệt)
 * @param {string} brandName - Tên thương hiệu
 * @returns {string} - Filename an toàn dạng slug
 */
export function generateFilename(brandName) {
  if (!brandName || typeof brandName !== 'string') {
    return 'landing-page.html';
  }

  const safeName = brandName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return `${safeName || 'landing-page'}.html`;
}

/**
 * Wrap HTML content thành file HTML hoàn chỉnh (nếu chưa có <!DOCTYPE>)
 * @param {string} html - HTML content
 * @returns {string} - Full HTML document
 */
export function wrapHTML(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const trimmed = html.trim();
  if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
    return trimmed;
  }

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
</head>
<body>
${trimmed}
</body>
</html>`;
}

/**
 * Download HTML file trực tiếp về máy
 * @param {string} html - Mã nguồn HTML
 * @param {string} brandName - Tên thương hiệu để đặt tên file
 */
export function downloadHTML(html, brandName) {
  if (!html) return;

  const fullHTML = wrapHTML(html);
  const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const filename = generateFilename(brandName);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy mã nguồn HTML vào clipboard
 * @param {string} html - Mã nguồn HTML
 * @returns {Promise<boolean>} - true nếu copy thành công
 */
export async function copyToClipboard(html) {
  if (!html) return false;

  const fullHTML = wrapHTML(html);

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullHTML);
      return true;
    }
    throw new Error('Clipboard API không khả dụng');
  } catch (err) {
    // Fallback cho trình duyệt không hỗ trợ Clipboard API trực tiếp
    try {
      const textarea = document.createElement('textarea');
      textarea.value = fullHTML;
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (fallbackErr) {
      console.error('Không thể sao chép HTML:', fallbackErr);
      return false;
    }
  }
}
