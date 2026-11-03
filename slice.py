"""Negative Finds slice builder 0.1.1 (cedwyn-webapp/1.0.0).

Selects public kind=missing_record entries from the read-only central catalogue.
Each item is a bounded search record, not a conclusion that a source or relationship is absent.
This builder never writes to the central catalogue.
"""

def field_text(record, heading):
    for section in record.get("detail") or []:
        if (section.get("heading") or "").strip().lower() == heading.lower():
            return (section.get("text") or "").strip()
    return ""

def build(ctx):
    items = []
    for record in ctx.get("catalogue") or []:
        if not record.get("public") or record.get("kind") != "missing_record":
            continue

        provenance = record.get("provenance") or {}
        scope = record.get("scope") or {}
        date = record.get("date") or {}

        question = field_text(record, "Question screened")
        searched = field_text(record, "Search boundary")
        result = field_text(record, "Result")
        limit = field_text(record, "Limit")
        next_action = field_text(record, "Next action")
        source = " — ".join(p for p in (
            provenance.get("holder") or "", provenance.get("reference") or ""
        ) if p)
        stage = (provenance.get("obtained") or "").strip()

        # The summary is deliberately included in the small static index so the page
        # does not need a Worker request for every card or detail.
        lines = []
        for label, value in (
            ("Question", question),
            ("Search boundary", searched),
            ("Result", result),
            ("Limit", limit),
            ("Retrieval stage", stage),
            ("Source", source),
            ("Next action", next_action),
        ):
            if value:
                lines.append(label + ": " + value)

        items.append({
            "uid": record["id"],
            "key": record["id"],
            "kind": "negative_screen",
            "class": scope.get("label") or "Bounded search",
            "title": record.get("title") or record["id"],
            "date": date.get("sort") or date.get("display") or "",
            "holder": provenance.get("holder") or "",
            "summary": "\n".join(lines) or record.get("description") or "Bounded search record; details are recorded in the catalogue.",
            "place": record.get("place_text") or "",
        })

    items.sort(key=lambda item: str(item.get("date") or ""), reverse=True)
    labels = {}
    for item in items:
        label = item.get("class") or "Bounded search"
        labels[label] = labels.get(label, 0) + 1

    overview = {
        "count": len(items),
        "by_label": [{"label": key, "count": labels[key]} for key in sorted(labels)]
    }
    return {"items": items, "views": {"overview": overview}}
