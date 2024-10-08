// Exportボタンのイベントリスナー
document.getElementById('exportBtn').addEventListener('click', () => {
  chrome.tabs.query({}, (tabs) => {
    const urls = tabs.map(tab => tab.url).join("\n");
    const blobUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(urls);

    chrome.downloads.download({
      url: blobUrl,
      filename: 'tabs.txt',
      saveAs: true
    });
  });
});

// Importボタンのイベントリスナー
document.getElementById('importBtn').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt';

  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const urls = e.target.result.split("\n").filter(Boolean);
        urls.forEach(url => {
          chrome.tabs.create({ url });
        });
      };
      reader.readAsText(file);
    }
  };

  input.click();
});
