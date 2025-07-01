import { client } from './client'

// Test the Sanity connection
export const testConnection = async () => {
  try {
    console.log('Testing Sanity connection...')
    
    // Test basic connection
    const result = await client.fetch('*[_type == "artistInfo"][0]')
    console.log('Sanity connection successful!')
    console.log('Artist Info:', result)
    
    // Check if we have any documents
    const paintings = await client.fetch('*[_type == "painting"]')
    console.log('Number of paintings:', paintings.length)
    
    const exhibitions = await client.fetch('*[_type == "exhibition"]')
    console.log('Number of exhibitions:', exhibitions.length)
    
    const manifesto = await client.fetch('*[_type == "manifesto"]')
    console.log('Number of manifestos:', manifesto.length)
    
    return true
  } catch (error) {
    console.error('Sanity connection failed:', error)
    return false
  }
}
