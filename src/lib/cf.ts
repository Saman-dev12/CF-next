import Cloudflare from "cloudflare"

export const CFclient = new Cloudflare({
    apiToken: process.env.CLOUDFLARE_API_TOKEN
})