import { createClient } from 'redis';
let {
  DB_TEMPORARY__HOST,
  DB_TEMPORARY__DB_SITE,
  DB_TEMPORARY__PORT_INTERNAL,
  DB_TEMPORARY__DB_SITE_PREFIXES,
} = process.env;

let dbConnect = createClient({
  url: `${DB_TEMPORARY__HOST}:${DB_TEMPORARY__PORT_INTERNAL}/${DB_TEMPORARY__DB_SITE}`,
});

dbConnect.connect();

dbConnect.on('error', async (err) => {
  console.error('Redis content "SITE"', err);
  await dbConnect.quit();
  await dbConnect.connect();
});

let prefixes = JSON.parse(DB_TEMPORARY__DB_SITE_PREFIXES || '');

export default { dbConnect, prefixes };
