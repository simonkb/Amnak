import JSZip from "jszip";

const getWordFileContents = async (file) => {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  const documentXml = await contents.file("word/document.xml").async("string");
  return documentXml;
};
const parseWordFileContents = (contents) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(contents, "text/xml");
  const paragraphs = xmlDoc.getElementsByTagName("w:p");
  const objects = [];

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const textNodes = paragraph.getElementsByTagName("w:t");
    const bulletNodes = paragraph.getElementsByTagName("w:pPr");

    if (textNodes.length > 0) {
      const text = textNodes[0].textContent;
      objects.push({ type: "paragraph", text });
    } else if (bulletNodes.length > 0) {
      objects.push({ type: "bullet", text: bulletNodes[0].textContent });
    }
  }

  return objects;
};
