'use server'

const API_URL = process.env.API_URL

export const getServices = async () => {
    const response = await fetch(`${API_URL}services/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(`${API_URL}services/`)
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getProjects = async () => {
    const response = await fetch(`${API_URL}projects/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(`${API_URL}projects/`)
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const getService = async (slug: string) => {
    const response = await fetch(`${API_URL}service/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(`${API_URL}service/${slug}`)
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}