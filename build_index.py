from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
from document_loader import load_documents, chunk_text

print('Loading embedding model...')
model = SentenceTransformer('all-MiniLM-L6-v2')  # small, fast, free, runs on CPU

print('Loading documents...')
documents = load_documents('data/documents')

all_chunks = []      # text of every chunk
chunk_metadata = []  # which document + position each chunk came from

for doc in documents:
    chunks = chunk_text(doc['content'])
    for i, chunk in enumerate(chunks):
        all_chunks.append(chunk)
        chunk_metadata.append({
            'doc_id': doc['id'],
            'title': doc['title'],
            'chunk_index': i,
            'text': chunk
        })

print(f'Total chunks: {len(all_chunks)}')
print('Generating embeddings... this may take a minute')

embeddings = model.encode(all_chunks, show_progress_bar=True)
embeddings = np.array(embeddings).astype('float32')

# Build FAISS index
dimension = embeddings.shape[1]  # usually 384 for this model
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# Save everything
faiss.write_index(index, 'search_index.faiss')
with open('chunk_metadata.json', 'w') as f:
    json.dump(chunk_metadata, f)

print('Index built and saved successfully')
