import { properties } from '../lib/properties'
import { writeFileSync } from 'fs'
import { join } from 'path'

// Export properties to JSON
const dataPath = join(process.cwd(), 'data', 'properties.json')
writeFileSync(dataPath, JSON.stringify(properties, null, 2), 'utf-8')


console.log(`✅ Successfully migrated ${properties.length} properties to ${dataPath}`)
