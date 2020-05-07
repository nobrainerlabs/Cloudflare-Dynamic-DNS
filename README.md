# Cloudflare Dynamic DNS
Update your cloudflare entry when your dynamic ip changes


## Why
1. DYNDNS is no longer free
2. I don't want to explore other options
3. I did, but turns out my router has a bad implementation of dynamimc dns

## Requirements
1. Domain that you own
2. Account in cloudflare
3. Domain added to your cloudflare account


## Getting Started

### Step 1 - fill in the .env
First copy `dev.env` to `.env` and then update the `.env` file with your values.
```
CLOUDFLARE_EMAIL=x
CLOUDFLARE_ACCESS_TOKEN=x
CLOUDFLARE_ZONE_ID=x
CLOUDFLARE_RECORD_NAME=x
CLOUDFLARE_RECORD_TYPE=x
```

#### CLOUDFLARE_EMAIL
This is the email address you use to login to cloudflare

#### CLOUDFLARE_ACCESS_TOKEN
For this, please navigate to,

1. My Profile (upper right hand side)
2. API Tokens
3. API Keys -> Global API Key -> View

#### CLOUDFLARE_ZONE_ID
For this, please navigate to,

1. The domain you added
2. Overview Page -> Right Column
3. Find Zone ID

#### CLOUDFLARE_RECORD_NAME
The record name is going to be the full <subdomain>.<domain> value. ie: home.myhouse.com

#### CLOUDFLARE_RECORD_TYPE
Depending on if you already have an `A` record setup, you can choose between `A` or `CNAME` here. Use `A` if you don't know.