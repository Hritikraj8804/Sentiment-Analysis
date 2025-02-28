const request = require('supertest');
const app = require('../server/server');

describe('API Endpoints', () => {
    test('POST /api/analyze should handle file upload', async () => {
        const response = await request(app)
            .post('/api/analyze')
            .attach('file', 'tests/fixtures/sample.csv');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success');
    });

    test('POST /api/analyze should handle missing file', async () => {
        const response = await request(app)
            .post('/api/analyze');
        
        expect(response.status).toBe(400);
    });
}); 