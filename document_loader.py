import os
from PyPDF2 import PdfReader

def extract_pdf_text(filepath):
    text = ""

    reader = PdfReader(filepath)

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text


def load_documents(folder_path):
    documents = []

    for filename in os.listdir(folder_path):

        filepath = os.path.join(folder_path, filename)

        # TXT files
        if filename.endswith(".txt"):
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

        # PDF files
        elif filename.endswith(".pdf"):
            content = extract_pdf_text(filepath)

        else:
            continue

        documents.append({
            "id": filename,
            "title": os.path.splitext(filename)[0],
            "content": content
        })

    return documents


def chunk_text(text, chunk_size=300, overlap=50):

    words = text.split()

    chunks = []

    start = 0

    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks