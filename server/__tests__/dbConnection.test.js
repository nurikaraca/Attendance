
const db = require('../config/db.js')

describe('Database Connection Test', () => {
    
    beforeAll(async() =>{
        await db()
    });

    afterAll(async () =>{
        await db.disconnect();
    })
    it('should connect to the database successfully', () => {
        expect(mongoose.connection.readyState).toBe(1); 
      });
});
