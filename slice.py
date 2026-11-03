"""Negative Finds slice builder 0.1.0 (cedwyn-webapp/1.0.0).

Selects public kind=missing_record entries from the read-only central catalogue.
Each item is a bounded search record, not a conclusion that the source or relationship is absent.
This builder never writes to the central catalogue.
"""
LIVE = "https://cedwyn.bucklerfamily.estate"

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
        summary_parts = [p for p in (result, limit, "Next: " + next_action if next_action else "") if p]
        summary = " ".join(summary_parts) or record.get("description") or "Bounded search record; see the item details."

        items.append({
            "uid": record["id"],
            "key": record["id"],
            "kind": "negative_screen",
            "title": record.get("title") or record["id"],
            "date": date.get("sort") or date.get("display") or "",
            "place": record.get("place_text") or "",
            "label": scope.get("label") or "Bounded search",
            "summary": summary,
            "question": question,
            "searched": searched,
            "result": result,
            "limit": limit,
            "next_action": next_action,
            "source": provenance.get("reference") or "",
            "source_holder": provenance.get("holder") or "",
            "retrieval_stage": provenance.get("obtained") or "",
            "url": LIVE + "/negative-finds/api/v1/items/" + record["id"] + ".json"
        })

    items.sort(key=lambda item: str(item.get("date") or ""), reverse=True)
    by_label = {}
    for item in items:
        label = item.get("label") or "Bounded search"
        by_label[label] = by_label.get(label, 0) + 1

    overview = {
        "count": len(items),
        "by_label": [{"label": key, "count": by_label[key]} for key in sorted(by_label)]
    }
    return {"items": items, "views": {"overview": overview}}
