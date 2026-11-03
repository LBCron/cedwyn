#!/usr/bin/env python3
"""validate.py — every manifest against migration/schema/webapp.schema.json, plus programme rules
(59 slots, unique ids/uids, consumes point at real apps, live apps carry no Worker on reads once past static_front_end)."""
import json, glob, os, sys
import jsonschema
MIG = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = json.load(open(os.path.join(MIG, 'schema', 'webapp.schema.json'))); V = jsonschema.Draft202012Validator(S)
ms = [json.load(open(f)) for f in sorted(glob.glob(os.path.join(MIG, 'manifests', '*.json')))]
errs = []
for m in ms:
    for e in V.iter_errors(m): errs.append('%s: %s %s' % (m.get('id'), '/'.join(map(str, e.path)), e.message[:160]))
slots = sorted(m['slot']['n'] for m in ms); ids = [m['id'] for m in ms]; uids = [m['uid'] for m in ms]
if slots != list(range(1, 60)): errs.append('slots are not exactly 1..59: %s' % slots)
if len(set(ids)) != len(ids): errs.append('duplicate ids')
if len(set(uids)) != len(uids): errs.append('duplicate uids')
for m in ms:
    if m['uid'] != 'APP-%02d' % m['slot']['n']: errs.append('%s: uid does not match slot' % m['id'])
    for c in m['consumes']:
        if c['app'] not in ids: errs.append('%s consumes unknown app %s' % (m['id'], c['app']))
    if 'static_front_end' in m['migration']['phases_done'] and m['front_end']['worker_on_read']: errs.append('%s: past static_front_end but a Worker runs on reads' % m['id'])
print(json.dumps({'manifests': len(ms), 'valid': len(ms) - len({x.split(':')[0] for x in errs}), 'errors': errs[:50],
                  'live': sum(m['status'] == 'live' for m in ms), 'pending_pr': sum(m['status'] == 'pending_pr' for m in ms),
                  'vacant': sum(m['status'] == 'vacant' for m in ms)}, indent=1))
sys.exit(1 if errs else 0)
