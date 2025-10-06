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
// Récupère les expos dont status === 'current'
export const getCurrentExhibitions = async () => {
  const query = `
    *[_type == "exhibition" && status == "current"]
      | order(startDate asc) {
        _id,
        title,
        slug,
        location,
        startDate,
        endDate,
        image,
        featuredPaintings[]->{
          _id,
          title,
          mainImage
        },
        // documents PDF, PPT, Word…
        documents[]{
          "url": asset->url,
          "fileName": asset->originalFilename
        },
        // vidéos associées
        videos[]{
          title,
          description,
          "url": file.asset->url,
          "fileName": file.asset->originalFilename
        }
      }
  `;
  try {
    return await client.fetch(query);
  } catch (err) {
    console.error("Error fetching current exhibitions:", err);
    return [];
  }
};
//FETCH LES EXPOSITIONS A VENIR
export const getUpcomingExhibitions = async () => {
  const query = `
    *[_type == "exhibition" && status == "upcoming"]
      | order(startDate asc) {
        _id,
        title,
        slug,
        location,
        startDate,
        endDate,
        image,
        featuredPaintings[]->{
          _id,
          title,
          mainImage
        },
        documents[]{
          "url": asset->url,
          "fileName": asset->originalFilename
        },
        videos[]{
          title,
          description,
          "url": file.asset->url,
          "fileName": file.asset->originalFilename
        }
      }
  `;
  try {
    return await client.fetch(query);
  } catch (err) {
    console.error("Error fetching upcoming exhibitions:", err);
    return [];
  }
};
// fetch les exposititions à venir
export const getPastExhibitions = async () => {
  const query = `
    *[_type == "exhibition" && status == "past"]
      | order(endDate desc) {
        _id,
        title,
        slug,
        location,
        startDate,
        endDate,
        image,
        featuredPaintings[]->{
          _id,
          title,
          mainImage
        },
        documents[]{
          "url": asset->url,
          "fileName": asset->originalFilename
        },
        videos[]{
          title,
          description,
          "url": file.asset->url,
          "fileName": file.asset->originalFilename
        }
      }
  `;
  try {
    return await client.fetch(query);
  } catch (err) {
    console.error("Error fetching past exhibitions:", err);
    return [];
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
export const getPapazoffInfo = async () => {
  const query = `*[_type == "papazoffInfo"][0]{
    name,
    "profileImageUrl": profileImage.asset->url,

    // --- PRESS BOOK ---
    "pressBookProfileImageUrl": pressBookProfileImage.asset->url,
    pressBook[]{
      title,
      description,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[]{ "url": asset->url }
    },

    // --- FILMS ---
    "filmsProfileImageUrl": filmsProfileImage.asset->url,
    films[]{
      title,
      description,
      videoUrl,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      images[]{ "url": asset->url }
    },

    // --- MANIFESTE ---
    "manifesteProfileImageUrl": manifesteProfileImage.asset->url,
    manifeste[]{
      title,
      description,
      "fileUrl": document.asset->url,
      "fileName": document.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[]{ "url": asset->url }
    },

    // --- CONFÉRENCES ---
    "conferencesProfileImageUrl": conferencesProfileImage.asset->url,
    conferences[]{
      title,
      description,
      date,
      location,
      "docUrl": document.asset->url,
      "docName": document.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[]{ "url": asset->url }
    },

    // --- POÉSIE ---
    "poesieProfileImageUrl": poesieProfileImage.asset->url,
    poesie[]{
      title,
      description,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[]{ "url": asset->url }
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
export const getToilesChezLesGens = async () => {
  const query = `*[_type == "toilesChezLesGens"] | order(_createdAt desc){
    _id,
    title,
    description,
    "mainPhotoUrl": mainPhoto.asset->url,
    photos[]{
      asset->{url}
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching Toiles chez les Gens:", error);
    return [];
  }
};
// Fetch all series
export const getSeries = async () => {
  const query = `
    *[_type == "serie"] | order(_createdAt desc){
      _id,
      title,
      description,
      coverImage,                // votre image de couverture
      "paintings": paintings[]->{  
        _id,
        title,
        mainImage,               // champ image principal
        gallery                  // tableau d’images
      }
    }
  `;
  try {
    return await client.fetch(query);
  } catch (e) {
    console.error("Error fetching series:", e);
    return [];
  }
};
// fetch les séries par titre
export const getSerieByTitle = async (title) => {
  const query = `*[_type == "serie" && title == $title][0]{
    _id,
    title,
    description,
    paintings[]->{
      _id,
      price,
      title,
      mainImage,
      medium,
      year,
      dimensions,
      availability
    }
  }`;
  return await client.fetch(query, { title });
};
// fetch les expositions par titre
export const getExhibitionByTitle = async (title) => {
  const query = `*[_type == "exhibition" && title == $title][0]{
    _id,
    title,
    location,
    startDate,
    endDate,
    description,
    // Image principale
    "image": image.asset->url,
    
    // Tableaux présentés
    featuredPaintings[]->{
      _id,
      title,
      "mainImage": mainImage.asset->url
    },
    
    // Galerie
    "gallery": gallery[]{
      "url": asset->url,
      "alt": asset->altText
    },
    
    // Documents
    "documents": documents[]{
      "url": asset->url,
      "fileName": asset->originalFilename
    },
    
    // Vidéos
    "videos": videos[]{
      title,
      description,
      "url": file.asset->url
    }
  }`;

  try {
    return await client.fetch(query, { title });
  } catch (e) {
    console.error("Error fetching exhibition:", e);
    return null;
  }
};
