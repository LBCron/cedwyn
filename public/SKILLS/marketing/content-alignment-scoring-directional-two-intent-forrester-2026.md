# Content alignment scores are a direction, not a verdict (Forrester, 31 May 2026)

**Source:** Duane Forrester, "You Can Finally Measure Content Alignment. That's the Dangerous Part." (Duane Forrester Decodes, 31 May 2026; also on Search Engine Journal). Read in full 4 Nov 2026. Consultant essay, no study of his own. Cites Steck, Ekanadham & Kallus (Netflix, 2024) on cosine similarity of learned embeddings being able to give "arbitrary" results, and the MTEB leaderboard spread between embedding models.

## The idea
- Keyword research and vector (embedding) alignment both **approximate** relevance. Vector scores have far higher resolution, but a cosine of 0.89 only measures closeness **inside the model you scored with**. Google, ChatGPT and Perplexity use their own embedders and rerankers, and no public list states which.
- Keyword tools give a *known unknown* (you know it's blunt, so you over-cover). Vector scores risk an *unknown unknown*: decimals feel like proof, so teams "optimise until the number goes up".
- What alignment scoring is genuinely good at: spotting **drift**. His example: a "churn prevention" piece passed every keyword audit, but its semantic centre sat nearer "measuring churn" than "preventing churn" because most of it was diagnosis, little was action. Keywords can't see that; an alignment score can.

## How to do it (practitioner steps)
1. Write the target intent as a plain question, plus 1-2 **competing nearby intents** (e.g. "buy the book" vs "learn the history"). Scoring against one query alone tells you little; the gap between intents is the signal.
2. Score **per section**, not per page, and take a word-weighted centre of gravity. Drift lives in which sections carry the words.
3. Use 2+ instruments (lexical TF-IDF plus at least one embedding model if available). Trust only a direction that agrees across them; never compare raw scores across models.
4. Act on the drift, not the number: add or rewrite the thin section the intent needs (the "what to do" half), then re-score. Stop when the direction flips, not when you hit a target score.
5. Validate outside the instrument: does the page get retrieved or cited for that question (Search Console query, the weekly AI visibility probe)? That's the ground truth; the score is a hypothesis.
6. Keep keyword research as the demand map (what people ask); use alignment only to check whether a page answers it.

## How we apply it to Cedwyn
- **Measured live 4 Nov 2026 11:25Z** with `tools/section_alignment.py` (lexical TF-IDF only, no install) on cedwyn.bucklerfamily.estate against two intents: A "buy the Llandough history e-book price free edition download", B "history of Great House Farm Llandough court case evidence".
  - Centre of gravity: **A 0.054 vs B 0.065**. The shop page leans to history/case content, not to the buying question.
  - Of 24 sections, only "Questions" (FAQ, 107 words) leans clearly to buying (0.190 vs 0.067). The book blurbs ("Recorded Incidents", "Concealment...", "The Tŷ Mawr Deaths") score 2-7x higher on B. The price sections ("All four books · £19.96", "Cedwyn Academy · £49.99 a month") barely touch A (0.007 / 0.005) because they carry prices but not the words a buyer asks with (what's inside, format, free edition, how to download).
  - Directional only: one lexical instrument, two hand-written intents.
- **PROPOSED (page freeze holds, nothing committed):** under each book card add one plain buyer line: "What you get: PDF, N pages, v-number; v0.0.1 free; instant download". Moves buying words into the sections that carry the price without touching the history copy. Re-score after; confirm with the weekly visibility probe question "what does the Cedwyn e-book cost and is there a free edition?" (already proposed by the Verified Source Pack skill; reuse, don't duplicate).
- Use the same two-intent check before any new /ebooks/ or /learn/ copy goes live; log scores in the visibility RUNNER's findings, never as a KPI to chase.
- Don't buy an "AI alignment score" tool: zero spend, and the score is model-specific anyway.

## Tool
- `tools/section_alignment.py URL "intent A" "intent B" [...]`: per-section TF-IDF cosine to each intent + word-weighted centre of gravity. requests + lxml (already on box), no install. Lexical only; add an embedding pass later if one is available without install.

## Sources
- duaneforresterdecodes.substack.com (read in full)
- searchenginejournal.com (SEJ syndication, snippet)
- Steck, Ekanadham, Kallus, "Is Cosine-Similarity of Embeddings Really About Similarity?" (2024), cited by Forrester (not opened)