const userEmails = [
  'emaillubomyr103@gmail.com',
  'ihor.chernobai.softserveinc@gmail.com',
  'fullstackjs.02.01@gmail.com',
  'testtutor@email.com'
]

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

/**
 * Offers Data Seed
 * This array contains offer objects for seeding the database.
 * Each offer has title, description, author, price, and subject details.
 * 8 unique combinations per user email (32 offers total).
 */
const offersData = [
  // Offers for emaillubomyr103@gmail.com
  {
    title: 'Master Algebra Fundamentals with Expert Guidance',
    description: 'Comprehensive algebra tutoring covering linear equations, quadratic functions, and polynomial operations. Perfect for students struggling with algebraic concepts.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 25,
    proficiencyLevel: 'Beginner',
    languages: ['English', 'Ukrainian'],
    subject: 'Algebra',
    category: 'Mathematics',
    status: 'active'
  },
  {
    title: 'Advanced Calculus Tutoring for University Students',
    description: 'Specialized calculus instruction focusing on derivatives, integrals, and advanced mathematical analysis. Ideal for engineering and mathematics majors.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 45,
    proficiencyLevel: 'Advanced',
    languages: ['English'],
    subject: 'Calculus',
    category: 'Mathematics',
    status: 'active'
  },
  {
    title: 'Web Development Bootcamp - From Zero to Hero',
    description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks. Build real-world projects and launch your career.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 60,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'Polish'],
    subject: 'Web Development',
    category: 'Computer Science',
    status: 'active'
  },
  {
    title: 'Creative Writing Workshop - Unlock Your Storytelling',
    description: 'Develop your creative writing skills through structured exercises, peer feedback, and professional guidance. Explore various genres and find your voice.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 35,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'German'],
    subject: 'Creative Writing',
    category: 'Literature',
    status: 'draft'
  },
  {
    title: 'Classical Mechanics for Physics Students',
    description: 'In-depth study of Newtonian mechanics, energy conservation, and motion dynamics. Essential foundation for advanced physics courses.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 50,
    proficiencyLevel: 'Advanced',
    languages: ['English'],
    subject: 'Classical Mechanics',
    category: 'Physics',
    status: 'active'
  },
  {
    title: 'Beginner Piano Lessons - Learn to Play Beautiful Music',
    description: 'Start your musical journey with fundamental piano techniques, music theory basics, and popular song arrangements. No prior experience needed.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 30,
    proficiencyLevel: 'Beginner',
    languages: ['English', 'Ukrainian'],
    subject: 'Piano',
    category: 'Music',
    status: 'active'
  },
  {
    title: 'Fitness Training and Personal Coaching',
    description: 'Personalized fitness programs designed to help you achieve your health goals. Includes workout plans, nutrition guidance, and progress tracking.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 40,
    proficiencyLevel: 'Professional',
    languages: ['English', 'Spanish'],
    subject: 'Fitness Training',
    category: 'Physical Education',
    status: 'active'
  },
  {
    title: 'Digital Art Masterclass - From Sketches to Masterpieces',
    description: 'Learn digital art techniques using professional software. Cover illustration, concept art, and digital painting methods for beginners and intermediates.',
    author: 'emaillubomyr103@gmail.com',
    authorRole: 'tutor',
    price: 55,
    proficiencyLevel: 'Intermediate',
    languages: ['English'],
    subject: 'Digital Art',
    category: 'Art',
    status: 'active'
  },

  // Offers for ihor.chernobai.softserveinc@gmail.com
  {
    title: 'Statistics Made Simple - Data Analysis for Everyone',
    description: 'Learn statistical concepts, probability distributions, and data interpretation. Perfect for students in social sciences, business, and research fields.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 35,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'Ukrainian'],
    subject: 'Statistics',
    category: 'Mathematics',
    status: 'active'
  },
  {
    title: 'Machine Learning Fundamentals for Beginners',
    description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation. Hands-on approach with Python and popular ML libraries.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 70,
    proficiencyLevel: 'Professional',
    languages: ['English'],
    subject: 'Machine Learning',
    category: 'Computer Science',
    status: 'active'
  },
  {
    title: 'Cell Biology Exploration - Life at the Microscopic Level',
    description: 'Dive deep into cellular structures, organelle functions, and cellular processes. Interactive sessions with virtual microscopy and laboratory simulations.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 42,
    proficiencyLevel: 'Advanced',
    languages: ['English', 'French'],
    subject: 'Cell Biology',
    category: 'Biology',
    status: 'active'
  },
  {
    title: 'World History Timeline - Ancient to Modern Civilizations',
    description: 'Comprehensive journey through world history, exploring major civilizations, cultural developments, and historical turning points.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 28,
    proficiencyLevel: 'Beginner',
    languages: ['English', 'German'],
    subject: 'World History',
    category: 'History',
    status: 'draft'
  },
  {
    title: 'Organic Chemistry Lab - Reactions and Mechanisms',
    description: 'Hands-on organic chemistry course focusing on reaction mechanisms, synthesis pathways, and laboratory techniques. Ideal for pre-med students.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 65,
    proficiencyLevel: 'Advanced',
    languages: ['English'],
    subject: 'Organic Chemistry',
    category: 'Chemistry',
    status: 'active'
  },
  {
    title: 'Guitar Lessons for All Levels - Rock, Blues, and Classical',
    description: 'Learn guitar playing techniques across multiple genres. From basic chords to advanced solos, develop your musical skills step by step.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 32,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'Spanish'],
    subject: 'Guitar',
    category: 'Music',
    status: 'active'
  },
  {
    title: 'Cognitive Psychology Insights - Understanding the Mind',
    description: 'Explore how the human mind processes information, forms memories, and makes decisions. Engaging discussions on psychological research and theories.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 38,
    proficiencyLevel: 'Professional',
    languages: ['English', 'Ukrainian'],
    subject: 'Cognitive Psychology',
    category: 'Psychology',
    status: 'active'
  },
  {
    title: 'Photography Fundamentals - Capture Life in Focus',
    description: 'Master the basics of photography including composition, lighting, and camera settings. Work with both digital and film photography techniques.',
    author: 'ihor.chernobai.softserveinc@gmail.com',
    authorRole: 'tutor',
    price: 45,
    proficiencyLevel: 'Beginner',
    languages: ['English'],
    subject: 'Photography',
    category: 'Art',
    status: 'active'
  },

  // Offers for fullstackjs.02.01@gmail.com
  {
    title: 'Geometry Proofs and Problem Solving Mastery',
    description: 'Advanced geometry course covering proofs, theorems, and complex problem-solving strategies. Build logical reasoning and mathematical proof skills.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 40,
    proficiencyLevel: 'Advanced',
    languages: ['English', 'Polish'],
    subject: 'Geometry',
    category: 'Mathematics',
    status: 'active'
  },
  {
    title: 'Cybersecurity Essentials - Protect Digital Assets',
    description: 'Learn cybersecurity fundamentals including network security, encryption, and threat analysis. Essential skills for IT security professionals.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 75,
    proficiencyLevel: 'Professional',
    languages: ['English'],
    subject: 'Cybersecurity',
    category: 'Computer Science',
    status: 'active'
  },
  {
    title: 'Poetry Writing Workshop - Express Your Creative Voice',
    description: 'Develop your poetic voice through various forms and techniques. Explore classical and contemporary poetry styles with constructive feedback.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 30,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'Ukrainian'],
    subject: 'Poetry',
    category: 'Literature',
    status: 'active'
  },
  {
    title: 'Quantum Physics for Advanced Students',
    description: 'Explore the fascinating world of quantum mechanics, wave-particle duality, and quantum field theory. For students with strong mathematical background.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 80,
    proficiencyLevel: 'Specialized',
    languages: ['English'],
    subject: 'Quantum Physics',
    category: 'Physics',
    status: 'active'
  },
  {
    title: 'Ecology and Environmental Science Field Study',
    description: 'Hands-on ecology course combining fieldwork with laboratory analysis. Study ecosystems, biodiversity, and environmental conservation strategies.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 50,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'German'],
    subject: 'Ecology',
    category: 'Biology',
    status: 'draft'
  },
  {
    title: 'Microeconomics Principles and Market Analysis',
    description: 'Comprehensive microeconomics course covering supply and demand, market structures, and consumer behavior. Practical applications included.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 45,
    proficiencyLevel: 'Professional',
    languages: ['English', 'French'],
    subject: 'Microeconomics',
    category: 'Economics',
    status: 'active'
  },
  {
    title: 'Yoga and Mindfulness Practice for Wellness',
    description: 'Holistic approach to physical and mental wellness through yoga practice, meditation, and mindfulness techniques. Suitable for all experience levels.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 25,
    proficiencyLevel: 'Beginner',
    languages: ['English', 'Spanish'],
    subject: 'Yoga',
    category: 'Physical Education',
    status: 'active'
  },
  {
    title: 'Ethics in Philosophy - Moral Reasoning and Decision Making',
    description: 'Explore fundamental ethical theories and their practical applications. Engage in philosophical discussions about morality, justice, and human values.',
    author: 'fullstackjs.02.01@gmail.com',
    authorRole: 'tutor',
    price: 35,
    proficiencyLevel: 'Advanced',
    languages: ['English'],
    subject: 'Ethics',
    category: 'Philosophy',
    status: 'active'
  },

  // Offers for testtutor@email.com
  {
    title: 'Linear Algebra Applications in Real World Problems',
    description: 'Practical linear algebra course focusing on real-world applications in engineering, computer science, and data analysis. Matrix operations and vector spaces.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 55,
    proficiencyLevel: 'Professional',
    languages: ['English', 'Arabic'],
    subject: 'Linear Algebra',
    category: 'Mathematics',
    status: 'active'
  },
  {
    title: 'Database Design and Management Systems',
    description: 'Comprehensive database course covering design principles, SQL, and database management systems. Hands-on projects with popular database platforms.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 60,
    proficiencyLevel: 'Intermediate',
    languages: ['English'],
    subject: 'Database Design',
    category: 'Computer Science',
    status: 'active'
  },
  {
    title: 'British Literature Through the Ages',
    description: 'Journey through British literary history from Shakespeare to contemporary authors. Analyze major works and understand historical literary contexts.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 35,
    proficiencyLevel: 'Advanced',
    languages: ['English', 'Ukrainian'],
    subject: 'British Literature',
    category: 'Literature',
    status: 'active'
  },
  {
    title: 'Thermodynamics and Heat Transfer Engineering',
    description: 'Advanced thermodynamics course covering heat transfer, energy conversion, and thermal systems. Essential for mechanical and chemical engineering students.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 65,
    proficiencyLevel: 'Specialized',
    languages: ['English'],
    subject: 'Thermodynamics',
    category: 'Physics',
    status: 'active'
  },
  {
    title: 'General Chemistry Laboratory Techniques',
    description: 'Hands-on chemistry lab course covering fundamental techniques, safety procedures, and analytical methods. Perfect for science majors and pre-health students.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 40,
    proficiencyLevel: 'Beginner',
    languages: ['English', 'Polish'],
    subject: 'General Chemistry',
    category: 'Chemistry',
    status: 'draft'
  },
  {
    title: 'Social Psychology - Human Behavior in Groups',
    description: 'Explore how social environments influence individual behavior. Study group dynamics, social influence, and interpersonal relationships.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 42,
    proficiencyLevel: 'Intermediate',
    languages: ['English', 'German'],
    subject: 'Social Psychology',
    category: 'Psychology',
    status: 'active'
  },
  {
    title: 'Music Theory and Composition Fundamentals',
    description: 'Learn the building blocks of music including scales, harmony, rhythm, and compositional techniques. Develop skills for music creation and analysis.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 38,
    proficiencyLevel: 'Professional',
    languages: ['English', 'French'],
    subject: 'Music Theory',
    category: 'Music',
    status: 'active'
  },
  {
    title: 'Cultural Anthropology - Understanding Human Societies',
    description: 'Comprehensive study of human cultures, social structures, and cultural practices across different societies. Fieldwork methods and ethnographic analysis.',
    author: 'testtutor@email.com',
    authorRole: 'tutor',
    price: 48,
    proficiencyLevel: 'Advanced',
    languages: ['English', 'Spanish'],
    subject: 'Cultural Anthropology',
    category: 'Anthropology',
    status: 'active'
  }
]

module.exports = {
  categoriesData,
  categoriesNames,
  subjectsByCategory,
  offersData,
  userEmails
}
