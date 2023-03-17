import { createClient } from 'redis';
let {
  DB_TEMPORARY__HOST,
  DB_TEMPORARY__DB_CONTENT,
  DB_TEMPORARY__PORT_INTERNAL,
  DB_TEMPORARY__DB_CONTENT_PREFIXES,
} = process.env;

let dbConnect = createClient({
  url: `${DB_TEMPORARY__HOST}:${DB_TEMPORARY__PORT_INTERNAL}/${DB_TEMPORARY__DB_CONTENT}`,
});

let prefixes = JSON.parse(DB_TEMPORARY__DB_CONTENT_PREFIXES || '');

export default { dbConnect, prefixes };
