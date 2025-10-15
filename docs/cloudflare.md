# Deploying on Cloudflare

## Deploying to Cloudflare Pages

* Connect to Github Repo
* Under `Settings` -> `Builds & deployments`, configure the following.

### Build Command
```bash
NITRO_PRESET=cloudflare_pages npx nuxi generate
```

### Build Output Directory
```
/dist
```

### Root Directory
```
/
```
