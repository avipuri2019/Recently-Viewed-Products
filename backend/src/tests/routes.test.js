const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('API Integration Tests', () => {
  describe('POST /api/v1/users/:userId/recentlyViewed', () => {
    it('should log a recently viewed product', async () => {
      const userId = 'HqCWLhiRqtTL9PMkOwSxtym4kuK2';
      const response = await request(app)
        .post(`/api/v1/users/${userId}/recentlyViewed`)
        .send({ productId: '2Bdi6DMYmXdws3oXRxmc' }) // Simulate request body
        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmZDA3MmRmYTM4MDU2NzlmMTZmZTQxNzM4YzJhM2FkM2Y5MGIyMTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGl2ZXItcmVjZW50bHktdmlld2VkLXByb2R1Y3RzIiwiYXVkIjoibGl2ZXItcmVjZW50bHktdmlld2VkLXByb2R1Y3RzIiwiYXV0aF90aW1lIjoxNzMzMTMyODY3LCJ1c2VyX2lkIjoiSHFDV0xoaVJxdFRMOVBNa093U3h0eW00a3VLMiIsInN1YiI6IkhxQ1dMaGlScXRUTDlQTWtPd1N4dHltNGt1SzIiLCJpYXQiOjE3MzMxMzI4NjcsImV4cCI6MTczMzEzNjQ2NywiZW1haWwiOiJhdmluYXNocHVyaTIwMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImF2aW5hc2hwdXJpMjAxNkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RP2lvOWzytDU62G9XBq4B0lD6rRmxPmJ3E38dKGI7lac2uIkA_-HZOHz42LgSjxd94B9tF7ZfIL4nZbARi2P1CfucvoFxE4rPE_4yY8NikYPFxvRbVCx5i97gp_-_biFANVitVLZ6Dc0dIiHrl3eRxxDYLt--GR_zFUcww4SqJfcCywMAEggTpPHOkYoprl1l0Y0hv8nFylA-rK6dIGn3UxTEFWExkVMG9VqCuUnuYLFPYUyjs1ZgN5RnvE-EJ95eiqDyajuGDqWg5GJ3x6nFHPIXdtGceSEzeuhPwG8rHfAW3d_RmiOz2MsZ-AjJ5e3OlL77bv2Udw03JuAYjKByw'); // Set required headers if applicable

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product logged successfully');
    },10000);
  });

  describe('GET /api/v1/users/:userId/recentlyViewed', () => {
    it('should fetch recently viewed products', async () => {
      const userId = 'HqCWLhiRqtTL9PMkOwSxtym4kuK2';
      const response = await request(app)
        .get(`/api/v1/users/${userId}/recentlyViewed`)
        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmZDA3MmRmYTM4MDU2NzlmMTZmZTQxNzM4YzJhM2FkM2Y5MGIyMTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGl2ZXItcmVjZW50bHktdmlld2VkLXByb2R1Y3RzIiwiYXVkIjoibGl2ZXItcmVjZW50bHktdmlld2VkLXByb2R1Y3RzIiwiYXV0aF90aW1lIjoxNzMzMTMyODY3LCJ1c2VyX2lkIjoiSHFDV0xoaVJxdFRMOVBNa093U3h0eW00a3VLMiIsInN1YiI6IkhxQ1dMaGlScXRUTDlQTWtPd1N4dHltNGt1SzIiLCJpYXQiOjE3MzMxMzI4NjcsImV4cCI6MTczMzEzNjQ2NywiZW1haWwiOiJhdmluYXNocHVyaTIwMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImF2aW5hc2hwdXJpMjAxNkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RP2lvOWzytDU62G9XBq4B0lD6rRmxPmJ3E38dKGI7lac2uIkA_-HZOHz42LgSjxd94B9tF7ZfIL4nZbARi2P1CfucvoFxE4rPE_4yY8NikYPFxvRbVCx5i97gp_-_biFANVitVLZ6Dc0dIiHrl3eRxxDYLt--GR_zFUcww4SqJfcCywMAEggTpPHOkYoprl1l0Y0hv8nFylA-rK6dIGn3UxTEFWExkVMG9VqCuUnuYLFPYUyjs1ZgN5RnvE-EJ95eiqDyajuGDqWg5GJ3x6nFHPIXdtGceSEzeuhPwG8rHfAW3d_RmiOz2MsZ-AjJ5e3OlL77bv2Udw03JuAYjKByw'); // Set required headers if applicable
        console.log(response.body)
      expect(response.status).toBe(200);
      
      expect(Array.isArray(response.body.products)).toBe(true);

      // Optionally, check that the 'product' field inside each item in the array is an object
      expect(typeof response.body.products[0].product).toBe('object');
    });
  });

  describe('POST /api/v1/signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/v1/signup')
        .send({
          email: 'test1@example.com',
          password: 'securepassword',
          name: 'John Doe',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user.email).toBe('test1@example.com');
    });
  });
});
