export const saveJsonToFile = async (jsonData: object) => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      return date.toLocaleString('pt-BR', options).replace(/\//g, '-').replace(/, /g, '_').replace(/:/g, '-');
    };
  
    const currentTime = formatDate(new Date());
    const fileName = `tree_${currentTime}.json`;
  
    if ("showSaveFilePicker" in window) {
      try {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "JSON Files",
              accept: { "application/json": [".json"] },
            },
          ],
        });
  
        const writable = await fileHandle.createWritable();
        await writable.write(jsonString);
        await writable.close();
      } catch (error) {
        console.error("Erro ao salvar o arquivo:", error);
      }
    } else {
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    }
};
  