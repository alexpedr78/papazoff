import { client } from "./client";

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

export const submitComment = async (commentData) => {
  try {
    const result = await client.create({
      _type: "comment",
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
    "pressBookProfileImageUrl": pressBookProfileImage.asset->url,
    "filmsProfileImageUrl": filmsProfileImage.asset->url,
    "manifesteProfileImageUrl": manifesteProfileImage.asset->url,
    "conferencesProfileImageUrl": conferencesProfileImage.asset->url,
    "poesieProfileImageUrl": poesieProfileImage.asset->url,

  
    pressBook[] {
      title,
      description,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[] {
        "url": asset->url
      }
    },

    films[] {
      title,
      description,
      videoUrl,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      images[] {
        "url": asset->url
      }
    },

    manifeste[] {
      title,
      description,
      "fileUrl": document.asset->url,
      "fileName": document.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[] {
        "url": asset->url
      }
    },

    conferences[] {
      title,
      description,
      date,
      location,
      "docUrl": document.asset->url,
      "docName": document.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[] {
        "url": asset->url
      }
    },

    poesie[] {
      title,
      description,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      videoUrl,
      "videoFileUrl": videoFile.asset->url,
      "videoFileName": videoFile.asset->originalFilename,
      images[] {
        "url": asset->url
      }
    }
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching Papazoff Info:", error);
    return null;
  }
};

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

export const getSeries = async () => {
  const query = `
    *[_type == "serie"] | order(_createdAt desc){
      _id,
      title,
      description,
      coverImage,               
      "paintings": paintings[]->{  
        _id,
        title,
        mainImage,              
        gallery                  
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

export const getExhibitionByTitle = async (title) => {
  const query = `*[_type == "exhibition" && title == $title][0]{
    _id,
    title,
    location,
    startDate,
    endDate,
    description,
    "image": image.asset->url,
    
    
    featuredPaintings[]->{
      _id,
      title,
      "mainImage": mainImage.asset->url
    },
    
    "gallery": gallery[]{
      "url": asset->url,
      "alt": asset->altText
    },
    
    "documents": documents[]{
      "url": asset->url,
      "fileName": asset->originalFilename
    },
    
   
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
