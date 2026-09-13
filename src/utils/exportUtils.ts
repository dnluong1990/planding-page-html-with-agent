import { getLanguageConfig } from '../config/languageConfig';

/**
 * Tạo filename an toàn từ brand name (loại bỏ dấu tiếng Việt, ký tự đặc biệt)
 */
export function generateFilename(brandName?: string | null): string {
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
 */
export function wrapHTML(html?: string | null): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const trimmed = html.trim();
  if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
    return trimmed;
  }

  const lang = getLanguageConfig();

  return `<!DOCTYPE html>
<html lang="${lang.htmlLang}">
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
 */
export function downloadHTML(html?: string | null, brandName?: string | null): void {
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
 */
export async function copyToClipboard(html?: string | null): Promise<boolean> {
  if (!html) return false;

  const fullHTML = wrapHTML(html);

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullHTML);
      return true;
    }
    throw new Error('Clipboard API không khả dụng');
  } catch {
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
