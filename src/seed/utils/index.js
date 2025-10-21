const mapItemsToField = (items, field = 'name') => items.map(item => item[field])

const getItemsToSeed = ({ seedData, existingItems, field }) => {
  const existingNames = mapItemsToField(existingItems, field)
  const filteredCategories = seedData.filter(el => !existingNames.includes(el[field]))

  return filteredCategories
}

module.exports = {
  mapItemsToField,
  getItemsToSeed
}
