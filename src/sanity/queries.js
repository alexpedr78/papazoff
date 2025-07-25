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
// Fetch Papazoff Info
export const getPapazoffInfo = async () => {
  const query = `*[_type == "papazoffInfo"][0]{
    conferences[]{
      title,
      date,
      location,
      description,
      "documentUrl": document.asset->url,
      "documentName": document.asset->originalFilename,
      "filmUrl": film.asset->url,
      "filmName": film.asset->originalFilename
    },
    dossierExpos[]{
      title,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
    },
    pressBookFormats[]{
      format,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
    },
    films[]{
      title,
      videoUrl,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename
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
// src/sanity/queries.js
export const getExhibitionByTitle = async (title) => {
  const query = `
    *[_type == "exhibition" && title == $title][0]{
      _id,
      title,
      // slug si besoin
      "slug": slug.current,
      location,
      startDate,
      endDate,
      status,
      description,
      // image principale + url
      image{ 
        asset->{
          _id,
          url
        }
      },
      // tableaux présentés
      "featuredPaintings": coalesce(featuredPaintings[]->{
        _id,
        title,
        "mainImage": mainImage.asset->url
      }, []),
      // galerie d’images
      "gallery": coalesce(gallery[]{
        "url": asset->url,
        "alt": asset->originalFilename
      }, []),
      website,
      featured,
      order,
      // documents (PDF, PPT, Word…)
      "documents": coalesce(documents[]{
        "url": asset->url,
        "fileName": asset->originalFilename
      }, []),
      // vidéos associées
      "videos": coalesce(videos[]{
        title,
        description,
        "url": file.asset->url,
        "fileName": file.asset->originalFilename
      }, [])
    }
  `;
  return client.fetch(query, { title });
};
