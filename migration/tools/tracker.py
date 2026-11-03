#!/usr/bin/env python3
"""tracker.py — derives the programme tracker (migration.json + MIGRATION.md table) from the 59 manifests.
The manifests are the single source; never edit migration.json by hand."""
import json, glob, os, datetime
MIG = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PH = ["inventory", "manifest", "branch", "static_front_end", "data_slice", "api", "header", "live_verified"]
ms = [json.load(open(f)) for f in sorted(glob.glob(os.path.join(MIG, 'manifests', '*.json')))]
rows = []
for m in ms:
    mi = m['migration']
    rows.append({'slot': m['slot']['n'], 'id': m['id'], 'uid': m['uid'], 'title': m['title']['en'], 'section': m['section'], 'status': m['status'],
                 'branch': m['branch']['name'], 'phase': mi['phase'], 'phases_done': mi['phases_done'], 'rag': mi['rag'],
                 'next_action': mi['next_action'], 'blockers': mi['blockers'], 'prs': mi.get('prs', []), 'pilot': mi.get('pilot', False),
                 'worker_on_read': m['front_end']['worker_on_read'], 'catalogue_status': m['data'].get('catalogue_status'),
                 'candidate': (m.get('vacant') or {}).get('candidate')})
now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
summary = {'by_phase': {p: sum(1 for r in rows if r['phase'] == p) for p in PH},
           'reached': {p: sum(1 for r in rows if p in r['phases_done']) for p in PH},
           'by_rag': {k: sum(1 for r in rows if r['rag'] == k) for k in ('green', 'amber', 'red', 'grey')},
           'by_status': {k: sum(1 for r in rows if r['status'] == k) for k in ('live', 'pending_pr', 'vacant')},
           'by_section': {k: sum(1 for r in rows if r['section'] == k) for k in ('Wales', 'Argentina', 'Online')},
           'worker_on_read': [r['id'] for r in rows if r['worker_on_read']]}
json.dump({'schema': 'cedwyn-migration-tracker/1', 'updated': now, 'phases': PH, 'summary': summary, 'rows': rows},
          open(os.path.join(MIG, 'migration.json'), 'w'), indent=1, ensure_ascii=False)
# table for MIGRATION.md (between markers)
md = os.path.join(MIG, 'MIGRATION.md'); txt = open(md).read() if os.path.exists(md) else ''
tab = ['| # | webapp | section | status | phase | RAG | next action |', '|---|---|---|---|---|---|---|']
for r in rows:
    tab.append('| %d | %s | %s | %s | %s | %s | %s |' % (r['slot'], r['id'] if r['status'] == 'live' else '%s (→ %s)' % (r['id'], r['candidate']),
               r['section'], r['status'], r['phase'], r['rag'], r['next_action'].replace('|', '/')))
block = '<!-- TRACKER:START -->\nUpdated %s. Counts by last completed phase: %s. RAG: %s.\n\n%s\n<!-- TRACKER:END -->' % (
    now, ', '.join('%s %d' % (k, v) for k, v in summary['by_phase'].items() if v), ', '.join('%s %d' % (k, v) for k, v in summary['by_rag'].items() if v), '\n'.join(tab))
if '<!-- TRACKER:START -->' in txt:
    a = txt.index('<!-- TRACKER:START -->'); b = txt.index('<!-- TRACKER:END -->') + len('<!-- TRACKER:END -->'); txt = txt[:a] + block + txt[b:]
else: txt = txt + '\n' + block + '\n'
open(md, 'w').write(txt); print(json.dumps(summary))
