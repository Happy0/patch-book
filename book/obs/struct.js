const nest = require('depnest')
const { Value, Set, Dict, Struct } = require('mutant')

exports.needs = nest({
  'sbot.async.publish': 'first'
})

exports.gives = nest('book.obs.struct')

exports.create = function (api) {
  return nest('book.obs.struct', function (opts = {}) {
    const struct = Struct({
      key: Value(''),
      title: Value(''),
      authors: Value(''),
      series: Value(''),
      seriesNo: Value(''),
      description: Value(''),
      images: Set([]),
      subjective: Dict()
    })

    struct.create = function(cb)
    {
      let s = struct()

      let message = {
        type: 'bookclub',
        title: s.title,
        authors: s.authors,
        series: s.series,
        seriesNo: s.seriesNo,
        description: s.description
      }

      if (s.images.length > 0)
        message.image = s.images[0]

      api.sbot.async.publish(message, cb)
    }

    return struct
  })
}
