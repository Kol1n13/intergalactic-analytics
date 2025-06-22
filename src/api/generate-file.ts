export async function GenerateFile() {
    const response = await (fetch('http://localhost:3000/report?size=0.1&withErrors=off&maxSpend=1000000000', {
      method: 'GET',
    }).catch(() => {throw new Error("Ошибка генерации файла")}));

    if (!response.ok || !response.body) {
      throw new Error('Ошибка генерации файла');
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-report.csv';
    a.click();
    URL.revokeObjectURL(url);
}