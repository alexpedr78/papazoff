// Mock data for the painter portfolio
// This will be replaced with Sanity CMS data later

export const paintings = [
  {
    id: 1,
    title: "Ethereal Sunset",
    description: "A captivating study of light and shadow as day transitions to night, exploring the delicate balance between warm and cool tones.",
    size: "24\" x 36\" (61cm x 91cm)",
    material: "Oil on Canvas",
    price: "$2,400",
    date: "2024",
    availability: "Available",
    imageUrl: null, // Placeholder - will be replaced with actual images
    tags: ["landscape", "sunset", "oil painting"]
  },
  {
    id: 2,
    title: "Urban Solitude",
    description: "An intimate portrayal of modern city life, capturing the quiet moments of reflection amidst urban chaos.",
    size: "18\" x 24\" (46cm x 61cm)",
    material: "Acrylic on Canvas",
    price: "$1,800",
    date: "2023",
    availability: "Sold",
    imageUrl: null,
    tags: ["urban", "cityscape", "contemporary"]
  },
  {
    id: 3,
    title: "Memories in Blue",
    description: "A deeply personal work exploring themes of nostalgia and time, rendered in various shades of blue with delicate brushwork.",
    size: "30\" x 40\" (76cm x 102cm)",
    material: "Oil on Canvas",
    price: "$3,200",
    date: "2024",
    availability: "Available",
    imageUrl: null,
    tags: ["abstract", "blue", "emotional"]
  },
  {
    id: 4,
    title: "Forest Whispers",
    description: "Nature's quiet conversation captured in rich greens and earth tones, inviting viewers into a serene woodland scene.",
    size: "20\" x 30\" (51cm x 76cm)",
    material: "Oil on Canvas",
    price: "$2,100",
    date: "2023",
    availability: "Available",
    imageUrl: null,
    tags: ["nature", "forest", "landscape"]
  },
  {
    id: 5,
    title: "Portrait of Time",
    description: "A contemplative piece examining the passage of time through layered textures and muted color palette.",
    size: "16\" x 20\" (41cm x 51cm)",
    material: "Mixed Media on Canvas",
    price: "$1,500",
    date: "2022",
    availability: "Available",
    imageUrl: null,
    tags: ["portrait", "abstract", "time"]
  },
  {
    id: 6,
    title: "Golden Hour Dreams",
    description: "Capturing the magical quality of golden hour light with warm yellows and oranges dancing across the canvas.",
    size: "28\" x 42\" (71cm x 107cm)",
    material: "Oil on Canvas",
    price: "$2,800",
    date: "2024",
    availability: "Reserved",
    imageUrl: null,
    tags: ["landscape", "golden hour", "warm tones"]
  }
];

export const exhibitions = [
  {
    id: 1,
    title: "Contemporary Visions",
    location: "Modern Art Gallery, New York",
    date: "March 15 - April 30, 2024",
    type: "upcoming",
    description: "A curated exhibition featuring contemporary painters exploring themes of modern life and digital age consciousness.",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Brushstrokes of Emotion",
    location: "City Arts Center, San Francisco",
    date: "January 10 - February 25, 2024",
    type: "current",
    description: "An intimate showcase of emotional landscapes and personal narratives told through paint and canvas.",
    status: "Current"
  },
  {
    id: 3,
    title: "Masterworks Collection",
    location: "Heritage Museum, Chicago",
    date: "September 5 - October 20, 2023",
    type: "past",
    description: "A comprehensive retrospective featuring key works from the past five years of artistic development.",
    status: "Past"
  },
  {
    id: 4,
    title: "Nature's Canvas",
    location: "Riverside Gallery, Portland",
    date: "June 12 - July 30, 2023",
    type: "past",
    description: "Exploring the relationship between natural beauty and artistic interpretation through landscape paintings.",
    status: "Past"
  }
];

export const artistInfo = {
  name: "Featured Artist",
  bio: "With over two decades of artistic exploration, our featured painter has developed a distinctive voice that bridges classical techniques with contemporary vision. Each work emerges from a deep understanding of color, form, and the human experience.",
  manifesto: {
    title: "The Language of Paint",
    excerpt: "Art is not merely decoration—it is a language that speaks to the soul, a bridge between the visible and invisible worlds.",
    videoUrl: null, // Placeholder for 24-minute video
    fullText: `
      Art is not merely decoration—it is a language that speaks to the soul, a bridge between the visible and invisible worlds. In every brushstroke, I seek to capture not just what the eye sees, but what the heart feels.

      My journey as a painter began with a simple truth: that color and form have the power to transcend words, to communicate emotions and ideas that language cannot adequately express. Each canvas becomes a conversation between intention and intuition, between careful planning and spontaneous discovery.

      The act of painting is both meditation and revelation. In the quiet hours of creation, I find myself in dialogue with the medium itself—the way oil flows across canvas, how pigments blend and separate, the texture that emerges from layered applications. These physical properties of paint become metaphors for life itself: the way experiences layer upon each other, how emotions blend and sometimes resist combination, how time adds texture to our existence.

      I believe in the power of painting to slow down our hurried world, to invite contemplation in an age of distraction. Each work is an invitation to pause, to look deeply, to feel fully. Whether depicting a fleeting moment of natural beauty or exploring abstract concepts of time and memory, my goal remains constant: to create windows into deeper understanding.

      The contemporary world offers both challenges and opportunities for painters. We compete with digital imagery and instant gratification, yet we also offer something irreplaceable—the human touch, the evidence of physical presence, the authentic mark-making that speaks to our fundamental need for genuine human expression.

      In my work, I strive to honor the tradition of painting while speaking to contemporary concerns. Environmental awareness, human isolation, the search for meaning in an increasingly complex world—these themes emerge naturally from the act of observing and responding to our current moment in history.

      Ultimately, I paint because I must. The compulsion to translate experience into visual form drives me forward, canvas after canvas, seeking always to refine my ability to communicate through this ancient and essential language of paint.
    `
  }
};

export const comments = [
  // Comments will be structured as:
  // {
  //   id: number,
  //   paintingId: number, // or exhibitionId
  //   type: 'painting' | 'exhibition',
  //   author: string,
  //   content: string,
  //   date: string,
  // }
];
