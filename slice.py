"""dartboard slice builder 1.1.0 (cedwyn-webapp/1.1.0 standard).
1.1.0 (3 Nov 2026, design restore): also publishes the ORIGINAL app's own data files (unclehowell/datro@dartboard,
public/data/*) unchanged as res['raw_files'] -> api/v1/data/<file>, which the restored original front end reads. Read by migration/tools/build_site.py.
Slice "roadmap": the disclosure roadmap, one row per institution, built only from central-catalogue records
(TOC- FOI findings and AR-FOI response attachments, public fields only; no correspondence bodies, no quotes).
Every row and item carries the catalogue UIDs it was built from. This builder never writes a record."""
import re
LIVE = 'https://cedwyn.bucklerfamily.estate'
RAWD = 'https://raw.githubusercontent.com/unclehowell/datro/dartboard/public/data/'
DATA_FILES = ['roadmap.json', 'roadmap-part-1.json', 'roadmap-part-2.json', 'forecast.json', 'ladders.json', 'ladders-part-1.json',
              'ladders-part-2.json', 'request-status.json', 'snakes-ladders.json', 'snl-board.json', 'snl-mail.json', 'snl-play.json', 'foi-tracker.csv']
ALIAS = [  # display name -> match words (lower case); first match wins
    ('Heneb (Historic Environment Record)', ['heneb']),
    ('Welsh Government / Cadw', ['cadw', 'welsh government']),
    ('HM Land Registry', ['land registry', 'hmlr']),
    ('RCAHMW (Royal Commission)', ['rcahmw', 'royal commission']),
    ('Glamorgan Archives', ['glamorgan archives']),
    ('Amgueddfa Cymru - Museum Wales', ['museum wales', 'amgueddfa']),
    ('Historic England', ['historic england']),
    ('Vale of Glamorgan Council', ['vale of glamorgan']),
    ('The National Archives', ['national archives']),
    ('Ministry of Justice / HMCTS', ['ministry of justice', 'hmcts', 'moj']),
    ('South Wales Police', ['south wales police']),
    ('PACAC (House of Commons committee)', ['pacac']),
    ('Llandough Community Council', ['llandough community council']),
]
def inst(name):
    n = (name or '').lower()
    for disp, words in ALIAS:
        if any(w in n for w in words): return disp
    return (name or 'Other').strip()
def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
def build(ctx):
    rows = {}; items = []
    for r in ctx['catalogue']:
        if not r.get('public'): continue
        if r.get('kind') == 'foi_finding':
            f = r.get('finding') or {}; i = inst(f.get('institution') or (r.get('provenance') or {}).get('holder'))
            it = {'uid': r['id'], 'key': r['id'], 'kind': 'finding', 'record_kind': r['kind'], 'title': r['title'],
                  'institution': i, 'institution_id': slug(i), 'class': f.get('class'),
                  'date': f.get('negative_date') or (r.get('date') or {}).get('sort'), 'later_date': f.get('positive_date') or None,
                  'months_elapsed': f.get('months_elapsed'), 'disclosure_type': f.get('disclosure_type') or '',
                  'trigger': f.get('trigger') or '', 'evidence': r.get('evidence') or [],
                  'summary': ('Finding class: %s. %s' % (f.get('class') or 'n/a', f.get('disclosure_type') or '')).strip(),
                  'url': LIVE + '/that-old-chestnut/#' + r['id']}
            items.append(it)
            row = rows.setdefault(it['institution_id'], {'institution_id': it['institution_id'], 'institution': i, 'findings': [], 'classes': {}, 'attachments': 0, 'first': None, 'last': None})
            row['findings'].append(r['id']); row['classes'][it['class']] = row['classes'].get(it['class'], 0) + 1
            for d in (it['date'], it['later_date']):
                if d: row['first'] = min(row['first'] or d, d); row['last'] = max(row['last'] or d, d)
        elif r.get('kind') == 'artifact' and r['id'].startswith('AR-FOI'):
            i = inst((r.get('provenance') or {}).get('holder'))
            row = rows.setdefault(slug(i), {'institution_id': slug(i), 'institution': i, 'findings': [], 'classes': {}, 'attachments': 0, 'first': None, 'last': None})
            row['attachments'] += 1
            d = (r.get('date') or {}).get('sort')
            if isinstance(d, str) and d[:4].isdigit(): row['first'] = min(row['first'] or d, d); row['last'] = max(row['last'] or d, d)
    order = {'clear': 0, 'borderline': 1, 'language': 2}
    roadmap = sorted(rows.values(), key=lambda x: (-len(x['findings']), -x['attachments'], x['institution']))
    for x in roadmap:
        x['stage'] = 'finding recorded' if x['findings'] else 'replies catalogued'
    items.sort(key=lambda x: (order.get(x['class'], 9), x['date'] or ''))
    raw = {}
    for f in DATA_FILES:
        try: raw[f] = ctx['fetch'](RAWD + f)
        except Exception: pass
    return {'items': items, 'raw_files': raw, 'views': {'roadmap': {'institutions': roadmap, 'count': len(roadmap)},
                                       'institutions': [{'id': x['institution_id'], 'name': x['institution'], 'findings': len(x['findings']), 'attachments': x['attachments']} for x in roadmap]}}
