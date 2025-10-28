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

/**
 * Subjects Data by Category
 * This object contains subject names organized by category.
 * Each category maps to an array of related subjects.
 */
const subjectsByCategory = {
  'Mathematics': ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry', 'Probability', 'Number Theory', 'Linear Algebra'],
  'Science': ['General Science', 'Earth Science', 'Environmental Science', 'Astronomy', 'Forensic Science', 'Marine Science', 'Meteorology', 'Geology'],
  'Literature': ['Creative Writing', 'Poetry', 'World Literature', 'American Literature', 'British Literature', 'Literary Analysis', 'Drama', 'Mythology'],
  'History': ['World History', 'Ancient History', 'Medieval History', 'Modern History', 'Art History', 'Military History', 'Social History', 'Cultural History'],
  'Art': ['Drawing', 'Painting', 'Sculpture', 'Digital Art', 'Graphic Design', 'Photography', 'Ceramics', 'History of Art'],
  'Music': ['Music Theory', 'Piano', 'Guitar', 'Violin', 'Voice', 'Composition', 'Music History', 'Audio Engineering'],
  'Physical Education': ['Fitness Training', 'Sports Medicine', 'Nutrition', 'Team Sports', 'Individual Sports', 'Dance', 'Yoga', 'Athletic Training'],
  'Computer Science': ['Programming', 'Web Development', 'Data Structures', 'Algorithms', 'Database Design', 'Machine Learning', 'Cybersecurity', 'Software Engineering'],
  'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Anatomy', 'Physiology', 'Microbiology', 'Botany', 'Zoology'],
  'Chemistry': ['General Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Biochemistry', 'Materials Science', 'Chemical Engineering'],
  'Physics': ['Classical Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics', 'Optics', 'Astrophysics', 'Nuclear Physics', 'Particle Physics'],
  'Economics': ['Microeconomics', 'Macroeconomics', 'International Economics', 'Public Economics', 'Labor Economics', 'Financial Economics', 'Development Economics', 'Econometrics'],
  'Philosophy': ['Ethics', 'Logic', 'Metaphysics', 'Epistemology', 'Political Philosophy', 'Philosophy of Mind', 'Ancient Philosophy', 'Modern Philosophy'],
  'Psychology': ['Cognitive Psychology', 'Social Psychology', 'Developmental Psychology', 'Clinical Psychology', 'Behavioral Psychology', 'Neuropsychology', 'Educational Psychology', 'Abnormal Psychology'],
  'Sociology': ['Social Theory', 'Research Methods', 'Social Inequality', 'Urban Sociology', 'Family Sociology', 'Crime and Deviance', 'Social Movements', 'Cultural Sociology'],
  'Anthropology': ['Cultural Anthropology', 'Physical Anthropology', 'Archaeology', 'Linguistic Anthropology', 'Medical Anthropology', 'Applied Anthropology', 'Forensic Anthropology', 'Environmental Anthropology']
}

module.exports = {
  categoriesData,
  categoriesNames,
  subjectsByCategory
}
