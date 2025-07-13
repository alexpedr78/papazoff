import { client } from "./client";

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
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching artist info:", error);
    return null;
  }
};

// Fetch all paintings
export const getPaintings = async () => {
  const query = `*[_type == "painting"] | order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage,
    description,
    dimensions,
    medium,
    price,
    year,
    available,
    gallery
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching paintings:", error);
    return [];
  }
};

// Fetch featured paintings
export const getFeaturedPaintings = async () => {
  const query = `*[_type == "painting" && available == true] | order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage,
    description,
    dimensions,
    medium,
    price,
    year,
    available,
    gallery
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching featured paintings:", error);
    return [];
  }
};

// Fetch exhibitions
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
      mainImage
    },
    gallery,
    website,
    featured,
    order
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
    return [];
  }
};

// Fetch manifesto
export const getManifesto = async () => {
  const query = `*[_type == "manifesto"][0]{
    title,
    excerpt,
    videoUrl,
    fullText,
    publishedAt,
    coverImage
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching manifesto:", error);
    return null;
  }
};

// Fetch comments for a given content
export const getComments = async (contentId, contentType) => {
  const query = `*[_type == "comment" &&  contentType == $contentType && contentId == $contentId] | order(_createdAt desc){
    _id,
    author,
    comment,
    createdAt
  }`;
  const params = {
    contentId,
    contentType,
  };
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

// Submit a new comment
export const submitComment = async (commentData) => {
  try {
    const result = await client.create({
      _type: "comment",
      // approved: false, // New comments are pending approval
      ...commentData,
      createdAt: new Date().toISOString(),
    });
    return result;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
// Fetch Papazoff Info
export const getPapazoffInfo = async () => {
  const query = `*[_type == "papazoffInfo"][0]{
    conferences[]{
      title,
      date,
      location,
      description
    },
    dossierExpos[]{
      title,
      "fileUrl": file.asset->url
    },
    pressBookFormats[]{
      format,
      "fileUrl": file.asset->url
    },
    film{
      title,
      videoUrl
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching Papazoff Info:", error);
    return null;
  }
};
// Fetch studio photos
export const getStudioPhotos = async () => {
  const query = `*[_type == "studioPhoto"] | order(_createdAt desc){
    _id,
    title,
    caption,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching studio photos:", error);
    return [];
  }
};
// Fetch "Toiles chez les Gens"
export const getToilesChezLesGens = async () => {
  const query = `*[_type == "toilesChezLesGens"] | order(_createdAt desc){
    _id,
    title,
    caption,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching Toiles chez les Gens:", error);
    return [];
  }
};
