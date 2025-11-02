const offerService = require('~/services/offer')

const getOffers = async (req, res) => {
  const { total, perPage, currentPage, totalPages, offers } = await offerService.getOffers(req.query)

  res.status(200).json({
    success: true,
    total,
    currentPage,
    totalPages,
    perPage,
    data: offers,
  })
}

const getOfferById = async (req, res) => {
  const { id } = req.params

  const offer = await offerService.getOfferById(id)

  res.status(200).json(offer)
}

const createOffer = async (req, res) => {
  const { id: authorId, role: authorRole } = {id: '68e3dc32d6a9e60d86fd79c0', role: 'tutor' } //req.user
  const data = req.body

  const newOffer = await offerService.createOffer(authorId, authorRole, data)

  res.status(201).json(newOffer)
}

const updateOffer = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const { id: currentUserId } = req.user

  await offerService.updateOffer(id, currentUserId, updateData)

  res.status(204).end()
}

const deleteOffer = async (req, res) => {
  const { id } = req.params

  await offerService.deleteOffer(id)

  res.status(204).end()
}

module.exports = {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer
}
