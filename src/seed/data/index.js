/**
 * Categories Data Seed
 * This file contains an array of category objects used to seed the database.
 * Each category has a name and an appearance object with icon and color properties.
 * Icons match the Material Icons library v5
 */
const categoriesData = [
  { name: 'Mathematics', appearance: { icon: 'Calculate', color: '#FF5733' } },
  { name: 'Science', appearance: { icon: 'Science', color: '#33FF57' } },
  { name: 'Literature', appearance: { icon: 'MenuBook', color: '#3357FF' } },
  { name: 'History', appearance: { icon: 'Museum', color: '#F1C40F' } },
  { name: 'Art', appearance: { icon: 'Palette', color: '#9B59B6' } },
  { name: 'Music', appearance: { icon: 'MusicNote', color: '#E67E22' } },
  { name: 'Physical Education', appearance: { icon: 'FitnessCenter', color: '#1ABC9C' } },
  { name: 'Computer Science', appearance: { icon: 'Computer', color: '#34495E' } },
  { name: 'Biology', appearance: { icon: 'Biotech', color: '#27AE60' } },
  { name: 'Chemistry', appearance: { icon: 'Science', color: '#2980B9' } },
  { name: 'Physics', appearance: { icon: 'Physics', color: '#8E44AD' } },
  { name: 'Economics', appearance: { icon: 'TrendingUp', color: '#D35400' } },
  { name: 'Philosophy', appearance: { icon: 'Psychology', color: '#7F8C8D' } },
  { name: 'Psychology', appearance: { icon: 'Psychology', color: '#C0392B' } },
  { name: 'Sociology', appearance: { icon: 'Groups', color: '#16A085' } },
  { name: 'Anthropology', appearance: { icon: 'Explore', color: '#8E44AD' } }
]

const categoriesNames = categoriesData.map(category => category.name)

module.exports = {
  categoriesData,
  categoriesNames
}
