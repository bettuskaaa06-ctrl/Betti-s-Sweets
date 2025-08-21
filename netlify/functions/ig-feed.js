// netlify/functions/ig-feed.js
export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }};
  }

  try {
    const token = process.env.IG_ACCESS_TOKEN;
    if (!token) return json({ error: 'Missing IG_ACCESS_TOKEN' }, 500);

    const url = new URL('https://graph.instagram.com/me/media');
    const limit = Math.max(1, Math.min(12, Number(event.queryStringParameters?.limit) || 8));
    const fields = ['id','caption','media_type','media_url','permalink','thumbnail_url','timestamp'].join(',');
    url.searchParams.set('fields', fields);
    url.searchParams.set('access_token', token);
    url.searchParams.set('limit', String(limit));

    const resp = await fetch(url);
    if (!resp.ok) return json({ error: 'Instagram API error', details: await resp.text() }, resp.status);

    const data = await resp.json();
    return json({ data: data.data || [] }, 200);
  } catch (err) {
    return json({ error: 'Server error', details: String(err) }, 500);
  }
}

function json(payload, status = 200) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(payload)
  };
}
