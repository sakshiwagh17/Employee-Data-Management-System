import request from 'supertest';
import app from '../app.js'

// Test Data
const testEmployee = {
  name: "Test User",
  email: `testuser${Date.now()}@example.com`, // Use Date.now() for unique email
  position: "Software Tester"
};

let createdEmployeeId; // To store the ID for GET, PUT, and DELETE tests

describe('Employee CRUD API Endpoints', () => {

  // POST (CREATE) TESTS
  describe('POST /api/employee', () => {
    it('should create a new employee and return 201', async () => {
      const res = await request(app)
        .post('/api/employee')
        .send(testEmployee);

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Employee created successfully');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.email).toBe(testEmployee.email);
      
      // Save the ID for subsequent tests
      createdEmployeeId = res.body.data.id;
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/employee')
        .send({ name: "Incomplete", position: "Dev" }); // Email is missing
      
      // This checks your controller's manual 400 check
      expect(res.statusCode).toBe(400);
     expect(res.body.message).toBe('"email" is required');
    });
  });
  
  //  READ TESTS 
  describe('GET /api/employee', () => {
    it('should return all employees and status 200', async () => {
      const res = await request(app).get('/api/employee');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });
    
    it('should return a single employee by ID and status 200', async () => {
      const res = await request(app).get(`/api/employee/${createdEmployeeId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('id', createdEmployeeId);
      expect(res.body.data.name).toBe(testEmployee.name);
    });

    it('should return 404 for an invalid employee ID', async () => {
      // Use a very high ID that definitely doesn't exist
      const res = await request(app).get('/api/employee/999999'); 
      
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Employee not found');
    });

    // SEARCH /FILTER TEST
    it('should return filtered employees when using the name query parameter', async () => {
      const res = await request(app).get(`/api/employee?name=${testEmployee.name}`);
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      // Ensure the returned list contains the employee we created
      expect(res.body.data.some(e => e.id === createdEmployeeId)).toBe(true);
    });
  });

  // Update test
  describe('PUT /api/employee/:id', () => {
    const updateData = {
      name: "Updated Test User",
      email: `updated${Date.now()}@example.com`,
      position: "Senior Manager"
    };

    it('should update the employee and return 200', async () => {
      const res = await request(app)
        .put(`/api/employee/${createdEmployeeId}`)
        .send(updateData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Employee record updated successfully');
      expect(res.body.data.name).toBe(updateData.name);
      expect(res.body.data.email).toBe(updateData.email);
    });

    it('should return 404 if the ID to update does not exist', async () => {
      const res = await request(app)
        .put('/api/employee/999999')
        .send(updateData);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Employee not found');
    });
  });

  // Delete tesr
  describe('DELETE /api/employee/:id', () => {
    it('should delete the employee and return 200', async () => {
      const res = await request(app).delete(`/api/employee/${createdEmployeeId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Employee record deleted successfully');
      expect(res.body.data.id).toBe(createdEmployeeId);
      
      // Verify deletion by attempting to GET the deleted record
      const check = await request(app).get(`/api/employee/${createdEmployeeId}`);
      expect(check.statusCode).toBe(404);
    });

    it('should return 404 if the ID to delete does not exist', async () => {
      const res = await request(app).delete('/api/employee/999999');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Employee not found');
    });
  });

});