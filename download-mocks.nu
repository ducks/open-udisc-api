mkdir tests/mocks/courses
mkdir tests/mocks/layouts
mkdir tests/mocks/events

http get 'https://udisc.com/courses/maple-hill-lCej.data' | save -f 'tests/mocks/courses/maple-hill-lCej.json'
http get 'https://udisc.com/courses/maple-hill-lCej/v2/layouts/13963.data' | save -f 'tests/mocks/layouts/maple-hill-whites.json'
http get 'https://udisc.com/events/kayak-point-showdown-go-throw-tour-presented-by-prodigy-fr8bos.data' | save -f 'tests/mocks/events/kayak-point-showdown-go-throw-tour-presented-by-prodigy-fr8bos.json'
http get 'https://udisc.com/courses/milo-mc-iver-riverbend-gold-fSaJ/leaderboard.data?layoutId=116090&dateRange=30 Days&_routes=routes/courses/$slug/leaderboard' | save -f 'tests/mocks/courses/milo-gold-leaderboard.json'

echo "Mocks downloaded"
