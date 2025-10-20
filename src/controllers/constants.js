const {
  enums: { SPOKEN_LANG_ENUM }
} = require('~/consts/validation')

const getLanguages = (req, res) => {
  res.status(200).json({
    success: true,
    data: SPOKEN_LANG_ENUM.map(lang => ({ code: lang }))
  })
}

module.exports = {
  getLanguages
}
