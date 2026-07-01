# Semantic Search Engine

Semantic Search Engine is a full-stack application that enables users to upload PDF documents and retrieve information using natural language queries. Instead of relying on keyword matching, it uses Sentence Transformers to generate embeddings and FAISS for efficient vector similarity search, delivering results based on semantic meaning rather than exact word overlap.
---

## Project Highlights

- Full-stack semantic search application
- React frontend with responsive UI
- FastAPI backend
- Upload PDFs directly from the web interface
- Automatic indexing after upload
- Semantic search using Sentence Transformers
- Fast vector similarity search using FAISS
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

- Semantic document search
- Upload PDFs directly from the frontend
- Automatic indexing after every upload
- Fast vector search using FAISS
- FastAPI REST API
- React frontend
- Dark mode
- Responsive interface
- Keyword vs Semantic Search comparison

---

## Tech Stack

| Component     | Technology            |
| ------------- | --------------------- |
| Frontend      | React + Vite          |
| Styling       | Tailwind CSS          |
| Backend       | FastAPI               |
| Embeddings    | Sentence Transformers |
| Vector Search | FAISS                 |
| PDF Parsing   | PyPDF2                |
| ML Framework  | PyTorch               |
| Language      | Python                |

---

## Project Structure

```
semantic-search-engine/
│
├── data/
│   └── documents/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── build_index.py
├── document_loader.py
├── main.py
├── search_index.faiss
├── chunk_metadata.json
├── requirements.txt
└── README.md
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
## Running the Project

### 1. Start the Backend

```bash
.\venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

The backend runs on:

```
http://127.0.0.1:8000
```

---

### 2. Start the Frontend

```bash
cd frontend

npm install

npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

## How to Use

1. Start both the FastAPI backend and the React frontend.
2. Open the application at `http://localhost:5173`.
3. Upload one or more PDF documents.
4. Wait for indexing to complete.
5. Enter a natural language query.
6. View the ranked semantic search results.
7. Upload additional PDFs at any time to expand the searchable collection.

---

## Future Improvements

- Improve search relevance using cosine similarity
- Hybrid Search (Semantic + BM25)
- Document library with delete functionality
- Highlight matched passages
- Metadata filtering
- Authentication and user accounts
- Docker support
- Cloud deployment

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