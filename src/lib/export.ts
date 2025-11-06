export async function exportToPDF(fileName: string) {
  // ✅ 确保只在客户端执行
  if (typeof window === undefined) return;

  try {
    // ✅ 正确导入：html2pdf 是命名导出，不是 default
    const { default: html2pdf } = await import('html2pdf.js');

    const element = document.body;

    const opt = {
      margin: 10,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' as const, unit: 'mm', format: 'a4' },
    } ;

    // ✅ 使用实例化方式
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF export failed:', error);
  }
}

export async function exportToExcel(fileName: string) {
  // ✅ 防止 SSR 错误
  if (typeof window === 'undefined') return;

  try {
    // ✅ 推荐使用命名导出（更稳定）
    const XLSX = await import('xlsx');

    // ✅ 找到你要导出的表格元素
    const table = document.querySelector('table'); // 或 #my-table
    if (!table) {
      console.warn('No table found for export');
      return;
    }

    // ✅ 正确创建工作表
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // ✅ 写出文件
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } catch (error) {
    console.error('Excel export failed:', error);
  }
}
