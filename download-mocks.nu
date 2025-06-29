let items = [
  {
    url: 'https://udisc.com/courses/maple-hill-lCej.data'
    path: 'tests/mocks/courses/maple-hill-lCej.json'
  }
  {
    url: 'https://udisc.com/courses/maple-hill-lCej/v2/layouts/13963.data'
    path: 'tests/mocks/layouts/maple-hill-whites.json'
  }
  {
    url: 'https://udisc.com/events/kayak-point-showdown-go-throw-tour-presented-by-prodigy-fr8bos.data'
    path: 'tests/mocks/events/kayak-point-showdown-go-throw-tour-presented-by-prodigy-fr8bos.json'
  }
  {
    url: 'https://udisc.com/courses/milo-mc-iver-riverbend-gold-fSaJ/leaderboard.data?layoutId=116090&dateRange=30 Days&_routes=routes/courses/$slug/leaderboard'
    path: 'tests/mocks/courses/milo-gold-leaderboard.json'
  }
  {
    url: 'https://udisc.com/courses/evergreen-state-college-B2ox/leaderboard.data?layoutId=34929&dateRange=30 Days&_routes=routes/courses/$slug/leaderboard'
    path: 'tests/mocks/courses/evergreen-leaderboard.json'
  }
]

for item in $items {
  let data = http get $item.url

  # Extract parent directory correctly
  let parent_dir = ($item.path | path dirname)

  # Create the directory if needed
  mkdir $parent_dir

  # Save to file
  $data | save --force $item.path
}

echo "Mocks downloaded"
