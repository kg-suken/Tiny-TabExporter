chrome.action.onClicked.addListener(() => {
  // すべてのタブのURLを取得
  chrome.tabs.query({}, (tabs) => {
    const urls = tabs.map(tab => tab.url).join("\n");

    // `data:` URI スキームを使って txt ファイルを生成
    const blobUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(urls);

    // ファイルをダウンロードする
    chrome.downloads.download({
      url: blobUrl,
      filename: 'tabs.txt',
      saveAs: true
    });
  });
});
