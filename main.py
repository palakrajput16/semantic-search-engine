from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading model and index...")
model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("search_index.faiss")

with open("chunk_metadata.json", "r") as f:
    chunk_metadata = json.load(f)

print("Ready to search")

class SearchQuery(BaseModel):
    query: str
    top_k: int = 5


# -------------------------
# Existing search endpoint
# -------------------------
@app.post("/search")
def search(query: SearchQuery):

    query_vector = model.encode([query.query]).astype("float32")

    distances, indices = index.search(query_vector, query.top_k)

    results = []

    for rank, (idx, dist) in enumerate(zip(indices[0], distances[0])):

        meta = chunk_metadata[idx]

        similarity = 1 / (1 + dist)

        results.append({
            "rank": rank + 1,
            "title": meta["title"],
            "text": meta["text"],
            "similarity": round(float(similarity), 4)
        })

    return {
        "query": query.query,
        "results": results
    }


# ================================
# ADD THE NEW CODE HERE
# ================================
@app.post("/search-compare")
def search_compare(query: SearchQuery):

    # Semantic search
    semantic_results = search(query)

    # Keyword search
    keyword_results = []

    query_words = set(query.query.lower().split())

    for meta in chunk_metadata:

        text_words = set(meta["text"].lower().split())

        overlap = len(query_words & text_words)

        if overlap > 0:
            keyword_results.append({
                "title": meta["title"],
                "text": meta["text"],
                "overlap": overlap
            })

    keyword_results = sorted(
        keyword_results,
        key=lambda x: x["overlap"],
        reverse=True
    )[:5]

    return {
        "semantic": semantic_results["results"],
        "keyword": keyword_results
    }


# -------------------------
# Health endpoint
# -------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "total_chunks": len(chunk_metadata)
    }