"""Baseline tests for document ingestion (parse_document_dict in app.py).

They run fully offline and only need the packages in requirements.txt.

Run with either:
    python -m pytest
    python -m unittest discover -s tests
"""
import base64
import io
import os
import sys
import unittest
import zipfile

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import parse_document_dict  # noqa: E402

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


def _b64(raw: bytes) -> str:
    return base64.b64encode(raw).decode("ascii")


def _minimal_docx(paragraphs):
    """Builds a tiny .docx in memory (only word/document.xml)."""
    body = "".join(f"<w:p><w:r><w:t>{t}</w:t></w:r></w:p>" for t in paragraphs)
    xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<w:document xmlns:w="{W_NS}"><w:body>{body}</w:body></w:document>'
    )
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("word/document.xml", xml)
    return buf.getvalue()


class ParseDocumentDictTests(unittest.TestCase):
    def test_plain_utf8_text_file(self):
        text = "Olá mundo, isto é um teste simples."
        doc = parse_document_dict(
            {"name": "nota.txt", "file_base64": _b64(text.encode("utf-8"))}
        )
        self.assertEqual(doc.text, text)
        self.assertEqual(doc.type, "txt")
        self.assertEqual(doc.status, "success")
        self.assertEqual(doc.word_count, 7)
        self.assertEqual(doc.char_count, len(text))

    def test_inline_text_is_stripped_and_counted(self):
        doc = parse_document_dict({"name": "a.txt", "text": "  um dois três  "})
        self.assertEqual(doc.text, "um dois três")
        self.assertEqual(doc.word_count, 3)
        self.assertEqual(doc.char_count, 12)
        self.assertEqual(doc.status, "success")

    def test_snippet_normalises_whitespace(self):
        doc = parse_document_dict({"name": "a.txt", "text": "linha um\n\n   linha   dois"})
        self.assertEqual(doc.snippet, "linha um linha dois")

    def test_empty_payload_reports_failure(self):
        doc = parse_document_dict({"name": "vazio.txt", "text": "   "})
        self.assertEqual(doc.status, "failed")
        self.assertEqual(doc.word_count, 0)

    def test_docx_paragraphs_keep_document_order(self):
        raw = _minimal_docx(["Primeiro parágrafo", "Segundo parágrafo"])
        doc = parse_document_dict({"name": "relatorio.docx", "file_base64": _b64(raw)})
        self.assertEqual(doc.type, "docx")
        self.assertEqual(doc.text, "Primeiro parágrafo\nSegundo parágrafo")
        self.assertEqual(doc.status, "success")

    def test_type_is_inferred_from_file_extension(self):
        raw = _minimal_docx(["Olá"])
        doc = parse_document_dict({"file_name": "carta.DOCX", "file_base64": _b64(raw)})
        self.assertEqual(doc.type, "docx")
        self.assertEqual(doc.text, "Olá")


if __name__ == "__main__":
    unittest.main()
