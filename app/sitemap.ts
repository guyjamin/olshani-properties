import { MetadataRoute } from "next"
import { getProjects } from "@/lib/properties"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://olshaniproperties.co.ke"
    const projects = getProjects()

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/project/${encodeURIComponent(project.name)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...projectUrls,
    ]
}
