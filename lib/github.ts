const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || "guyjamin"
const GITHUB_REPO = process.env.GITHUB_REPO || "olshani-properties"

export async function fetchGitHubFile(path: string) {
    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
        {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
            cache: "no-store",
        }
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    const data = await response.json()
    const content = atob(data.content.replace(/\n/g, ""))
    return { content, sha: data.sha }
}

export async function uploadToGitHub(path: string, content: string | Buffer, message: string, sha?: string) {
    // Convert content to base64
    let contentBase64 = ""
    if (typeof content === "string") {
        contentBase64 = Buffer.from(content).toString("base64")
    } else {
        contentBase64 = content.toString("base64")
    }

    const body: any = {
        message,
        content: contentBase64,
        branch: "main",
    }

    if (sha) {
        body.sha = sha
    }

    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    )

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`GitHub Error: ${errorData.message}`)
    }

    return await response.json()
}
