import re


def clean_markdown(text: str) -> str:
    """Remove markdown symbols like **, ##, __, *, _ from AI responses."""
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)   # bold
    text = re.sub(r"\*(.*?)\*", r"\1", text)         # italic
    text = re.sub(r"__(.*?)__", r"\1", text)          # bold underscore
    text = re.sub(r"_(.*?)_", r"\1", text)            # italic underscore
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)  # headings
    text = re.sub(r"`{1,3}.*?`{1,3}", "", text, flags=re.DOTALL)  # code
    text = re.sub(r"^\s*[-*+]\s+", "• ", text, flags=re.MULTILINE)  # bullets
    text = re.sub(r"\n{3,}", "\n\n", text)             # excess newlines
    return text.strip()


def truncate(text: str, max_chars: int = 4000) -> str:
    """Truncate text to max_chars safely at word boundary."""
    if len(text) <= max_chars:
        return text
    return text[:max_chars].rsplit(" ", 1)[0] + "…"


def extract_json_block(text: str) -> str:
    """Extract JSON from a string that may have surrounding prose."""
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group(0)
    return text
