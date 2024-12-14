import elasticsearch from 'elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST
});

export default client;