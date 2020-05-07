require('dotenv').config();

const publicIp = require('public-ip');
const cloudflare = require('./cloudflare');

const interval = 30000;
let ip;

async function main() {
  while (true) {
    console.log(new Date())
    const newIp = await ipHasChanged(ip);

    if (newIp) {
      ip = newIp;

      console.log('newIp', ip);
      await upsertDNSRecord(ip);
    } else {
      console.log('no change');
    }

    await wait(interval);
  }
}

function wait(ms) {
  console.log('waiting', ms);
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function ipHasChanged(ip) {
  const newIp = await publicIp.v4();

  return ip === newIp ? false : newIp;
}

async function upsertDNSRecord(ip) {
  const zones = await cloudflare
    .get(`/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`)
    .catch((e) => console.log(JSON.stringify(e.response.data)));
  
  const record = zones.data.result.find((rec) => {
    return (
      rec.type == process.env.CLOUDFLARE_RECORD_TYPE &&
      rec.name == process.env.CLOUDFLARE_RECORD_NAME
    );
  });

  if (record) console.log('current ip', record.content)

  return record
    ? record.content == ip
      ? record
      : updateRecordContent(record.id, ip)
    : createRecord(ip);
}

function updateRecordContent(recordId, ip) {
  console.log('updating to', ip)
  return cloudflare.patch(
    `/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`,
    {
      content: ip,
    }
  );
}

function createRecord(ip) {
  console.log('creating', ip)

  return cloudflare.post(`/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, {
    type: process.env.CLOUDFLARE_RECORD_TYPE,
    name: process.env.CLOUDFLARE_RECORD_NAME,
    content: ip,
    ttl: 1,
    proxied: true
  })
}

main();
