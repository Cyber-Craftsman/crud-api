import assert from 'assert';
import http from 'http';

function request(
  method: string,
  path: string,
  body?: unknown
): Promise<{ status: number; data: any }> {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;

    const options: http.RequestOptions = {
      method,
      hostname: 'localhost',
      port: 4000,
      path,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(data) : 0,
      },
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => (responseData += chunk));
      res.on('end', () => {
        let content = null;
        try {
          content = responseData ? JSON.parse(responseData) : null;
        } catch {
          content = responseData;
        }
        resolve({ status: res.statusCode || 0, data: content });
      });
    });

    req.on('error', (err) => reject(err));
    if (data) req.write(data);
    req.end();
  });
}

(async function runTests() {
  console.log('Running tests...');

  const getAll = await request('GET', '/api/users');
  assert.strictEqual(getAll.status, 200);
  assert.deepStrictEqual(getAll.data, []);
  console.log('✔️  GET all users: passed');

  const newUser = { username: 'Vitalij', age: 25, hobbies: ['coding'] };
  const created = await request('POST', '/api/users', newUser);
  assert.strictEqual(created.status, 201);
  const userId = created.data.id;
  console.log('✔️  POST create user: passed');

  const getOne = await request('GET', `/api/users/${userId}`);
  assert.strictEqual(getOne.status, 200);
  assert.strictEqual(getOne.data.id, userId);
  console.log('✔️  GET user by id: passed');

  const updated = await request('PUT', `/api/users/${userId}`, {
    username: 'Updated',
    age: 99,
    hobbies: [],
  });
  assert.strictEqual(updated.status, 200);
  assert.strictEqual(updated.data.username, 'Updated');
  console.log('✔️  PUT update user: passed');

  const deleted = await request('DELETE', `/api/users/${userId}`);
  assert.strictEqual(deleted.status, 204);
  console.log('✔️  DELETE user: passed');

  const getDeleted = await request('GET', `/api/users/${userId}`);
  assert.strictEqual(getDeleted.status, 404);
  console.log('✔️  GET deleted user (404): passed');

  console.log('\n🎉 All tests passed!');
})();
