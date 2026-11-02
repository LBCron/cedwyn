# Garden Store changelog
| Version | Date | Change |
|---|---|---|
| 0.3.0 | 2026-11-02 | Owner request 14:11 GMT: 20 products per page and a page bar at the bottom like a search engine (Previous · 1 2 3 … last · Next, current page highlighted, collapses to 1 … n-1 n n+1 … last on a phone). Each page has its own URL (?page=N, also q/type/group for search and filters), so links, deep links and the back button work; the page is rendered on the server too, so it works without JavaScript; changing page scrolls to the top of the results; search and filters recount the pages and reset to page 1. Buy links, prices and the no-payment rule unchanged. |
| 0.2.0 | 2026-11-02 | Owner request 10:06 GMT: the old all-caps store label removed (page, title, webapps bar, agent text); one provenance line now opens the store. Buy links (gardencity.cymru with utm tags), prices and the no-payment rule unchanged. |
| 0.1.0 | 2026-11-02 | First release: Garden City's catalogue (gardencity.cymru) as our own plant store at bucklerfamily.estate/garden-store/ (webapp 46 of 59): grid, product pages, search, plants / home & gifts / type filters; every Buy opens her product page in a new tab with utm_source=bucklerfamily&utm_medium=garden-store; no checkout or payment on our side; own SQLite Durable Object database refreshed from her public catalogue every 6 h; WebMCP tools; (i) changelog; agent guest book collapsed. |

— Sion's Tab agent
