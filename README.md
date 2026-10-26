# KM Engine – Creative Growth AI

FastAPI backend that decodes the tone of Instagram creators and turns
reference material (articles, uploaded documents) into short-form video
scripts (VSL / Reels). The repository also contains a Vite/TypeScript
front-end (see `package.json`).

## Requirements

- Python 3.11+

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Run the API

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Interactive docs: <http://localhost:8000/docs>

## Main endpoints

| Method | Path | What it does |
|--------|------|--------------|
| GET | `/health` | Liveness check |
| POST | `/api/analyze-profile` | Decodes a creator's tone and niche |
| POST | `/api/parse-document` | Extracts text from uploaded documents (txt, docx, pdf) and Google Drive links |
| POST | `/api/transcribe-audio` | Audio transcription |
| GET/POST | `/api/profiles`, `/api/profiles/{handle}` | List, read and save analytical profiles |
| POST | `/api/generate-script` | Generates a script from a profile and reference material |

## Tests

The tests run offline and need no API keys.

```bash
pip install -r requirements-dev.txt
python -m pytest
```

Without pytest, `python -m unittest discover -s tests` works too.

## Code layout

- `app.py` – API, document ingestion, article scraping and profile logic
- `tests/` – offline unit tests
- `server.ts`, `index.html`, `vite.config.ts` – front-end and its dev server

## License

MIT – see [LICENSE](LICENSE).
