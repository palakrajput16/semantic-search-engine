# Semantic Search Engine using Sentence Transformers and FAISS

A backend-first semantic search engine that retrieves documents based on **meaning rather than exact keyword matches** using vector embeddings.

Instead of relying solely on keyword matching, this project converts both documents and search queries into dense vector embeddings using Sentence Transformers and retrieves the most semantically similar results using FAISS.

---

## Project Highlights

- Semantic document search using Sentence Transformers
- Fast vector similarity search with FAISS
- Supports PDF and TXT documents
- Automatic document chunking
- FastAPI REST API
- Keyword vs Semantic Search comparison
- Runs completely locally (no paid APIs)

---

## Architecture

```text
                  Documents (PDF / TXT)
                           │
                           ▼
                 Text Extraction (PyPDF2)
                           │
                           ▼
              Document Chunking (300 words)
                           │
                           ▼
 SentenceTransformer (all-MiniLM-L6-v2)
                           │
                           ▼
            Vector Embeddings (384-d)
                           │
                           ▼
                  FAISS Vector Index
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
           User Query         Stored Chunks
                 │                   │
                 └─────────┬─────────┘
                           ▼
              Similarity Search (L2)
                           │
                           ▼
                   Ranked Results
                           │
                           ▼
                     FastAPI Response
```

---

## Features

- Semantic search using Sentence Transformers
- Vector indexing with FAISS
- PDF support using PyPDF2
- Automatic document chunking
- FastAPI backend
- Interactive Swagger UI
- Keyword vs Semantic Search comparison endpoint

---

## Tech Stack

| Component           | Technology            |
| -------------------- | --------------------- |
| Backend              | FastAPI               |
| Embeddings           | Sentence Transformers |
| Vector Database      | FAISS                 |
| PDF Parsing          | PyPDF2                |
| Language              | Python                |
| Numerical Computing  | NumPy                 |

---

## Project Structure

```
semantic-search-engine/
│
├── data/
│   └── documents/
│
├── build_index.py
├── document_loader.py
├── main.py
│
├── requirements.txt
├── README.md
└── screenshots/
```

---

## How It Works

1. Documents are loaded from the `data/documents` folder.
2. PDF text is extracted using PyPDF2.
3. Long documents are divided into overlapping chunks.
4. Each chunk is converted into a dense vector embedding.
5. FAISS stores the embeddings in a vector index.
6. User queries are embedded using the same model.
7. FAISS retrieves the nearest document vectors.
8. Results are returned ranked by semantic similarity.

---

## Installation

**Clone the repository**

```bash
git clone https://github.com/<your-username>/semantic-search-engine.git
cd semantic-search-engine
```

**Create virtual environment**

```bash
python -m venv venv
```

**Activate**

Windows:

```bash
venv\Scripts\activate
```

**Install dependencies**

```bash
pip install -r requirements.txt
```

---

## Adding Documents

Place PDF or TXT files inside `data/documents/`

Example:

```
documents/
├── paper.pdf
├── notes.pdf
└── article.txt
```

---

## 🔨 Build the Search Index

```bash
python build_index.py
```

This creates:

- `search_index.faiss`
- `chunk_metadata.json`

---

## Run the API

```bash
uvicorn main:app --reload
```

Open: `http://127.0.0.1:8000/docs`

---

## Example Search

**Request**

```json
{
    "query": "machine learning",
    "top_k": 5
}
```

**Response**

```json
{
  "query": "machine learning",
  "results": [
    {
      "rank": 1,
      "title": "Research Paper",
      "similarity": 0.91
    }
  ]
}
```

---

## 🔮 Future Improvements

- React frontend
- Drag-and-drop PDF upload
- Automatic indexing after upload
- Highlight matching passages
- Hybrid Search (Semantic + BM25)
- Metadata filtering
- Authentication
- Docker deployment
- Public cloud deployment

---

## Concepts Demonstrated

- Semantic Search
- Vector Embeddings
- FAISS Indexing
- NLP
- Document Chunking
- REST APIs
- FastAPI
- Similarity Search

---

## Author

**Palak Rajput**

B.Sc. Computer Science (Major)
Applied Mathematics (Minor)
FLAME University

---

⭐ If you found this project interesting, consider starring the repository!