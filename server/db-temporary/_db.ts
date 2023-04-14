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

let prefixes = JSON.parse(DB_TEMPORARY__DB_SITE_PREFIXES || '');

export default { dbConnect, prefixes };
