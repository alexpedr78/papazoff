import { client } from './client'

// Fetch artist information
export const getArtistInfo = async () => {
  const query = `*[_type == "artistInfo"][0]{
    name,
    bio,
    shortBio,
    profileImage,
    heroTitle,
    heroSubtitle,
    email,
    phone,
    website,
    socialMedia,
    yearsActive,
    education,
    awards
  }`
  
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error('Error fetching artist info:', error)
    return null
  }
}

// Fetch all paintings
export const getPaintings = async () => {
  const query = `*[_type == "painting"] | order(order asc, _createdAt desc){
    _id,
    title,
    slug,
    image,
    description,
    size,
    material,
    price,
    year,
    availability,
    tags,
    featured,
    order
  }`
  
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error('Error fetching paintings:', error)
    return []
  }
}

// Fetch featured paintings only
export const getFeaturedPaintings = async () => {
  const query = `*[_type == "painting" && featured == true] | order(order asc, _createdAt desc){
    _id,
    title,
    slug,
    image,
    description,
    size,
    material,
    price,
    year,
    availability,
    tags
  }`
  
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error('Error fetching featured paintings:', error)
    return []
  }
}

// Fetch all exhibitions
export const getExhibitions = async () => {
  const query = `*[_type == "exhibition"] | order(startDate desc){
    _id,
    title,
    slug,
    location,
    startDate,
    endDate,
    status,
    description,
    image,
    featuredPaintings[]->{
      _id,
      title,
      image
    },
    gallery,
    website,
    featured,
    order
  }`
  
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error('Error fetching exhibitions:', error)
    return []
  }
}

// Fetch manifesto
export const getManifesto = async () => {
  const query = `*[_type == "manifesto"][0]{
    title,
    excerpt,
    video,
    videoUrl,
    fullText,
    publishedAt,
    coverImage
  }`
  
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error('Error fetching manifesto:', error)
    return null
  }
}

// Fetch comments for a specific painting or exhibition
export const getComments = async (contentId, contentType) => {
  const query = `*[_type == "comment" && approved == true && ${contentType} == "${contentId}"] | order(_createdAt desc){
    _id,
    author,
    comment,
    createdAt
  }`
  
  try {
    const result = await client.fetch(query)
    return result
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Submit a new comment
export const submitComment = async (commentData) => {
  try {
    const result = await client.create({
      _type: 'comment',
      approved: false, // Comments need approval
      ...commentData,
      createdAt: new Date().toISOString()
    })
    return result
  } catch (error) {
    console.error('Error submitting comment:', error)
    throw error
  }
}
